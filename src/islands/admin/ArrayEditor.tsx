import JsonEditor from "./JsonEditor";

interface Props {
  label?: string;
  value: any[];
  onChange(value: any[]): void;
}

export default function ArrayEditor({ label, value, onChange }: Props) {
  const canRemove = value.length > 1;

  const handleAdd = () => {
    // Clona el último elemento como plantilla para el nuevo
    const template =
      value.length > 0 ? structuredClone(value[value.length - 1]) : {};
    onChange([...value, template]);
  };

  const handleRemove = (index: number) => {
    if (!canRemove) return;
    onChange(value.filter((_, i) => i !== index));
  };

  const handleMove = (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= value.length) return;
    const copy = [...value];
    [copy[index], copy[target]] = [copy[target], copy[index]];
    onChange(copy);
  };

  return (
    <div className="space-y-5">
      {label && <h2 className="type-medium">{label}</h2>}

      {value.map((item, index) => (
        <div key={index} className="card-admin space-y-3">
          <div className="flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => handleMove(index, -1)}
              disabled={index === 0}
              className="text-sm disabled:opacity-30"
              aria-label="Mover arriba"
            >
              ↑
            </button>
            <button
              type="button"
              onClick={() => handleMove(index, 1)}
              disabled={index === value.length - 1}
              className="text-sm disabled:opacity-30"
              aria-label="Mover abajo"
            >
              ↓
            </button>
            <button
              type="button"
              onClick={() => handleRemove(index)}
              disabled={!canRemove}
              className="text-sm text-red-600 disabled:opacity-30"
              aria-label="Eliminar"
            >
              Eliminar
            </button>
          </div>

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

      <button type="button" onClick={handleAdd} className="text-sm font-medium">
        + Agregar elemento
      </button>
    </div>
  );
}
