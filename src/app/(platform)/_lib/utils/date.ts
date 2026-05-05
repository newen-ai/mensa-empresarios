export const toDateLabel = (value: string) => {
  if (!value) return "";

  const normalizedValue = value.length === 7 ? `${value}-01` : value;

  return new Date(`${normalizedValue}T00:00:00`).toLocaleDateString("es-AR", {
    year: "numeric",
    month: "short",
  });
};
