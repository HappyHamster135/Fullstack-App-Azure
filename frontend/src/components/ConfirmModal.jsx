import { Alert, Button, Modal } from "react-bootstrap";

function ConfirmModal({
  show,
  title,
  message,
  confirmLabel = "Ta bort",
  error,
  isBusy,
  onConfirm,
  onCancel,
}) {
  return (
    <Modal show={show} onHide={onCancel} centered>
      <Modal.Header closeButton>
        <Modal.Title as="h2" className="h5">
          {title}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        <p className="mb-0">{message}</p>
      </Modal.Body>

      <Modal.Footer>
        <Button
          variant="outline-secondary"
          onClick={onCancel}
          disabled={isBusy}
        >
          Avbryt
        </Button>
        <Button variant="danger" onClick={onConfirm} disabled={isBusy}>
          {isBusy ? "Tar bort…" : confirmLabel}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ConfirmModal;
