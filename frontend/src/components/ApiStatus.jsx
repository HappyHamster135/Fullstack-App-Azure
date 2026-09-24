import { useEffect, useState } from "react";
import { Alert, Spinner } from "react-bootstrap";
import api from "../api/client.js";

//-------------------
//-----Status messages
//--------------------

const API_URL = import.meta.env.VITE_API_URL || "(VITE_API_URL är inte satt)";

const STATUS_MESSAGES = {
  ok: { variant: "success", text: "API:t och databasen svarar." },
  "db-error": {
    variant: "warning",
    text: "API:t svarar men når inte databasen. (Azures gratisdatabas kan behöva en minut för att vakna – ladda om sidan.)",
  },
  "api-error": {
    variant: "danger",
    text: `Kan inte nå API:t på ${API_URL}. Kontrollera att API:t är startat och att CORS tillåter den här adressen.`,
  },
};

//---------------
//-----ApiStatus
//---------------

function ApiStatus() {
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    api
      .get("/api/health")
      .then(() => setStatus("ok"))
      .catch((error) =>
        setStatus(error.response?.status === 503 ? "db-error" : "api-error"),
      );
  }, []);

  if (status === "loading") {
    return (
      <Alert variant="secondary" className="d-flex align-items-center gap-2">
        <Spinner animation="border" size="sm" /> Kontrollerar anslutningen till
        API:t…
      </Alert>
    );
  }

  const { variant, text } = STATUS_MESSAGES[status];
  return <Alert variant={variant}>{text}</Alert>;
}

export default ApiStatus;
