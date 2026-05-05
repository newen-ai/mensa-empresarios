"use client";

import { useState } from "react";
import { AppCard } from "@/components/ui/AppCard";
import type { FeedPost } from "../../_lib/types";

type FeedPostCardProps = FeedPost & {
  canManage?: boolean;
  onEdit?: ({ id, contenido }: { id: string; contenido: string }) => void;
  onDelete?: (id: string) => void;
};

export function FeedPostCard({
  id,
  autor,
  cargo,
  tiempo,
  contenido,
  etiqueta,
  canManage = false,
  onEdit,
  onDelete,
}: FeedPostCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [draftContent, setDraftContent] = useState(contenido);

  const onSaveEdit = () => {
    const trimmed = draftContent.trim();
    if (!trimmed) return;
    onEdit?.({ id, contenido: trimmed });
    setIsEditing(false);
  };

  const onDeletePost = () => {
    if (!window.confirm("¿Seguro que quieres eliminar esta publicacion?")) {
      return;
    }
    onDelete?.(id);
  };

  return (
    <AppCard
      className={`p-5 ${
        canManage
          ? "border-[var(--brand-300)] bg-gradient-to-b from-[var(--brand-50)]/70 to-white"
          : ""
      }`}
    >
      {canManage && (
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[var(--brand-300)] bg-white px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.08em] text-[var(--brand-700)]">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--brand-700)]" />
          Tu publicacion
        </div>
      )}
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-slate-900">{autor}</p>
          <p className="text-xs text-slate-600">{cargo}</p>
          <p className="mt-1 text-xs text-slate-500">{tiempo}</p>
        </div>
        {etiqueta && (
          <span className="rounded-full bg-[var(--brand-100)] px-3 py-1 text-[0.7rem] font-semibold text-[var(--brand-700)]">
            {etiqueta}
          </span>
        )}
      </div>

      {isEditing ? (
        <div className="mt-3 space-y-2">
          <textarea
            value={draftContent}
            onChange={(event) => setDraftContent(event.target.value)}
            rows={4}
            className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm text-slate-800 focus:border-[var(--brand-700)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-100)]"
          />
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onSaveEdit}
              className="rounded-full bg-[var(--brand-700)] px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-[var(--brand-800)]"
            >
              Guardar
            </button>
            <button
              type="button"
              onClick={() => {
                setDraftContent(contenido);
                setIsEditing(false);
              }}
              className="rounded-full border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-50"
            >
              Cancelar
            </button>
          </div>
        </div>
      ) : (
        <p className="mt-3 text-sm leading-6 text-slate-700">{contenido}</p>
      )}

      <div className="mt-4 flex gap-4 text-xs font-semibold text-slate-500">
        <button type="button" className="hover:text-[var(--brand-700)]">
          Recomendar
        </button>
        <button type="button" className="hover:text-[var(--brand-700)]">
          Comentar
        </button>
        <button type="button" className="hover:text-[var(--brand-700)]">
          Compartir
        </button>
        {canManage && !isEditing && (
          <>
            <button
              type="button"
              onClick={() => {
                setDraftContent(contenido);
                setIsEditing(true);
              }}
              className="hover:text-[var(--brand-700)]"
            >
              Editar
            </button>
            <button
              type="button"
              onClick={onDeletePost}
              className="hover:text-red-600"
            >
              Eliminar
            </button>
          </>
        )}
      </div>
    </AppCard>
  );
}
