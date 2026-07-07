import PrimitiveEditor from "./PrimitiveEditor";
import type { Lang, LocalizedText } from "../../types/content";

interface Props {
  label?: string;
  value: LocalizedText;
  onChange(value: LocalizedText): void;
  lang: Lang;
}

export default function LocalizedPrimitiveEditor({
  label,
  value,
  onChange,
  lang,
}: Props) {
  return (
    <PrimitiveEditor
      label={label}
      value={value[lang]}
      onChange={(newValue) => onChange({ ...value, [lang]: newValue })}
    />
  );
}
