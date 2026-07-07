import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import JsonEditor from "./JsonEditor";
import { generateUniqueId } from "../../lib/id";
import type { Lang } from "../../types/content";

interface Props {
  label?: string;
  value: any[];
  onChange(value: any[]): void;
  pathPrefix?: string;
  lang?: Lang;
}

/**
 * Al clonar el último item como plantilla para uno nuevo:
 * - Los campos de imagen se resetean (no se hereda la foto del anterior).
 * - El id se limpia (se genera aparte, en handleAdd).
 * - El resto de campos se mantiene como plantilla, igual que antes.
 */
function resetForNewItem(item: any): any {
  if (Array.isArray(item)) return item.map(resetForNewItem);

  if (item && typeof item === "object") {
    if (item.type === "image" && typeof item.content === "string") {
      return { type: "image", content: "" };
    }

    const copy: Record<string, any> = {};
    for (const [k, v] of Object.entries(item)) {
      copy[k] = k === "id" ? "" : resetForNewItem(v);
    }
    return copy;
  }

  return item;
}

/** Extrae un texto "semilla" (para el slug del id) de un campo que puede ser
 * un string plano o un {es,en} bilingüe. */
function extractSeedText(field: any, lang?: Lang): string | undefined {
  if (typeof field === "string") return field;
  if (field && typeof field === "object") {
    return field[lang ?? "es"] ?? field.es ?? field.en;
  }
  return undefined;
}

export default function ArrayEditor({
  label,
  value,
  onChange,
  pathPrefix,
  lang,
}: Props) {
  const canRemove = value.length > 1;
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);
  const highlightTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const flashHighlight = (index: number) => {
    if (highlightTimeout.current) clearTimeout(highlightTimeout.current);
    setHighlightedIndex(index);
    highlightTimeout.current = setTimeout(() => {
      setHighlightedIndex(null);
    }, 600);
  };

  const handleAdd = () => {
    const templateSource = value.length > 0 ? value[value.length - 1] : {};
    const draft = resetForNewItem(structuredClone(templateSource));

    if (
      templateSource &&
      typeof templateSource === "object" &&
      "id" in templateSource
    ) {
      const existingIds = value.map((v) => v?.id).filter(Boolean);
      const seed = extractSeedText(draft.title ?? draft.name, lang);
      draft.id = generateUniqueId(seed, existingIds);
    }

    onChange([...value, draft]);
  };

  const handleRemove = (index: number) => {
    if (!canRemove || !confirm("¿Seguro desea eliminar este bloque?")) return;
    onChange(value.filter((_, i) => i !== index));
  };

  const handleMove = (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= value.length) return;
    const copy = [...value];
    [copy[index], copy[target]] = [copy[target], copy[index]];
    onChange(copy);
    flashHighlight(target);
  };

  return (
    <div className="space-y-2">
      {label && <h2 className="type-medium">{label}</h2>}

      <AnimatePresence initial={false}>
        {value.map((item, index) => (
          <motion.div
            key={item?.id ?? index}
            layout
            transition={{ type: "spring", stiffness: 500, damping: 35 }}
            animate={{
              backgroundColor:
                highlightedIndex === index
                  ? "rgba(250, 204, 21, 0.25)" // amarillo suave temporal
                  : "rgba(0, 0, 0, 0)",
            }}
            className=" space-y-3"
          >
            <div className="flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => handleMove(index, -1)}
                disabled={index === 0}
                className="text-sm disabled:opacity-30"
                aria-label="Mover arriba"
              >
                ↑
              </button>
              <button
                type="button"
                onClick={() => handleMove(index, 1)}
                disabled={index === value.length - 1}
                className="text-sm disabled:opacity-30"
                aria-label="Mover abajo"
              >
                ↓
              </button>
              <button
                type="button"
                onClick={() => handleRemove(index)}
                disabled={!canRemove}
                className="text-sm text-red-600 disabled:opacity-30"
                aria-label="Eliminar"
              >
                Eliminar
              </button>
            </div>

            <JsonEditor
              value={item}
              pathPrefix={pathPrefix}
              lang={lang}
              onChange={(newItem) => {
                const copy = [...value];
                copy[index] = newItem;
                onChange(copy);
              }}
            />
          </motion.div>
        ))}
      </AnimatePresence>

      <button
        type="button"
        onClick={handleAdd}
        className="text-sm font-medium bg-primary-500 text-white p-2"
      >
        + Agregar elemento
      </button>
    </div>
  );
}
