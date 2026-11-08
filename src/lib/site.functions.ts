import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import type { Database } from "@/integrations/supabase/types";

function publicClient() {
  const url = process.env["SUPABASE_URL"]!;
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;
  return createClient<Database>(url, key, {
    auth: { persistSession: false, autoRefreshToken: false, storage: undefined },
    global: {
      fetch: (input, init) => {
        const h = new Headers(init?.headers);
        if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) h.delete("Authorization");
        h.set("apikey", key);
        return fetch(input, { ...init, headers: h });
      },
    },
  });
}

export type ContentMap = Record<string, { he: string; en: string }>;
export type ProjectRow = Database["public"]["Tables"]["projects"]["Row"];
export type ProjectImageRow = Database["public"]["Tables"]["project_images"]["Row"];
export type TestimonialRow = Database["public"]["Tables"]["testimonials"]["Row"];

export const getSiteContent = createServerFn({ method: "GET" }).handler(async () => {
  const sb = publicClient();
  const [contentRes, projectsRes, testimonialsRes] = await Promise.all([
    sb.from("site_content").select("key, value_he, value_en"),
    sb.from("projects").select("*").eq("published", true).order("sort_order").order("created_at"),
    sb.from("testimonials").select("*").order("sort_order"),
  ]);
  if (contentRes.error) throw new Error(contentRes.error.message);
  if (projectsRes.error) throw new Error(projectsRes.error.message);
  if (testimonialsRes.error) throw new Error(testimonialsRes.error.message);

  const content: ContentMap = {};
  for (const row of contentRes.data) content[row.key] = { he: row.value_he, en: row.value_en };

  return {
    content,
    projects: projectsRes.data as ProjectRow[],
    testimonials: testimonialsRes.data as TestimonialRow[],
  };
});

export const getProject = createServerFn({ method: "GET" })
  .inputValidator((input: { id: string }) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ data }) => {
    const sb = publicClient();
    const [projectRes, imagesRes] = await Promise.all([
      sb.from("projects").select("*").eq("id", data.id).eq("published", true).maybeSingle(),
      sb.from("project_images").select("*").eq("project_id", data.id).order("sort_order").order("created_at"),
    ]);
    if (projectRes.error) throw new Error(projectRes.error.message);
    return {
      project: (projectRes.data ?? null) as ProjectRow | null,
      images: (imagesRes.data ?? []) as ProjectImageRow[],
    };
  });
