export function slugify(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // quita acentos
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Genera un id a partir de un texto semilla (title/name). Si no hay texto
 * usable, cae a un id aleatorio corto. Si el resultado ya existe en
 * `existingIds`, le agrega un sufijo numérico hasta que sea único.
 */
export function generateUniqueId(
  seed: string | undefined,
  existingIds: string[],
): string {
  const base =
    (seed && slugify(seed)) || Math.random().toString(36).slice(2, 8);
  let candidate = base || Math.random().toString(36).slice(2, 8);
  let i = 2;

  while (existingIds.includes(candidate)) {
    candidate = `${base}-${i++}`;
  }

  return candidate;
}
