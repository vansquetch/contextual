import { getImageUrl, uploadImage } from "../../services/image.service";
import { useId, useState } from "react";

interface Props {
  label: string;
  value: string;
  onChange(value: string): void;
}

export default function MediaField({ label, value, onChange }: Props) {
  const [loading, setLoading] = useState(false);
  const [imageVersion, setImageVersion] = useState(0);
  const inputId = useId();

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);

    const folder = value.includes("/") ? value.split("/")[0] : "";

    const filename = value.includes("/")
      ? value.split("/")[1].replace(".webp", "")
      : value.replace(".webp", "");

    const path = await uploadImage(file, folder, filename);

    onChange(path);
    setImageVersion((v) => v + 1);
    setLoading(false);
  }

  return (
    <div className="border rounded border-gray-200 p-4 space-y-4">
      <label className="block font-medium capitalize">{label}</label>

      <label
        htmlFor={inputId}
        className="relative block h-40 cursor-pointer overflow-hidden rounded border border-gray-200 group"
      >
        <img
          src={`${getImageUrl(value)}?v=${imageVersion}`}
          alt={label}
          className="h-full w-full object-contain transition group-hover:brightness-75"
        />

        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
          <span className="rounded bg-white px-3 py-1 text-sm font-medium">
            Click para cambiar
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

      {loading && <p className="text-sm text-gray-500">Subiendo...</p>}
    </div>
  );
}
