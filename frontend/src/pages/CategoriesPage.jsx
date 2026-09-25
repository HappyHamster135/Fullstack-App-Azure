import { useState } from "react";
import { Alert, Button, Card, ListGroup } from "react-bootstrap";
import CategoryFormModal from "../components/CategoryFormModal.jsx";
import CategoryLabel from "../components/CategoryLabel.jsx";
import ConfirmModal from "../components/ConfirmModal.jsx";
import EmptyState from "../components/EmptyState.jsx";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
import { useConfirmDialog } from "../hooks/useConfirmDialog.js";
import { useSubscriptions } from "../store/useSubscriptions.js";

function CategoriesPage() {
  const {
    categories,
    subscriptions,
    isLoading,
    error,
    createCategory,
    updateCategory,
    deleteCategory,
  } = useSubscriptions();

  const [editor, setEditor] = useState({ isOpen: false, category: null });

  const deleteDialog = useConfirmDialog((category) =>
    deleteCategory(category.id),
  );

  const countFor = (categoryId) =>
    subscriptions.filter((s) => s.category.id === categoryId).length;

  //-------------
  //-----Handlers
  //-------------

  const openEditor = (category = null) => setEditor({ isOpen: true, category });

  const closeEditor = () => setEditor({ isOpen: false, category: null });

  const handleSave = (values) =>
    editor.category
      ? updateCategory(editor.category.id, values)
      : createCategory(values);

  //-----------
  //-----Render
  //-----------

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
        <h1 className="mb-0">Kategorier</h1>
        <Button onClick={() => openEditor()}>Ny kategori</Button>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}

      {categories.length === 0 ? (
        <EmptyState
          title="Inga kategorier ännu"
          text="Kategorier används för att gruppera prenumerationerna och visa kostnad per kategori."
          action={
            <Button onClick={() => openEditor()}>
              Skapa din första kategori
            </Button>
          }
        />
      ) : (
        <Card className="shadow-sm">
          <ListGroup variant="flush">
            {categories.map((category) => {
              const count = countFor(category.id);

              return (
                <ListGroup.Item
                  key={category.id}
                  className="d-flex flex-wrap justify-content-between align-items-center gap-2 py-3"
                >
                  <div>
                    <CategoryLabel
                      category={category}
                      className="fw-semibold"
                    />
                    <div className="small text-body-secondary">
                      {count === 1
                        ? "1 prenumeration"
                        : `${count} prenumerationer`}
                    </div>
                  </div>

                  <div className="d-flex gap-2">
                    <Button
                      size="sm"
                      variant="outline-primary"
                      onClick={() => openEditor(category)}
                    >
                      Redigera
                    </Button>
                    <Button
                      size="sm"
                      variant="outline-danger"
                      disabled={count > 0}
                      title={
                        count > 0
                          ? "Kategorin används och kan inte tas bort"
                          : undefined
                      }
                      onClick={() => deleteDialog.open(category)}
                    >
                      Ta bort
                    </Button>
                  </div>
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        </Card>
      )}

      {editor.isOpen && (
        <CategoryFormModal
          category={editor.category}
          onSave={handleSave}
          onClose={closeEditor}
        />
      )}

      <ConfirmModal
        show={deleteDialog.isOpen}
        title="Ta bort kategori"
        message={`Vill du ta bort kategorin ${deleteDialog.target?.name ?? ""}?`}
        error={deleteDialog.error}
        isBusy={deleteDialog.isBusy}
        onConfirm={deleteDialog.confirm}
        onCancel={deleteDialog.close}
      />
    </>
  );
}

export default CategoriesPage;
