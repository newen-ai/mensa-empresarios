import { AppCard } from "@/components/ui/AppCard";

type RightSidebarProps = {
  professionalStampLines: string[];
};

export function RightSidebar({ professionalStampLines }: RightSidebarProps) {
  return (
    <aside className="mensa-fade-up space-y-4 lg:sticky lg:top-20">
      <AppCard className="p-4">
        <h3 className="font-[family-name:var(--font-spectral)] text-lg font-semibold text-slate-900">
          Comunidad Mensa Argentina
        </h3>
        <p className="mt-2 text-sm text-slate-700">
          Somos miembros y construimos una red para conectar talento, criterio y ejecucion.
        </p>
        <p className="mt-3 rounded-lg bg-[#eaf4ff] p-3 text-sm font-medium text-[#0a4f8a]">
          &quot;Pensar diferente no alcanza: hay que ejecutar mejor.&quot;
        </p>
      </AppCard>

      <AppCard className="p-4">
        <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--brand-700)]">
          Tu sello profesional
        </h3>
        <ul className="mt-3 space-y-2 text-sm text-slate-700">
          {professionalStampLines.map((line) => (
            <li
              key={line}
              className="rounded-lg border border-slate-200 bg-white px-3 py-2"
            >
              {line}
            </li>
          ))}
        </ul>
      </AppCard>
    </aside>
  );
}
