"use client";

import { useMemo, useState } from "react";
import { AppCard } from "@/components/ui/AppCard";
import { ModulePage } from "../_components/ModulePage";

type ChatMessage = {
  id: string;
  sender: "them" | "me";
  text: string;
  time: string;
};

type Thread = {
  id: string;
  name: string;
  role: string;
  time: string;
  summary: string;
  messages: ChatMessage[];
};

const initialThreads: Thread[] = [
  {
    id: "musk",
    name: "Elon Musk",
    role: "CEO, SpaceX & Tesla",
    time: "Ahora",
    summary:
      "La experiencia en Mensa Empresarios tiene una claridad brutal. El onboarding transmite foco y velocidad.",
    messages: [
      {
        id: "musk-1",
        sender: "them",
        text: "La app esta sorprendentemente bien pensada.",
        time: "10:08",
      },
      {
        id: "musk-2",
        sender: "them",
        text: "Se siente como una red profesional de proxima generacion: directa, rapida y sin ruido.",
        time: "10:11",
      },
      {
        id: "musk-3",
        sender: "me",
        text: "Gracias, estamos enfocandonos en que el networking sea util desde el primer minuto.",
        time: "10:13",
      },
    ],
  },
  {
    id: "nadella",
    name: "Satya Nadella",
    role: "Chairman & CEO, Microsoft",
    time: "Hace 12 min",
    summary:
      "Excelente producto: combina comunidad, reputacion y contexto profesional en una interfaz elegante.",
    messages: [
      {
        id: "nadella-1",
        sender: "them",
        text: "Mensa Empresarios logra algo dificil: simple para empezar, potente para crecer.",
        time: "09:40",
      },
      {
        id: "nadella-2",
        sender: "them",
        text: "La propuesta de valor para lideres y equipos esta muy bien comunicada.",
        time: "09:44",
      },
    ],
  },
  {
    id: "pichai",
    name: "Sundar Pichai",
    role: "CEO, Google",
    time: "Hace 29 min",
    summary:
      "La app tiene una arquitectura de interaccion muy consistente. Da gusto navegarla.",
    messages: [
      {
        id: "pichai-1",
        sender: "them",
        text: "Excelente trabajo de producto y ejecucion.",
        time: "09:17",
      },
      {
        id: "pichai-2",
        sender: "them",
        text: "El balance entre contenido, perfil y networking esta resuelto con mucha precision.",
        time: "09:19",
      },
    ],
  },
  {
    id: "bezos",
    name: "Jeff Bezos",
    role: "Founder, Amazon",
    time: "Hace 45 min",
    summary:
      "Obsesion por el usuario en cada detalle. Se nota desde la primera pantalla.",
    messages: [
      {
        id: "bezos-1",
        sender: "them",
        text: "Mensa Empresarios se siente premium y util desde el minuto uno.",
        time: "08:55",
      },
      {
        id: "bezos-2",
        sender: "them",
        text: "Gran ejemplo de enfoque en experiencia y utilidad real para negocios.",
        time: "08:57",
      },
    ],
  },
];

export default function MensajesPage() {
  const [threads, setThreads] = useState<Thread[]>(initialThreads);
  const [selectedThreadId, setSelectedThreadId] = useState(initialThreads[0]?.id ?? "");
  const [draftMessage, setDraftMessage] = useState("");

  const selectedThread = useMemo(
    () => threads.find((thread) => thread.id === selectedThreadId) ?? null,
    [threads, selectedThreadId]
  );

  const onSendMessage = () => {
    const trimmed = draftMessage.trim();
    if (!trimmed || !selectedThreadId) return;

    const time = new Intl.DateTimeFormat("es-AR", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(new Date());

    const newMessage: ChatMessage = {
      id: crypto.randomUUID(),
      sender: "me",
      text: trimmed,
      time,
    };

    setThreads((current) =>
      current.map((thread) =>
        thread.id === selectedThreadId
          ? {
              ...thread,
              time: "Ahora",
              messages: [...thread.messages, newMessage],
            }
          : thread
      )
    );
    setDraftMessage("");
  };

  return (
    <ModulePage
      title="Mensajes"
      subtitle="Conversaciones privadas para colaboraciones de alto impacto."
    >
      <AppCard className="p-3 sm:p-4">
        <div className="mb-3 flex items-center justify-between gap-3 px-2 sm:px-1">
          <h2 className="font-[family-name:var(--font-spectral)] text-xl font-semibold text-slate-900">
            Bandeja de entrada
          </h2>
          <span className="rounded-full bg-[var(--brand-100)] px-3 py-1 text-[0.72rem] font-semibold text-[var(--brand-700)]">
            {threads.length} conversaciones
          </span>
        </div>

        <div className="grid gap-3 lg:grid-cols-[320px_minmax(0,1fr)]">
          <aside className="rounded-2xl border border-slate-200 bg-white p-2">
            <div className="space-y-1">
              {threads.map((thread) => {
                const initials = thread.name
                  .split(" ")
                  .slice(0, 2)
                  .map((word) => word[0])
                  .join("")
                  .toUpperCase();
                const lastMessage = thread.messages[thread.messages.length - 1]?.text;
                const isSelected = thread.id === selectedThreadId;

                return (
                  <button
                    key={thread.id}
                    type="button"
                    onClick={() => setSelectedThreadId(thread.id)}
                    className={`w-full rounded-xl border px-3 py-3 text-left transition ${
                      isSelected
                        ? "border-[var(--brand-300)] bg-[var(--brand-50)]"
                        : "border-transparent hover:border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex min-w-0 items-start gap-3">
                        <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-800 text-[0.68rem] font-bold text-white">
                          {initials}
                        </span>
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-slate-900">
                            {thread.name}
                          </p>
                          <p className="truncate text-xs text-slate-600">{thread.role}</p>
                        </div>
                      </div>
                      <span className="shrink-0 text-[0.68rem] font-medium text-slate-500">
                        {thread.time}
                      </span>
                    </div>
                    <p className="mt-2 line-clamp-2 text-xs text-slate-600">
                      {lastMessage || thread.summary}
                    </p>
                  </button>
                );
              })}
            </div>
          </aside>

          <section className="rounded-2xl border border-slate-200 bg-white">
            {selectedThread ? (
              <>
                <header className="border-b border-slate-200 px-4 py-3 sm:px-5">
                  <p className="text-sm font-semibold text-slate-900">{selectedThread.name}</p>
                  <p className="text-xs text-slate-600">{selectedThread.role}</p>
                </header>

                <div className="max-h-[430px] space-y-3 overflow-y-auto px-4 py-4 sm:px-5">
                  {selectedThread.messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.sender === "me" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-6 sm:max-w-[78%] ${
                          message.sender === "me"
                            ? "rounded-br-md bg-[var(--brand-700)] text-white"
                            : "rounded-bl-md bg-slate-100 text-slate-800"
                        }`}
                      >
                        <p>{message.text}</p>
                        <p
                          className={`mt-1 text-[0.65rem] font-medium ${
                            message.sender === "me" ? "text-white/80" : "text-slate-500"
                          }`}
                        >
                          {message.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <footer className="border-t border-slate-200 p-3 sm:p-4">
                  <div className="flex gap-2">
                    <input
                      value={draftMessage}
                      onChange={(event) => setDraftMessage(event.target.value)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter") {
                          event.preventDefault();
                          onSendMessage();
                        }
                      }}
                      placeholder="Escribe un mensaje..."
                      className="w-full rounded-full border border-slate-300 px-4 py-2.5 text-sm text-slate-800 focus:border-[var(--brand-700)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-100)]"
                    />
                    <button
                      type="button"
                      onClick={onSendMessage}
                      className="rounded-full bg-[var(--brand-700)] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[var(--brand-800)]"
                    >
                      Enviar
                    </button>
                  </div>
                </footer>
              </>
            ) : (
              <div className="px-5 py-8 text-sm text-slate-600">
                Selecciona una conversacion para empezar a chatear.
              </div>
            )}
          </section>
        </div>
      </AppCard>

      <AppCard className="p-5">
        <p className="text-sm font-medium text-[var(--brand-700)]">
          &quot;Dialogos inteligentes, decisiones mas rapidas&quot;.
        </p>
      </AppCard>
    </ModulePage>
  );
}
