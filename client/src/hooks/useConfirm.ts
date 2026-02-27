import { useState, useCallback } from 'react';

interface UseConfirmReturn {
  confirmingId: string | null;
  requestConfirm: (id: string) => void;
  cancelConfirm:  () => void;
  isConfirming:   (id: string) => boolean;
}

/**
 * Tracks which item is pending a destructive confirmation.
 * Keeps delete confirmation state out of the list component.
 */
export function useConfirm(): UseConfirmReturn {
  const [confirmingId, setConfirmingId] = useState<string | null>(null);

  const requestConfirm = useCallback((id: string) => {
    setConfirmingId(id);
  }, []);

  const cancelConfirm = useCallback(() => {
    setConfirmingId(null);
  }, []);

  const isConfirming = useCallback((id: string) => {
    return confirmingId === id;
  }, [confirmingId]);

  return { confirmingId, requestConfirm, cancelConfirm, isConfirming };
}