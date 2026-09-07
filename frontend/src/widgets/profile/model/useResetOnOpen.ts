import { useState } from "react";

/**
 * Runs `onOpen` once each time `isOpen` flips to true — the render-time
 * alternative to a setState-in-effect (disallowed by the React Compiler
 * lint rule) for resetting a sheet's draft state when it opens.
 */
export function useResetOnOpen(isOpen: boolean, onOpen: () => void) {
  const [prevIsOpen, setPrevIsOpen] = useState(isOpen);

  if (isOpen !== prevIsOpen) {
    setPrevIsOpen(isOpen);
    if (isOpen) onOpen();
  }
}
