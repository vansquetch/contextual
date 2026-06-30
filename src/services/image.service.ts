import { supabase } from "../lib/supabase";

export async function uploadImage(
  file: File,
  folder: string,
  filename: string,
) {
  const path = `${folder}/${filename}.webp`;

  const { error } = await supabase.storage
    .from("contextual")
    .upload(path, file, {
      upsert: true,
      contentType: "image/webp",
    });

  if (error) throw error;

  return path;
}

export function getImageUrl(path: string) {
  const { data } = supabase.storage.from("contextual").getPublicUrl(path);

  return data.publicUrl;
}

export async function resizeImage(
  file: File,
  width: number,
  height: number,
): Promise<File> {
  return new Promise((resolve) => {
    const img = new Image();

    img.onload = () => {
      const canvas = document.createElement("canvas");

      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d")!;

      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob(
        (blob) => {
          resolve(
            new File([blob!], file.name.replace(/\..+$/, ".webp"), {
              type: "image/webp",
            }),
          );
        },
        "image/webp",
        0.9,
      );
    };

    img.src = URL.createObjectURL(file);
  });
}
