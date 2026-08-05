// utils/reorderKeys.ts
export function reorderKeys<T>(data: T, template: T): T {
  if (Array.isArray(data)) {
    const itemTemplate = Array.isArray(template) ? template[0] : undefined;
    return data.map((item) =>
      itemTemplate !== undefined ? reorderKeys(item, itemTemplate) : item
    ) as unknown as T;
  }

  if (
    data !== null &&
    typeof data === "object" &&
    template !== null &&
    typeof template === "object"
  ) {
    const result: Record<string, unknown> = {};
    const templateKeys = Object.keys(template as object);

    // 1. primero las keys en el orden de la plantilla
    for (const key of templateKeys) {
      if (key in (data as object)) {
        result[key] = reorderKeys(
          (data as any)[key],
          (template as any)[key]
        );
      }
    }

    // 2. cualquier key "extra" que venga de supabase pero no esté en la plantilla,
    //    se conserva al final (para no perder datos por error)
    for (const key of Object.keys(data as object)) {
      if (!(key in result)) {
        result[key] = (data as any)[key];
      }
    }

    return result as T;
  }

  return data;
}