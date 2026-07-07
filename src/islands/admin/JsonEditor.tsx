import PrimitiveEditor from "./PrimitiveEditor";
import ObjectEditor from "./ObjectEditor";
import ArrayEditor from "./ArrayEditor";
import ImageFieldEditor from "./ImageFieldeditor";

interface Props {
  label?: string;
  value: any;
  onChange: (value: any) => void;
  /** Nombre de la sección (ej. "team", "network") usado para armar la ruta de Storage. */
  pathPrefix?: string;
  /** Id del objeto padre más cercano (ej. el id del member/item), usado como filename. */
  idHint?: string;
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

export default function JsonEditor({
  label,
  value,
  onChange,
  pathPrefix,
  idHint,
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

  if (Array.isArray(value)) {
    return (
      <ArrayEditor
        label={label}
        value={value}
        onChange={onChange}
        pathPrefix={pathPrefix}
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
      />
    );
  }

  return <PrimitiveEditor label={label} value={value} onChange={onChange} />;
}
