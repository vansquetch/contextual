import type { MediaContent } from "../../types/content.ts";
import MediaField from "./MediaField.tsx";

interface Props {
  value: MediaContent;
  onChange(value: Record<string, string>): void;
}

export default function MediaEditor({ value, onChange }: Props) {
  return (
    <div className="space-y-8">
      {Object.entries(value).map(([key, image]) => (
        <MediaField
          key={key}
          label={key}
          value={image}
          onChange={(newImage) =>
            onChange({
              ...value,
              [key]: newImage,
            })
          }
        />
      ))}
    </div>
  );
}
