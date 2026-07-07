import PrimitiveEditor from "./PrimitiveEditor";
import ObjectEditor from "./ObjectEditor";
import ArrayEditor from "./ArrayEditor";
import LocalizedPrimitiveEditor from "./LocalizedPrimitiveEditor";
import type { Lang } from "../../types/content";
import ImageFieldEditor from "./ImageFieldeditor";

interface Props {
  label?: string;
  value: any;
  onChange: (value: any) => void;
  /** Nombre de la sección (ej. "team", "network") usado para armar la ruta de Storage. */
  pathPrefix?: string;
  /** Id del objeto padre más cercano (ej. el id del member/item), usado como filename. */
  idHint?: string;
  /** Idioma activo en el admin, usado para los campos de texto bilingües {es,en}. */
  lang?: Lang;
}

function isImageField(value: any): value is { type: "image"; content: string } {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value) &&
    value.type === "image" &&
    typeof value.content === "string"
  );
}

function isLocalizedText(value: any): value is { es: string; en: string } {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value) &&
    typeof value.es === "string" &&
    typeof value.en === "string" &&
    Object.keys(value).length === 2
  );
}

export default function JsonEditor({
  label,
  value,
  onChange,
  pathPrefix,
  idHint,
  lang,
}: Props) {
  if (isImageField(value)) {
    return (
      <ImageFieldEditor
        label={label}
        value={value}
        onChange={onChange}
        folder={pathPrefix}
        filename={idHint ?? label}
      />
    );
  }

  if (isLocalizedText(value) && lang) {
    return (
      <LocalizedPrimitiveEditor
        label={label}
        value={value}
        onChange={onChange}
        lang={lang}
      />
    );
  }

  if (Array.isArray(value)) {
    return (
      <ArrayEditor
        label={label}
        value={value}
        onChange={onChange}
        pathPrefix={pathPrefix}
        lang={lang}
      />
    );
  }

  if (typeof value === "object" && value !== null) {
    return (
      <ObjectEditor
        label={label}
        value={value}
        onChange={onChange}
        pathPrefix={pathPrefix}
        idHint={idHint}
        lang={lang}
      />
    );
  }

  return <PrimitiveEditor label={label} value={value} onChange={onChange} />;
}
