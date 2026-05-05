import type { ChangeEvent } from "react";
import { AppCard } from "@/components/ui/AppCard";
import type { Profile } from "../../_lib/types";

type ProfileOption = {
  id: string;
  title: string;
  subtitle: string;
};

type ProfileFormCardProps = {
  profile: Profile;
  profileOptions: ProfileOption[];
  activeProfileId: string;
  onProfileChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onSelectProfile: (id: string) => void;
  onCreateNewProfile: () => void;
};

export function ProfileFormCard({
  profile,
  profileOptions,
  activeProfileId,
  onProfileChange,
  onSelectProfile,
  onCreateNewProfile,
}: ProfileFormCardProps) {
  const today = new Date().toISOString().split("T")[0];

  return (
    <AppCard className="p-5 sm:p-6">
      <h2 className="font-[family-name:var(--font-spectral)] text-2xl font-semibold text-slate-900">
        Arma tu perfil
      </h2>
      <p className="mt-1 text-sm text-slate-600">
        Una comunidad de alto rendimiento necesita perfiles claros y accionables.
      </p>

      <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <label className="mensa-field min-w-[230px] flex-1">
            Perfil activo
            <select
              value={activeProfileId}
              onChange={(event) => onSelectProfile(event.target.value)}
              className="mt-1 rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 focus:border-[var(--brand-700)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-100)]"
            >
              {profileOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.title} - {option.subtitle}
                </option>
              ))}
            </select>
          </label>

          <div className="flex flex-wrap gap-2 pt-6 sm:pt-0">
            <button
              type="button"
              onClick={onCreateNewProfile}
              className="rounded-full border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              Nuevo perfil
            </button>
          </div>
        </div>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <label className="mensa-field sm:col-span-1">
          Nombre
          <input
            name="nombre"
            value={profile.nombre}
            onChange={onProfileChange}
            placeholder="Ana"
            autoComplete="given-name"
          />
        </label>

        <label className="mensa-field sm:col-span-1">
          Apellido
          <input
            name="apellido"
            value={profile.apellido}
            onChange={onProfileChange}
            placeholder="Martinez"
            autoComplete="family-name"
          />
        </label>

        <label className="mensa-field sm:col-span-1">
          Fecha de nacimiento
          <input
            name="fechaNacimiento"
            type="date"
            value={profile.fechaNacimiento}
            onChange={onProfileChange}
            max={today}
          />
        </label>

        <label className="mensa-field sm:col-span-1">
          Nacionalidad
          <input
            name="nacionalidad"
            value={profile.nacionalidad}
            onChange={onProfileChange}
            placeholder="Argentina"
            autoComplete="country-name"
          />
        </label>

        <label className="mensa-field sm:col-span-2">
          Puesto de trabajo
          <input
            name="puesto"
            value={profile.puesto}
            onChange={onProfileChange}
            placeholder="Lider de Proyectos"
            autoComplete="organization-title"
          />
        </label>
      </div>
    </AppCard>
  );
}
