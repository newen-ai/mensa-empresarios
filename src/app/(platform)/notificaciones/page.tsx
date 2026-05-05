import { AppCard } from "@/components/ui/AppCard";
import { ModulePage } from "../_components/ModulePage";

export default function NotificacionesPage() {
  return (
    <ModulePage
      title="Notificaciones"
      subtitle="Alertas relevantes de actividad en tu red profesional."
    >
      <AppCard className="p-5">
        <h2 className="font-[family-name:var(--font-spectral)] text-xl font-semibold text-slate-900">
          Actividad reciente
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          Proximamente: eventos clave de tu red, oportunidades y seguimiento de interacciones.
        </p>
      </AppCard>

      <AppCard className="p-5">
        <p className="text-sm font-medium text-[var(--brand-700)]">
          &quot;Lo importante, en el momento justo&quot;.
        </p>
      </AppCard>
    </ModulePage>
  );
}
