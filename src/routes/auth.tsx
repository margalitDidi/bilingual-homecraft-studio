import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "כניסת מנהל" },
      { name: "description", content: "כניסה לניהול תוכן האתר." },
      { property: "og:title", content: "כניסת מנהל" },
      { property: "og:description", content: "כניסה לניהול תוכן האתר." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AuthPage,
});

const field = "w-full rounded-xl border border-input bg-background/40 px-4 py-3 text-foreground outline-none focus:border-primary";

function AuthPage() {
  const [mode, setMode] = useState<"in" | "up">("in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    if (mode === "in") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) toast.error("פרטי הכניסה שגויים");
      else toast.success("נכנסת בהצלחה");
    } else {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: window.location.origin },
      });
      if (error) toast.error(error.message);
      else toast.success("נשלח אליך מייל לאישור החשבון");
    }
    setBusy(false);
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-5">
      <form onSubmit={submit} className="card-luxe w-full max-w-md space-y-5 p-8">
        <Link to="/" className="eyebrow">← חזרה לאתר</Link>
        <h1 className="text-4xl">{mode === "in" ? "כניסת מנהל" : "יצירת חשבון מנהל"}</h1>
        <input className={field} type="email" dir="ltr" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input className={field} type="password" dir="ltr" placeholder="Password" minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} required />
        <Button type="submit" variant="hero" size="xl" className="w-full" disabled={busy}>
          {mode === "in" ? "כניסה" : "הרשמה"}
        </Button>
        <button type="button" onClick={() => setMode(mode === "in" ? "up" : "in")} className="w-full text-sm text-muted-foreground hover:text-primary">
          {mode === "in" ? "אין לך חשבון? הרשמה" : "יש לך חשבון? כניסה"}
        </button>
      </form>
    </div>
  );
}
