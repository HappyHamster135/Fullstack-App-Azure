import { Form } from "react-bootstrap";

function FormField({
  label,
  name,
  type = "text",
  value,
  error,
  hint,
  options,
  onChange,
  ...inputProps
}) {
  const sharedProps = {
    name,
    value,
    isInvalid: Boolean(error),
    onChange,
    ...inputProps,
  };

  return (
    <Form.Group className="mb-3" controlId={name}>
      <Form.Label>{label}</Form.Label>

      {options ? (
        <Form.Select {...sharedProps}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Form.Select>
      ) : type === "textarea" ? (
        <Form.Control as="textarea" {...sharedProps} />
      ) : (
        <Form.Control type={type} {...sharedProps} />
      )}

      <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
      {hint && !error && <Form.Text muted>{hint}</Form.Text>}
    </Form.Group>
  );
}

export default FormField;
