import JsonEditor from "./JsonEditor";

interface Props {
  label?: string;
  value: Record<string, any>;
  onChange(value: any): void;
  pathPrefix?: string;
  idHint?: string;
}

export default function ObjectEditor({
  label,
  value,
  onChange,
  pathPrefix,
  idHint,
}: Props) {
  // Si este objeto tiene su propio id (ej. un TeamMember o NetworkItem),
  // se convierte en el idHint para sus campos hijos (ej. su campo de imagen).
  const ownId = typeof value.id === "string" ? value.id : idHint;

  return (
    <div className="card-admin space-y-6">
      {label && <h2 className="type-medium">{label}</h2>}

      {Object.entries(value)
        .filter(([key]) => key !== "id") // el id lo maneja el programa, no el usuario
        .map(([key, val]) => (
          <JsonEditor
            key={key}
            label={key}
            value={val}
            pathPrefix={pathPrefix}
            idHint={ownId}
            onChange={(newValue) => {
              onChange({
                ...value,
                [key]: newValue,
              });
            }}
          />
        ))}
    </div>
  );
}
