import { Card } from "react-bootstrap";

function StatCard({ label, value, isHero = false }) {
  return (
    <Card className="h-100 shadow-sm">
      <Card.Body>
        <p className="text-body-secondary mb-1">{label}</p>
        <p className={`fw-semibold mb-0 ${isHero ? "display-5" : "fs-2"}`}>
          {value}
        </p>
      </Card.Body>
    </Card>
  );
}

export default StatCard;
