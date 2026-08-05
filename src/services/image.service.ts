import { supabase } from "../lib/supabase";

export async function uploadImage(
  file: File,
  folder: string,
  filename: string,
) {
  const optimized = await resizeImage(file, 600, 600);
  const path = `${folder}/${filename}.webp`;

  const { error } = await supabase.storage
    .from("contextual")
    .upload(path, optimized, {
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

export async function deleteImage(path: string) {
  if (!path) return;

  const { error } = await supabase.storage.from("contextual").remove([path]);

  if (error) throw error;
}

export async function resizeImage(
  file: File,
  maxWidth = 600,
  maxHeight = 600,
): Promise<File> {
  return new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = () => {
      let { width, height } = img;

      // Calcular el factor de escala manteniendo proporciones
      const scale = Math.min(maxWidth / width, maxHeight / height, 1);

      const newWidth = Math.round(width * scale);
      const newHeight = Math.round(height * scale);

      const canvas = document.createElement("canvas");
      canvas.width = newWidth;
      canvas.height = newHeight;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("No se pudo obtener el contexto del canvas"));
        return;
      }

      // Mejor calidad de escalado
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";

      ctx.drawImage(img, 0, 0, newWidth, newHeight);

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error("No se pudo generar la imagen"));
            return;
          }

          resolve(
            new File([blob], file.name.replace(/\..+$/, ".webp"), {
              type: "image/webp",
            }),
          );
        },
        "image/webp",
        0.85, // buena compresión con buena calidad
      );
    };

    img.onerror = () => reject(new Error("No se pudo cargar la imagen"));

    img.src = URL.createObjectURL(file);
  });
}
