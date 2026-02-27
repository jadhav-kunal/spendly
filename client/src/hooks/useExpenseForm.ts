import { useState, useCallback } from 'react';
import type { ExpenseFormData, FormErrors } from '@/types/index.ts';
import { validateExpenseForm } from '@/utils/validators.ts';

const EMPTY_FORM: ExpenseFormData = {
  title:        '',
  description:  '',
  category:     '',
  amount:       '',
  expense_date: new Date().toISOString().split('T')[0],
};

interface UseExpenseFormReturn {
  form:        ExpenseFormData;
  errors:      FormErrors;
  touched:     Partial<Record<keyof ExpenseFormData, boolean>>;
  isValid:     boolean;
  handleChange: (field: keyof ExpenseFormData, value: string) => void;
  handleBlur:   (field: keyof ExpenseFormData) => void;
  handleSubmit: (onSuccess: (data: ExpenseFormData) => void) => void;
  resetForm:    () => void;
  populateForm: (data: ExpenseFormData) => void;
}

/**
 * Manages controlled form state
 */
export function useExpenseForm(): UseExpenseFormReturn {
  const [form,    setForm]    = useState<ExpenseFormData>(EMPTY_FORM);
  const [errors,  setErrors]  = useState<FormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof ExpenseFormData, boolean>>>({});

  const validate = useCallback((current: ExpenseFormData) => {
    return validateExpenseForm(current);
  }, []);

  const handleChange = useCallback((field: keyof ExpenseFormData, value: string) => {
    setForm((prev) => {
      const updated = { ...prev, [field]: value };
      const { errors: newErrors } = validate(updated);
      setErrors(newErrors);
      return updated;
    });
  }, [validate]);

  const handleBlur = useCallback((field: keyof ExpenseFormData) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const { errors: newErrors } = validate(form);
    setErrors(newErrors);
  }, [form, validate]);

  const handleSubmit = useCallback((onSuccess: (data: ExpenseFormData) => void) => {
    const allTouched = Object.keys(EMPTY_FORM).reduce(
      (acc, key) => ({ ...acc, [key]: true }),
      {} as Record<keyof ExpenseFormData, boolean>
    );
    setTouched(allTouched);

    const { isValid, errors: newErrors } = validate(form);
    setErrors(newErrors);

    if (isValid) {
      onSuccess(form);
    }
  }, [form, validate]);

  const resetForm = useCallback(() => {
    setForm(EMPTY_FORM);
    setErrors({});
    setTouched({});
  }, []);

  const populateForm = useCallback((data: ExpenseFormData) => {
    setForm(data);
    setErrors({});
    setTouched({});
  }, []);

  const { isValid } = validate(form);

  return {
    form,
    errors,
    touched,
    isValid,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    populateForm,
  };
}