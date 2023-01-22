import { useState } from "react";

/**
 * Hook to manage a modal
 * @param {boolean} initialState Initial state of the modal
 */
export const useModal = (initialState = false) => {
  const [isOpened, setIsOpened] = useState(initialState);

  const open = () => setIsOpened(true);

  const close = () => setIsOpened(false);

  return {
    /** Whether the modal is open or not. */
    isOpened,
    /** Function to open the modal. */
    open,
    /** Function to close the modal. */
    close,
  };
}