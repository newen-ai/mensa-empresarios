import { FormEvent, useState } from "react";
import { AppCard } from "@/components/ui/AppCard";

type ComposerCardProps = {
  initials: string;
  onPublish: (content: string) => void;
};

export function ComposerCard({ initials, onPublish }: ComposerCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState("");

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = content.trim();
    if (!trimmed) return;

    onPublish(trimmed);
    setContent("");
    setIsOpen(false);
  };

  return (
    <AppCard className="p-4">
      <form onSubmit={onSubmit}>
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 text-sm font-bold text-white">
            {initials || "ME"}
          </span>
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="linkedin-composer-trigger w-full rounded-full border border-slate-300 px-4 py-2 text-left text-sm text-slate-500"
          >
            Comparte una idea con la red Mensa Argentina...
          </button>
        </div>

        {isOpen && (
          <>
            <textarea
              value={content}
              onChange={(event) => setContent(event.target.value)}
              rows={4}
              autoFocus
              placeholder="Escribe tu publicacion..."
              className="mt-3 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm text-slate-800 focus:border-[var(--brand-700)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-100)]"
            />
            <div className="mt-3 flex items-center gap-2">
              <button
                type="submit"
                className="rounded-full bg-[var(--brand-700)] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[var(--brand-800)]"
              >
                Publicar
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  setContent("");
                }}
                className="rounded-full border border-slate-300 px-4 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-50"
              >
                Cancelar
              </button>
            </div>
          </>
        )}
      </form>

      <div className="mt-3 flex flex-wrap gap-2">
        <span className="linkedin-tag">Insight rapido</span>
        <span className="linkedin-tag">Oportunidad laboral</span>
        <span className="linkedin-tag">Conexion estrategica</span>
      </div>
      <p className="mt-3 rounded-lg bg-[#f3f9ff] px-3 py-2 text-xs font-medium text-[#0b4f89]">
        Frase sugerida: &quot;Mentes brillantes, negocios mejores&quot;.
      </p>
    </AppCard>
  );
}
