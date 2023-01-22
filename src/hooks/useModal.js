import { useState } from "react";

/**
 * Hook to manage a modal
 * @param {boolean} initialState Initial state of the modal
 */
export const useModal = (initialState = false) => {
  const [isOpen, setIsOpen] = useState(initialState);

  const open = () => setIsOpen(true);

  const close = () => setIsOpen(false);

  return {
    /** Whether the modal is open or not. */
    isOpen,
    /** Function to open the modal. */
    open,
    /** Function to close the modal. */
    close,
  };
}