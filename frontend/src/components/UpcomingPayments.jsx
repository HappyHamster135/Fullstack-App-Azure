import { Card, ListGroup } from "react-bootstrap";
import {
  daysUntil,
  describeDue,
  formatCurrency,
  formatDate,
} from "../utils/format.js";
import CategoryLabel from "./CategoryLabel.jsx";

function UpcomingPayments({ payments }) {
  return (
    <Card className="h-100 shadow-sm">
      <Card.Body>
        <h2 className="h5 mb-1">Kommande betalningar</h2>
        <p className="small text-body-secondary">Närmaste 30 dagarna</p>

        {payments.length === 0 ? (
          <p className="text-body-secondary mb-0">
            Inga betalningar de närmaste 30 dagarna.
          </p>
        ) : (
          <ListGroup variant="flush">
            {payments.map((payment) => (
              <ListGroup.Item
                key={payment.subscriptionId}
                className="px-0 d-flex justify-content-between align-items-center gap-3"
              >
                <div style={{ minWidth: 0 }}>
                  <div className="fw-semibold text-truncate">
                    {payment.name}
                  </div>
                  <CategoryLabel
                    category={payment.category}
                    className="small text-body-secondary"
                  />
                </div>

                <div className="text-end flex-shrink-0">
                  <div className="fw-semibold">
                    {formatCurrency(payment.amount)}
                  </div>
                  <div
                    className={`small ${daysUntil(payment.dueDate) < 0 ? "text-danger" : "text-body-secondary"}`}
                  >
                    {formatDate(payment.dueDate)} ·{" "}
                    {describeDue(payment.dueDate)}
                  </div>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Card.Body>
    </Card>
  );
}

export default UpcomingPayments;
