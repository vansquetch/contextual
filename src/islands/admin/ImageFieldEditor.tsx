import MediaField from "./MediaField";
import type { ImageField } from "../../types/content";

interface Props {
  label?: string;
  value: ImageField;
  onChange(value: ImageField): void;
  folder?: string;
  filename?: string;
}

export default function ImageFieldEditor({
  label,
  value,
  onChange,
  folder,
  filename,
}: Props) {
  return (
    <MediaField
      label={label ?? "Imagen"}
      value={value.content}
      folder={folder}
      filename={filename}
      onChange={(content) => onChange({ type: "image", content })}
    />
  );
}
