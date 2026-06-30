import { getImageUrl, uploadImage } from "../../services/image.service";
import { useState } from "react";

interface Props {
  label: string;
  value: string;
  onChange(value: string): void;
}

export default function MediaField({ label, value, onChange }: Props) {
  const [loading, setLoading] = useState(false);

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

    setLoading(false);
  }

  return (
    <div className="border rounded-xl p-4 space-y-4">
      <label className="block font-medium capitalize">{label}</label>

      <img
        src={getImageUrl(value)}
        alt={label}
        className="h-40 rounded-lg border object-contain"
      />

      <input type="file" accept="image/*" onChange={handleFile} />

      {loading && <p className="text-sm text-gray-500">Subiendo...</p>}
    </div>
  );
}
