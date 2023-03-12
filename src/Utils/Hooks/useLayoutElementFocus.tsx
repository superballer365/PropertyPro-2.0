import React from "react";
import {
  useLocation,
  useNavigate,
  To,
  NavigateOptions,
} from "react-router-dom";

export type FocusableLayoutElement = "sidebar" | "map";

export function useLayoutElementFocus(
  focusChangeCallback: (focusElement: FocusableLayoutElement) => void
) {
  const navigationState = useLocation().state as
    | {
        focusElement?: FocusableLayoutElement;
      }
    | undefined;

  const stableCallbackRef = React.useRef(focusChangeCallback);
  stableCallbackRef.current = focusChangeCallback;

  React.useEffect(() => {
    console.log("navigation state", navigationState);
    if (!navigationState?.focusElement) return;

    stableCallbackRef.current(navigationState.focusElement);
  }, [navigationState]);
}

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
