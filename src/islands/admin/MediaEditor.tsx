import { useState } from "react";
import type { MediaContent } from "../../types/content.ts";
import MediaField from "./MediaField.tsx";

interface Props {
  value: MediaContent;
  section: string;
  onChange(value: MediaContent): void;
}

export default function MediaEditor({ value, onChange, section }: Props) {
  return (
    <div className="space-y-8 flex flex-col p-4 bg-white mb-2">
      <div className="flex gap-4">
        {Object.entries(value[section as keyof MediaContent]).map(
          ([key, image]) => (
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
          ),
        )}
      </div>
    </div>
  );
}
