import { useBoolean } from "./useBoolean";

/**
 * Hook to manage a modal.
 * @param {boolean} startOpened Initial state of the modal
 */
export const useModal = (startOpened = false) => {
  const {
    value: isOpen,
    setTrue: open,
    setFalse: close,
  } = useBoolean(startOpened);

  return {
    /** Whether the modal is open or not. */
    isOpen,
    /** Function to open the modal. */
    open,
    /** Function to close the modal. */
    close,
  };
}