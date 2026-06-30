import { useState } from "react";

import { getImageUrl, uploadImage } from "../../../services/image.service.ts";

interface Props {
  value: string;
  folder: string;
  filename: string;
  width: number;
  height: number;
  onChange(path: string): void;
}

export default function ImageField({
  value,
  folder,
  filename,
  width,
  height,
  onChange,
}: Props) {
  const [loading, setLoading] = useState(false);

  async function changeImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (!file) return;

    setLoading(true);

    const path = await uploadImage(file, folder, filename, width, height);

    onChange(path);

    setLoading(false);
  }

  return (
    <div className="space-y-4">
      {value && (
        <img src={getImageUrl(value)} className="max-h-60 rounded-lg border" />
      )}

      <label className="inline-flex cursor-pointer rounded-lg bg-primary-500 px-4 py-2 text-white">
        {loading ? "Subiendo..." : "Cambiar imagen"}

        <input hidden type="file" accept="image/*" onChange={changeImage} />
      </label>
    </div>
  );
}
