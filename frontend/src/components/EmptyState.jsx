import { Card } from "react-bootstrap";

function EmptyState({ title, text, action }) {
  return (
    <Card body className="text-center py-4 shadow-sm">
      <h2 className="h5">{title}</h2>
      <p className="text-body-secondary">{text}</p>
      {action}
    </Card>
  );
}

export default EmptyState;
