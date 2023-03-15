import React from "react";
import { useNavigate, To, NavigateOptions } from "react-router-dom";

export type FocusableLayoutElement = "sidebar" | "map";

export function useNavigateWithFocus() {
  const navigate = useNavigate();

  const navigateWithFocus = React.useCallback(
    (
      to: To,
      focusElement: FocusableLayoutElement,
      options?: NavigateOptions | undefined
    ) => {
      const state = { ...options?.state, focusElement };
      navigate(to, { ...options, state });
    },
    [navigate]
  );

  return navigateWithFocus;
}
