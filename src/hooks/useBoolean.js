import { useCallback, useState } from "react";

/**
 * This hook allows you to create a boolean state.
 * @param {boolean} initialValue Initial value.
 */
export const useBoolean = (initialValue = false) => {
  const [value, setValue] = useState(initialValue);

  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);
  const toggle = useCallback(() => setValue((v) => !v), []);

  return {
    /** Current value. */
    value,
    /** Function to set the value. */
    setValue,
    /** Function to set the value to true. */
    setTrue,
    /** Function to set the value to false. */
    setFalse,
    /** Function to toggle the value. */
    toggle,
  };
}