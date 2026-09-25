import { useState } from "react";
import { getErrorMessage } from "../api/errors.js";

export function useConfirmDialog(onConfirm) {
  const [target, setTarget] = useState(null);
  const [error, setError] = useState("");
  const [isBusy, setIsBusy] = useState(false);

  const open = (item) => {
    setTarget(item);
    setError("");
  };

  const close = () => setTarget(null);

  const confirm = async () => {
    setIsBusy(true);

    try {
      await onConfirm(target);
      setTarget(null);
    } catch (confirmError) {
      setError(getErrorMessage(confirmError));
    } finally {
      setIsBusy(false);
    }
  };

  return {
    target,
    isOpen: target !== null,
    error,
    isBusy,
    open,
    close,
    confirm,
  };
}
