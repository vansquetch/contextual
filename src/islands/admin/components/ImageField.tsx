import {
  deleteImage,
  getImageUrl,
  uploadImage,
} from "../../../services/image.service";
import { useId, useState } from "react";

interface Props {
  label: string;
  value: string;
  onChange(value: string): void;
  /** Fallback usado solo si `value` está vacío (imagen nueva, sin ruta previa). */
  folder?: string;
  /** Fallback usado solo si `value` está vacío (imagen nueva, sin ruta previa). */
  filename?: string;
}

export default function MediaField({
  label,
  value,
  onChange,
  folder: folderHint,
  filename: filenameHint,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [imageVersion, setImageVersion] = useState(0);
  const inputId = useId();

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);

    const folder = value.includes("/")
      ? value.split("/")[0]
      : (folderHint ?? "");

    const filename = value.includes("/")
      ? value.split("/")[1].replace(".webp", "")
      : value.replace(".webp", "") ||
        filenameHint ||
        Math.random().toString(36).slice(2, 8);

    const path = await uploadImage(file, folder, filename);

    onChange(path);
    setImageVersion((v) => v + 1);
    setLoading(false);
  }

  async function handleClear() {
    if (!value) return;
    if (!confirm("¿Eliminar esta imagen? El campo quedará en blanco.")) return;

    setLoading(true);

    try {
      await deleteImage(value);
    } catch (err) {
      // No bloquea la limpieza del campo si falla el borrado en Storage
      // (ej. el archivo ya no existe, o hay un problema de permisos).
      console.error("No se pudo borrar el archivo en Storage:", err);
    }

    onChange("");
    setImageVersion((v) => v + 1);
    setLoading(false);
  }

  return (
    <div className="border rounded border-gray-200 p-4 space-y-4">
      <label className="block font-medium capitalize">{label}</label>

      <label
        htmlFor={inputId}
        className="relative block h-40 cursor-pointer overflow-hidden rounded border border-gray-200 group bg-gray-50"
      >
        {value ? (
          <img
            src={`${getImageUrl(value)}?v=${imageVersion}`}
            alt={label}
            className="h-full w-full object-contain transition group-hover:brightness-75"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-gray-400">
            Sin imagen
          </div>
        )}

        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
          <span className="rounded bg-white px-3 py-1 text-sm font-medium">
            Click para {value ? "cambiar" : "subir"}
          </span>
        </div>
      </label>

      <input
        id={inputId}
        type="file"
        accept="image/webp"
        className="hidden"
        onChange={handleFile}
      />

      <div className="flex items-center justify-between">
        {loading && <p className="text-sm text-gray-500">Procesando...</p>}

        {value && !loading && (
          <button
            type="button"
            onClick={handleClear}
            className="text-sm text-red-600"
          >
            Eliminar imagen
          </button>
        )}
      </div>
    </div>
  );
}
