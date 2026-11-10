import { RefObject, useEffect } from "react";

/** Calls onDismiss on a click outside the element or on the Escape key. */
export const useDismiss = (
  ref: RefObject<HTMLElement>,
  onDismiss: () => void,
) => {
  useEffect(() => {
    const onMouseDown = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onDismiss();
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onDismiss();
    };
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [ref, onDismiss]);
};
