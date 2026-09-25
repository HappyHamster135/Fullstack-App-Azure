import { Badge, Button, Card } from "react-bootstrap";
import { intervalSuffix } from "../utils/billingIntervals.js";
import {
  daysUntil,
  describeDue,
  formatCurrency,
  formatDate,
} from "../utils/format.js";
import CategoryLabel from "./CategoryLabel.jsx";

function SubscriptionCard({
  subscription,
  isPaying,
  onRegisterPayment,
  onEdit,
  onDelete,
}) {
  const {
    name,
    price,
    billingInterval,
    monthlyCost,
    nextPaymentDate,
    isActive,
    notes,
    category,
  } = subscription;

  const isOverdue = isActive && daysUntil(nextPaymentDate) < 0;

  return (
    <Card className={`h-100 shadow-sm ${isActive ? "" : "bg-body-tertiary"}`}>
      <Card.Body className="d-flex flex-column">
        <div className="d-flex justify-content-between align-items-start gap-2 mb-2">
          <CategoryLabel
            category={category}
            className="small text-body-secondary"
          />
          <Badge bg={isActive ? "success" : "secondary"}>
            {isActive ? "Aktiv" : "Pausad"}
          </Badge>
        </div>

        <Card.Title as="h2" className="h5 mb-1">
          {name}
        </Card.Title>

        <p className="mb-1">
          <span className="fs-4 fw-semibold">{formatCurrency(price)}</span>{" "}
          <span className="text-body-secondary">
            {intervalSuffix(billingInterval)}
          </span>
        </p>

        {billingInterval !== "Monthly" && (
          <p className="small text-body-secondary mb-1">
            ≈ {formatCurrency(monthlyCost)} / mån
          </p>
        )}

        <p className="small mb-2">
          Nästa betalning: <strong>{formatDate(nextPaymentDate)}</strong>
          {isActive && (
            <span className={isOverdue ? "text-danger" : "text-body-secondary"}>
              {" "}
              ({describeDue(nextPaymentDate)})
            </span>
          )}
        </p>

        {notes && (
          <p className="small text-body-secondary fst-italic mb-2">{notes}</p>
        )}

        <div className="d-flex flex-wrap gap-2 mt-auto pt-2">
          {isActive && (
            <Button
              size="sm"
              variant="outline-success"
              disabled={isPaying}
              onClick={onRegisterPayment}
            >
              {isPaying ? "Registrerar…" : "Markera betald"}
            </Button>
          )}
          <Button size="sm" variant="outline-primary" onClick={onEdit}>
            Redigera
          </Button>
          <Button size="sm" variant="outline-danger" onClick={onDelete}>
            Ta bort
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default SubscriptionCard;
