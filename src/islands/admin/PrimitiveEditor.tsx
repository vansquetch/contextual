interface Props {
  label?: string;

  value: any;

  onChange(value: any): void;
}

export default function PrimitiveEditor({
  label,

  value,

  onChange,
}: Props) {
  if (typeof value === "boolean") {
    return (
      <label className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={value}
          onChange={(e) => onChange(e.target.checked)}
        />

        {label}
      </label>
    );
  }

  const multiline = typeof value === "string" && value.length > 120;

  return (
    <div className="space-y-2">
      {label && <label className="font-medium">{label}</label>}

      {multiline ? (
        <textarea
          rows={6}
          className="input-admin"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <input
          className="input-admin"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </div>
  );
}
