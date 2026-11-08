import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import { SectionHeading } from "@/components/site/SectionHeading";
import { ProjectCard } from "@/components/site/ProjectCard";
import { Reveal } from "@/components/site/Reveal";
import { siteContentQuery } from "@/lib/site-queries";
import { CATEGORIES, categoryKey, useSite, type Category } from "@/lib/use-site";
import { useLang } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/projects/")({
  validateSearch: (s: Record<string, unknown>): { category?: Category } => {
    const c = s["category"];
    return c === "kitchen" || c === "bathroom" || c === "closets" ? { category: c } : {};
  },
  loader: ({ context }) => context.queryClient.ensureQueryData(siteContentQuery()),
  head: () => ({
    meta: [
      { title: "תיק עבודות · מטבחים, חדרי רחצה וארונות" },
      { name: "description", content: "מבחר פרויקטים בעיצוב אישי: מטבחים, חדרי רחצה, ארונות וספריות." },
      { property: "og:title", content: "תיק עבודות · מטבחים, חדרי רחצה וארונות" },
      { property: "og:description", content: "מבחר פרויקטים בעיצוב אישי: מטבחים, חדרי רחצה, ארונות וספריות." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  const { projects } = useSite();
  const { t } = useLang();
  const { category } = Route.useSearch();
  const list = category ? projects.filter((p) => p.category === category) : projects;
  const tabs: { v: Category | undefined; label: string }[] = [
    { v: undefined, label: t("cat_all") },
    ...CATEGORIES.map((c) => ({ v: c, label: t(categoryKey(c)) })),
  ];
  return (
    <SiteShell>
      <section className="mx-auto max-w-7xl px-5 pb-10 pt-40 md:px-8">
        <SectionHeading eyebrow={t("nav_projects")} title={t("projects_title")} subtitle={t("projects_subtitle")} />
        <div className="mt-12 flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <Link
              key={tab.label}
              to="/projects"
              search={tab.v ? { category: tab.v } : {}}
              className={cn(
                "rounded-full border px-5 py-2.5 text-sm transition-all",
                category === tab.v ? "border-primary bg-primary/15 text-primary" : "border-border text-foreground/80 hover:border-primary/50",
              )}
            >
              {tab.label}
            </Link>
          ))}
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-5 pb-20 md:px-8">
        {list.length === 0 ? (
          <p className="py-20 text-center text-muted-foreground">{t("projects_empty")}</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((p, i) => (
              <Reveal key={p.id} delay={(i % 3) * 100}>
                <ProjectCard project={p} />
              </Reveal>
            ))}
          </div>
        )}
      </section>
    </SiteShell>
  );
}
