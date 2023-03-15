import React from "react";
import { useMediaQuery } from "react-responsive";

export type ScreenLayout = "mobile" | "desktop";
const DESKTOP_MIN_SCREEN_SIZE = 500;

interface LayoutContextState {
  screenLayout: ScreenLayout;
}

export const LayoutContext = React.createContext<LayoutContextState>({
  screenLayout: "desktop",
});

export default function LayoutContextProvider({
  children,
}: React.PropsWithChildren<{}>) {
  const isDesktopSized = useMediaQuery({ minWidth: DESKTOP_MIN_SCREEN_SIZE });

  const screenLayout = React.useMemo<ScreenLayout>(() => {
    return isDesktopSized ? "desktop" : "mobile";
  }, [isDesktopSized]);

  return (
    <LayoutContext.Provider value={{ screenLayout }}>
      {children}
    </LayoutContext.Provider>
  );
}
