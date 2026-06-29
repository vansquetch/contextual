import JsonEditor from "./JsonEditor";

interface Props {
  label?: string;

  value: any[];

  onChange(value: any[]): void;
}

export default function ArrayEditor({
  label,

  value,

  onChange,
}: Props) {
  return (
    <div className="space-y-5">
      {label && <h2 className="type-medium">{label}</h2>}

      {value.map((item, index) => (
        <div key={index} className="card-admin">
          <JsonEditor
            value={item}
            onChange={(newItem) => {
              const copy = [...value];

              copy[index] = newItem;

              onChange(copy);
            }}
          />
        </div>
      ))}
    </div>
  );
}
