import { useState } from "react";
import { getErrorMessage, getFieldErrors } from "../api/errors.js";
import { hasErrors } from "../utils/validation.js";

export function useForm(initialValues, validate, onSubmit) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  //-----------
  //-----Change
  //-----------

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setValues((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  //-----------
  //-----Submit
  //-----------

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationErrors = validate(values);
    setErrors(validationErrors);
    setServerError("");

    if (hasErrors(validationErrors)) {
      return;
    }

    setIsSubmitting(true);

    try {
      await onSubmit(values);
    } catch (error) {
      setErrors(getFieldErrors(error));
      setServerError(getErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    values,
    errors,
    serverError,
    isSubmitting,
    handleChange,
    handleSubmit,
  };
}
