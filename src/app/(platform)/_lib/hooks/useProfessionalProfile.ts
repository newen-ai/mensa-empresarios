"use client";

import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";
import { emptyExperience, emptyProfile, STORAGE_KEY } from "../constants";
import { Experience, ExperienceDraft, Profile } from "../types";

type ProfileEntry = {
  id: string;
  profile: Profile;
  experiences: Experience[];
};

const DEFAULT_PROFILE_ID = "profile-default";
const MOCK_PROFILE_ID = "profile-mock-existing";

const defaultProfileEntry: ProfileEntry = {
  id: DEFAULT_PROFILE_ID,
  profile: emptyProfile,
  experiences: [],
};

const mockProfileEntry: ProfileEntry = {
  id: MOCK_PROFILE_ID,
  profile: {
    nombre: "Ada",
    apellido: "Lovelace",
    fechaNacimiento: "1986-12-10",
    nacionalidad: "Britanica",
    puesto: "Chief Technology Strategist",
  },
  experiences: [
    {
      id: "mock-exp-1",
      puestoTrabajo: "Principal AI Advisor",
      lugarTrabajo: "Quantum Forge Labs",
      fechaComienzo: "2022-03",
      fechaFinalizacion: "",
      trabajoActual: true,
    },
    {
      id: "mock-exp-2",
      puestoTrabajo: "VP de Producto Digital",
      lugarTrabajo: "Orion Cloud Systems",
      fechaComienzo: "2018-05",
      fechaFinalizacion: "2022-02",
      trabajoActual: false,
    },
  ],
};

const isFutureYearMonth = (value: string) => {
  if (!value) return false;

  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const currentYearMonth = `${year}-${month}`;

  return value > currentYearMonth;
};

export const useProfessionalProfile = () => {
  const [profiles, setProfiles] = useState<ProfileEntry[]>([defaultProfileEntry]);
  const [activeProfileId, setActiveProfileId] = useState(DEFAULT_PROFILE_ID);
  const [draft, setDraft] = useState<ExperienceDraft>(emptyExperience);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [readyToSave, setReadyToSave] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as {
          activeProfileId?: string;
          profiles?: ProfileEntry[];
          profile?: Profile;
          experiences?: Experience[];
        };

        if (Array.isArray(parsed.profiles) && parsed.profiles.length > 0) {
          // eslint-disable-next-line react-hooks/set-state-in-effect
          setProfiles(parsed.profiles);
          setActiveProfileId(parsed.activeProfileId ?? parsed.profiles[0].id);
        } else {
          const legacyProfile = parsed.profile ?? emptyProfile;
          const legacyExperiences = Array.isArray(parsed.experiences)
            ? parsed.experiences
            : [];

          setProfiles([
            {
              id: DEFAULT_PROFILE_ID,
              profile: legacyProfile,
              experiences: legacyExperiences,
            },
          ]);
          setActiveProfileId(DEFAULT_PROFILE_ID);
        }
      }
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    } finally {
      setReadyToSave(true);
    }
  }, []);

  const normalizedProfiles = useMemo(
    () =>
      profiles.map((entry) => ({
        ...entry,
        experiences: entry.experiences.map((item) => ({
            ...item,
            puestoTrabajo: item.puestoTrabajo ?? "",
            fechaComienzo:
              item.fechaComienzo?.length === 10
                ? item.fechaComienzo.slice(0, 7)
                : item.fechaComienzo,
            fechaFinalizacion:
              item.fechaFinalizacion?.length === 10
                ? item.fechaFinalizacion.slice(0, 7)
                : item.fechaFinalizacion,
            trabajoActual: item.trabajoActual ?? !item.fechaFinalizacion,
          })),
      })),
    [profiles]
  );

  const activeProfileEntry = useMemo(
    () =>
      normalizedProfiles.find((entry) => entry.id === activeProfileId) ??
      normalizedProfiles[0] ??
      null,
    [normalizedProfiles, activeProfileId]
  );

  const profile = activeProfileEntry?.profile ?? emptyProfile;
  const activeProfileIdResolved = activeProfileEntry?.id ?? "";

  useEffect(() => {
    if (!readyToSave) return;

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        activeProfileId: activeProfileIdResolved,
        profiles: normalizedProfiles,
      })
    );
  }, [activeProfileIdResolved, normalizedProfiles, readyToSave]);

  const sortedExperiences = useMemo(() => {
    const currentExperiences = activeProfileEntry?.experiences ?? [];
    return [...currentExperiences].sort((a, b) => {
      const startDiff = b.fechaComienzo.localeCompare(a.fechaComienzo);
      if (startDiff !== 0) return startDiff;
      return b.fechaFinalizacion.localeCompare(a.fechaFinalizacion);
    });
  }, [activeProfileEntry]);

  const profileOptions = useMemo(
    () =>
      normalizedProfiles.map((entry, index) => {
        const firstName = entry.profile.nombre.trim();
        const lastName = entry.profile.apellido.trim();
        const fullName = `${firstName} ${lastName}`.trim();

        return {
          id: entry.id,
          title: fullName || `Perfil ${index + 1}`,
          subtitle: entry.profile.puesto || "Sin puesto cargado",
        };
      }),
    [normalizedProfiles]
  );

  const profileCompletion = useMemo(() => {
    const totalFields = 5;
    const completed = [
      profile.nombre,
      profile.apellido,
      profile.fechaNacimiento,
      profile.nacionalidad,
      profile.puesto,
    ].filter(Boolean).length;

    return Math.round((completed / totalFields) * 100);
  }, [profile]);

  const userDisplayName =
    profile.nombre || profile.apellido
      ? `${profile.nombre} ${profile.apellido}`.trim()
      : "Nombre y apellido";

  const initials = `${profile.nombre.charAt(0)}${profile.apellido.charAt(0)}`
    .toUpperCase()
    .trim();

  const handleProfileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setProfiles((current) =>
      current.map((entry) =>
        entry.id === activeProfileIdResolved
          ? {
              ...entry,
              profile: {
                ...entry.profile,
                [name]: value,
              },
            }
          : entry
      )
    );
  };

  const handleDraftChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, type, value, checked } = event.target;

    if (name === "trabajoActual") {
      setDraft((current) => ({
        ...current,
        trabajoActual: checked,
        fechaFinalizacion: checked ? "" : current.fechaFinalizacion,
      }));
      return;
    }

    setDraft((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const resetDraft = () => {
    setDraft(emptyExperience);
    setEditingId(null);
  };

  const onSubmitExperience = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      !draft.puestoTrabajo ||
      !draft.lugarTrabajo ||
      !draft.fechaComienzo ||
      (!draft.trabajoActual && !draft.fechaFinalizacion)
    ) {
      return;
    }

    if (
      isFutureYearMonth(draft.fechaComienzo) ||
      (!draft.trabajoActual && isFutureYearMonth(draft.fechaFinalizacion))
    ) {
      return;
    }

    if (editingId) {
      setProfiles((current) =>
        current.map((entry) =>
          entry.id === activeProfileIdResolved
            ? {
                ...entry,
                experiences: entry.experiences.map((item) =>
                  item.id === editingId ? { ...item, ...draft } : item
                ),
              }
            : entry
        )
      );
      resetDraft();
      return;
    }

    setProfiles((current) =>
      current.map((entry) =>
        entry.id === activeProfileIdResolved
          ? {
              ...entry,
              experiences: [
                ...entry.experiences,
                {
                  id: crypto.randomUUID(),
                  ...draft,
                },
              ],
            }
          : entry
      )
    );

    resetDraft();
  };

  const onEditExperience = (item: Experience) => {
    setEditingId(item.id);
    setDraft({
      puestoTrabajo: item.puestoTrabajo,
      lugarTrabajo: item.lugarTrabajo,
      fechaComienzo: item.fechaComienzo,
      fechaFinalizacion: item.fechaFinalizacion,
      trabajoActual: item.trabajoActual,
    });
  };

  const onDeleteExperience = (id: string) => {
    setProfiles((current) =>
      current.map((entry) =>
        entry.id === activeProfileIdResolved
          ? {
              ...entry,
              experiences: entry.experiences.filter((item) => item.id !== id),
            }
          : entry
      )
    );
    if (editingId === id) {
      resetDraft();
    }
  };

  const selectProfile = (id: string) => {
    setActiveProfileId(id);
    resetDraft();
  };

  const createNewProfile = () => {
    const newId = crypto.randomUUID();
    const newEntry: ProfileEntry = {
      id: newId,
      profile: emptyProfile,
      experiences: [],
    };

    setProfiles((current) => [newEntry, ...current]);
    setActiveProfileId(newId);
    resetDraft();
  };

  const loadMockProfile = () => {
    setProfiles((current) => {
      if (current.some((entry) => entry.id === MOCK_PROFILE_ID)) {
        return current;
      }

      return [mockProfileEntry, ...current];
    });
    setActiveProfileId(MOCK_PROFILE_ID);
    resetDraft();
  };

  const hasMockProfile = useMemo(
    () => normalizedProfiles.some((entry) => entry.id === MOCK_PROFILE_ID),
    [normalizedProfiles]
  );

  return {
    profile,
    draft,
    editingId,
    sortedExperiences,
    profileOptions,
    activeProfileId: activeProfileIdResolved,
    hasMockProfile,
    profileCompletion,
    userDisplayName,
    initials,
    handleProfileChange,
    handleDraftChange,
    resetDraft,
    onSubmitExperience,
    onEditExperience,
    onDeleteExperience,
    selectProfile,
    createNewProfile,
    loadMockProfile,
  };
};
