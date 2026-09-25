import { useState } from "react";
import { Alert, Button, Col, Form, Row } from "react-bootstrap";
import { getErrorMessage } from "../api/errors.js";
import ConfirmModal from "../components/ConfirmModal.jsx";
import EmptyState from "../components/EmptyState.jsx";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
import SubscriptionCard from "../components/SubscriptionCard.jsx";
import SubscriptionFormModal from "../components/SubscriptionFormModal.jsx";
import { useConfirmDialog } from "../hooks/useConfirmDialog.js";
import { useSubscriptions } from "../store/useSubscriptions.js";
import { formatDate } from "../utils/format.js";

function SubscriptionsPage() {
  const {
    subscriptions,
    categories,
    isLoading,
    error,
    createSubscription,
    updateSubscription,
    deleteSubscription,
    registerPayment,
  } = useSubscriptions();

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [editor, setEditor] = useState({ isOpen: false, subscription: null });
  const [payingId, setPayingId] = useState(null);
  const [notice, setNotice] = useState(null);

  const deleteDialog = useConfirmDialog((subscription) =>
    deleteSubscription(subscription.id),
  );

  const visibleSubscriptions = subscriptions.filter(
    (subscription) =>
      subscription.name.toLowerCase().includes(search.trim().toLowerCase()) &&
      (categoryFilter === "" ||
        String(subscription.category.id) === categoryFilter),
  );

  //-------------
  //-----Handlers
  //-------------

  const openEditor = (subscription = null) =>
    setEditor({ isOpen: true, subscription });

  const closeEditor = () => setEditor({ isOpen: false, subscription: null });

  const handleSave = (values) =>
    editor.subscription
      ? updateSubscription(editor.subscription.id, values)
      : createSubscription(values);

  const handleRegisterPayment = async (subscription) => {
    setPayingId(subscription.id);

    try {
      const updated = await registerPayment(subscription.id);
      setNotice({
        variant: "success",
        text: `Betalning registrerad för ${subscription.name}. Nästa betalning: ${formatDate(updated.nextPaymentDate)}.`,
      });
    } catch (paymentError) {
      setNotice({ variant: "danger", text: getErrorMessage(paymentError) });
    } finally {
      setPayingId(null);
    }
  };

  //-----------
  //-----Render
  //-----------

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
        <h1 className="mb-0">Prenumerationer</h1>
        <Button onClick={() => openEditor()}>Ny prenumeration</Button>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}

      {notice && (
        <Alert
          variant={notice.variant}
          dismissible
          onClose={() => setNotice(null)}
        >
          {notice.text}
        </Alert>
      )}

      {subscriptions.length === 0 ? (
        <EmptyState
          title="Inga prenumerationer ännu"
          text="Lägg till dina digitala prenumerationer för att se vad de kostar."
          action={
            <Button onClick={() => openEditor()}>
              Lägg till din första prenumeration
            </Button>
          }
        />
      ) : (
        <>
          <Row className="g-2 mb-3">
            <Col sm={7} md={8}>
              <Form.Control
                type="search"
                placeholder="Sök på namn…"
                aria-label="Sök på namn"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </Col>
            <Col sm={5} md={4}>
              <Form.Select
                aria-label="Filtrera på kategori"
                value={categoryFilter}
                onChange={(event) => setCategoryFilter(event.target.value)}
              >
                <option value="">Alla kategorier</option>
                {categories.map((category) => (
                  <option key={category.id} value={String(category.id)}>
                    {category.name}
                  </option>
                ))}
              </Form.Select>
            </Col>
          </Row>

          {visibleSubscriptions.length === 0 ? (
            <p className="text-body-secondary">
              Inga prenumerationer matchar filtret.
            </p>
          ) : (
            <Row xs={1} md={2} xl={3} className="g-3">
              {visibleSubscriptions.map((subscription) => (
                <Col key={subscription.id}>
                  <SubscriptionCard
                    subscription={subscription}
                    isPaying={payingId === subscription.id}
                    onRegisterPayment={() =>
                      handleRegisterPayment(subscription)
                    }
                    onEdit={() => openEditor(subscription)}
                    onDelete={() => deleteDialog.open(subscription)}
                  />
                </Col>
              ))}
            </Row>
          )}
        </>
      )}

      {editor.isOpen && (
        <SubscriptionFormModal
          subscription={editor.subscription}
          categories={categories}
          onSave={handleSave}
          onClose={closeEditor}
        />
      )}

      <ConfirmModal
        show={deleteDialog.isOpen}
        title="Ta bort prenumeration"
        message={`Vill du ta bort ${deleteDialog.target?.name ?? ""}? Betalningshistoriken tas också bort.`}
        error={deleteDialog.error}
        isBusy={deleteDialog.isBusy}
        onConfirm={deleteDialog.confirm}
        onCancel={deleteDialog.close}
      />
    </>
  );
}

export default SubscriptionsPage;
