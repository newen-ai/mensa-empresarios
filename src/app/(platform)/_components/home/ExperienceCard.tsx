import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { AppCard } from "@/components/ui/AppCard";
import { toDateLabel } from "../../_lib/utils/date";
import type { Experience, ExperienceDraft } from "../../_lib/types";

const monthOptions = [
  { value: "01", label: "Enero" },
  { value: "02", label: "Febrero" },
  { value: "03", label: "Marzo" },
  { value: "04", label: "Abril" },
  { value: "05", label: "Mayo" },
  { value: "06", label: "Junio" },
  { value: "07", label: "Julio" },
  { value: "08", label: "Agosto" },
  { value: "09", label: "Septiembre" },
  { value: "10", label: "Octubre" },
  { value: "11", label: "Noviembre" },
  { value: "12", label: "Diciembre" },
];

const today = new Date();
const currentYear = today.getFullYear();
const currentMonth = today.getMonth() + 1;
const yearOptions = Array.from({ length: 70 }, (_, index) => String(currentYear - index));

const splitYearMonth = (value: string) => {
  if (!value || value.length < 7) {
    return { year: "", month: "" };
  }

  const [year, month] = value.split("-");
  return { year: year ?? "", month: month ?? "" };
};

type ExperienceCardProps = {
  editingId: string | null;
  draft: ExperienceDraft;
  experiences: Experience[];
  onDraftChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onSubmitExperience: (event: FormEvent<HTMLFormElement>) => void;
  onResetDraft: () => void;
  onEditExperience: (experience: Experience) => void;
  onDeleteExperience: (id: string) => void;
};

export function ExperienceCard({
  editingId,
  draft,
  experiences,
  onDraftChange,
  onSubmitExperience,
  onResetDraft,
  onEditExperience,
  onDeleteExperience,
}: ExperienceCardProps) {
  const beginDate = splitYearMonth(draft.fechaComienzo);
  const endDate = splitYearMonth(draft.fechaFinalizacion);
  const [beginMonth, setBeginMonth] = useState(beginDate.month);
  const [beginYear, setBeginYear] = useState(beginDate.year);
  const [endMonth, setEndMonth] = useState(endDate.month);
  const [endYear, setEndYear] = useState(endDate.year);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setBeginMonth(beginDate.month);
    setBeginYear(beginDate.year);
  }, [beginDate.month, beginDate.year]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEndMonth(endDate.month);
    setEndYear(endDate.year);
  }, [endDate.month, endDate.year]);

  const isFutureMonthForYear = (monthValue: string, yearValue: string) => {
    if (!monthValue || !yearValue) return false;
    if (Number(yearValue) < currentYear) return false;
    if (Number(yearValue) > currentYear) return true;
    return Number(monthValue) > currentMonth;
  };

  const pushDatePart = (
    fieldName: "fechaComienzo" | "fechaFinalizacion",
    nextYear: string,
    nextMonth: string
  ) => {
    const value =
      nextYear && nextMonth
        ? `${nextYear}-${nextMonth}`
        : "";

    onDraftChange({
      target: {
        name: fieldName,
        value,
        type: "text",
      },
    } as ChangeEvent<HTMLInputElement>);
  };

  const onStartMonthChange = (month: string) => {
    if (isFutureMonthForYear(month, beginYear)) {
      setBeginMonth("");
      pushDatePart("fechaComienzo", beginYear, "");
      return;
    }

    setBeginMonth(month);
    pushDatePart("fechaComienzo", beginYear, month);
  };

  const onStartYearChange = (year: string) => {
    const normalizedMonth = isFutureMonthForYear(beginMonth, year)
      ? ""
      : beginMonth;

    setBeginYear(year);
    setBeginMonth(normalizedMonth);
    pushDatePart("fechaComienzo", year, normalizedMonth);
  };

  const onEndMonthChange = (month: string) => {
    if (isFutureMonthForYear(month, endYear)) {
      setEndMonth("");
      pushDatePart("fechaFinalizacion", endYear, "");
      return;
    }

    setEndMonth(month);
    pushDatePart("fechaFinalizacion", endYear, month);
  };

  const onEndYearChange = (year: string) => {
    const normalizedMonth = isFutureMonthForYear(endMonth, year)
      ? ""
      : endMonth;

    setEndYear(year);
    setEndMonth(normalizedMonth);
    pushDatePart("fechaFinalizacion", year, normalizedMonth);
  };

  return (
    <AppCard className="p-5 sm:p-6">
      <div className="flex items-center justify-between">
        <h3 className="font-[family-name:var(--font-spectral)] text-xl font-semibold text-slate-900">
          Experiencia laboral
        </h3>
        {editingId && (
          <button
            type="button"
            onClick={onResetDraft}
            className="text-sm font-medium text-[var(--brand-700)] hover:text-[var(--brand-900)]"
          >
            Cancelar edicion
          </button>
        )}
      </div>

      <form onSubmit={onSubmitExperience} className="mt-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="mensa-field sm:col-span-1">
            Lugar de trabajo
            <input
              name="lugarTrabajo"
              value={draft.lugarTrabajo}
              onChange={onDraftChange}
              placeholder="Mensa Empresarios"
            />
          </label>

          <label className="mensa-field sm:col-span-1">
            Puesto de trabajo
            <input
              name="puestoTrabajo"
              value={draft.puestoTrabajo}
              onChange={onDraftChange}
              placeholder="Analista de Estrategia"
            />
          </label>

          <label className="mensa-field sm:col-span-1">
            Fecha de comienzo
            <div className="grid grid-cols-2 gap-2">
              <select
                value={beginMonth}
                onChange={(event) => onStartMonthChange(event.target.value)}
                className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800"
              >
                <option value="">Mes</option>
                {monthOptions.map((month) => (
                  <option
                    key={month.value}
                    value={month.value}
                    disabled={isFutureMonthForYear(month.value, beginYear)}
                  >
                    {month.label}
                  </option>
                ))}
              </select>

              <select
                value={beginYear}
                onChange={(event) => onStartYearChange(event.target.value)}
                className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800"
              >
                <option value="">Año</option>
                {yearOptions.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
            <span className="text-xs font-normal text-slate-500">
              Selecciona mes y año (formato: mm/aaaa)
            </span>
          </label>

          <label className="mensa-field sm:col-span-1">
            Fecha de finalizacion
            <div className="grid grid-cols-2 gap-2">
              <select
                value={endMonth}
                onChange={(event) => onEndMonthChange(event.target.value)}
                disabled={draft.trabajoActual}
                className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 disabled:bg-slate-100 disabled:text-slate-500"
              >
                <option value="">Mes</option>
                {monthOptions.map((month) => (
                  <option
                    key={month.value}
                    value={month.value}
                    disabled={isFutureMonthForYear(month.value, endYear)}
                  >
                    {month.label}
                  </option>
                ))}
              </select>

              <select
                value={endYear}
                onChange={(event) => onEndYearChange(event.target.value)}
                disabled={draft.trabajoActual}
                className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 disabled:bg-slate-100 disabled:text-slate-500"
              >
                <option value="">Año</option>
                {yearOptions.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
            <span className="text-xs font-normal text-slate-500">
              {draft.trabajoActual
                ? "Deshabilitada porque marcaste trabajo actual"
                : "Selecciona mes y año (formato: mm/aaaa)"}
            </span>
          </label>

          <label className="sm:col-span-2 inline-flex items-center gap-2 text-sm font-medium text-slate-700">
            <input
              name="trabajoActual"
              type="checkbox"
              checked={draft.trabajoActual}
              onChange={onDraftChange}
              className="h-4 w-4 rounded border-slate-300 text-[var(--brand-700)] focus:ring-[var(--brand-700)]"
            />
            Actualmente trabajo aqui
          </label>
        </div>

        <button
          type="submit"
          className="mt-5 inline-flex items-center rounded-full bg-[var(--brand-700)] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[var(--brand-800)]"
        >
          {editingId ? "Actualizar experiencia" : "Agregar experiencia"}
        </button>
      </form>

      <div className="mt-5 border-t border-slate-100 pt-4">
        {experiences.length === 0 ? (
          <p className="text-sm text-slate-600">
            Todavia no agregaste experiencias laborales.
          </p>
        ) : (
          <ul className="space-y-3">
            {experiences.map((item) => (
              <li
                key={item.id}
                className="rounded-xl border border-slate-200 bg-slate-50/70 p-4"
              >
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    {item.lugarTrabajo}
                  </p>
                  <p className="text-sm font-medium text-slate-700">
                    {item.puestoTrabajo}
                  </p>
                  <p className="text-sm text-slate-600">
                    {toDateLabel(item.fechaComienzo)} - {item.trabajoActual ? "Actualidad" : toDateLabel(item.fechaFinalizacion)}
                  </p>
                </div>

                <div className="mt-3 flex gap-4 text-xs font-semibold">
                  <button
                    type="button"
                    className="text-[var(--brand-700)] hover:text-[var(--brand-900)]"
                    onClick={() => onEditExperience(item)}
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    className="text-rose-600 hover:text-rose-700"
                    onClick={() => onDeleteExperience(item.id)}
                  >
                    Eliminar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </AppCard>
  );
}
