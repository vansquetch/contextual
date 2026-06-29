import JsonEditor from "./JsonEditor";

interface Props {
  label?: string;

  value: Record<string, any>;

  onChange(value: any): void;
}

export default function ObjectEditor({
  label,

  value,

  onChange,
}: Props) {
  return (
    <div className="card-admin space-y-6">
      {label && <h2 className="type-medium">{label}</h2>}

      {Object.entries(value).map(([key, val]) => (
        <JsonEditor
          key={key}
          label={key}
          value={val}
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
