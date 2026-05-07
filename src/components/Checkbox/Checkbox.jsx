import "./Checkbox.scss";

export const Checkbox = ({
    checked = false,
    onChange,
    label,
    disabled = false,
    style
}) => {
    return (
        <label
            className={`checkbox ${disabled ? "disabled" : ""}`}
            style={style}
        >
            <input
                type="checkbox"
                checked={checked}
                disabled={disabled}
                onChange={(e) => onChange?.(e.target.checked)}
            />

            <span className="checkbox__custom">
                <span className="checkbox__checkmark" />
            </span>

            {label && (
                <span className="checkbox__label">
                    {label}
                </span>
            )}
        </label>
    );
};