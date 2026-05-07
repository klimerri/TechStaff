import "./Input.scss";

export const Input = ({
    label,
    error,
    disabled = false,
    className = "",
    ...props
}) => {
    return (
        <div
            className={`input ${disabled ? "disabled" : ""} ${className}`}
        >
            {label && (
                <label className="input__label">
                    {label}
                </label>
            )}

            <input
                className={`input__field ${error ? "error" : ""}`}
                disabled={disabled}
                {...props}
            />

            {error && (
                <span className="input__error">
                    {error}
                </span>
            )}
        </div>
    );
};