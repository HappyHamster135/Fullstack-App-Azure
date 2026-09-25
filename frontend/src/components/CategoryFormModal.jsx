import { Alert, Button, Form, Modal } from "react-bootstrap";
import { useForm } from "../hooks/useForm.js";
import { validateCategory } from "../utils/validation.js";
import FormField from "./FormField.jsx";

const DEFAULT_COLOR = "#0d6efd";

function CategoryFormModal({ category, onSave, onClose }) {
  const {
    values,
    errors,
    serverError,
    isSubmitting,
    handleChange,
    handleSubmit,
  } = useForm(
    { name: category?.name ?? "", color: category?.color ?? DEFAULT_COLOR },
    validateCategory,
    async (formValues) => {
      await onSave({ name: formValues.name.trim(), color: formValues.color });
      onClose();
    },
  );

  return (
    <Modal show onHide={onClose} centered>
      <Form noValidate onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title as="h2" className="h5">
            {category ? "Redigera kategori" : "Ny kategori"}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {serverError && <Alert variant="danger">{serverError}</Alert>}

          <FormField
            label="Namn"
            name="name"
            value={values.name}
            error={errors.name}
            onChange={handleChange}
          />

          <FormField
            label="Färg"
            name="color"
            type="color"
            value={values.color}
            error={errors.color}
            onChange={handleChange}
          />
        </Modal.Body>

        <Modal.Footer>
          <Button variant="outline-secondary" onClick={onClose}>
            Avbryt
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Sparar…" : "Spara"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default CategoryFormModal;
