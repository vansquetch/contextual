import PrimitiveEditor from "./PrimitiveEditor";
import ObjectEditor from "./ObjectEditor";
import ArrayEditor from "./ArrayEditor";

interface Props {
    label?: string;
    value: any;
    onChange: (value: any) => void;
}

export default function JsonEditor({
    label,
    value,
    onChange
}: Props) {

    if (Array.isArray(value)) {
        return (
            <ArrayEditor
                label={label}
                value={value}
                onChange={onChange}
            />
        );
    }

    if (typeof value === "object" && value !== null) {
        return (
            <ObjectEditor
                label={label}
                value={value}
                onChange={onChange}
            />
        );
    }

    return (
        <PrimitiveEditor
            label={label}
            value={value}
            onChange={onChange}
        />
    );

}