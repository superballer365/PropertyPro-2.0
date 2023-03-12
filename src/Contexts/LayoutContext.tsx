import React from "react";
import { useMediaQuery } from "react-responsive";

export type ScreenLayout = "mobile" | "tablet" | "desktop";
const TABLET_MIN_SCREEN_SIZE = 500;
const DESKTOP_MIN_SCREEN_SIZE = 1000;

interface LayoutContextState {
  screenLayout: ScreenLayout;
}

export const LayoutContext = React.createContext<LayoutContextState>({
  screenLayout: "desktop",
});

export default function LayoutContextProvider({
  children,
}: React.PropsWithChildren<{}>) {
  const isTabletSized = useMediaQuery({
    minWidth: TABLET_MIN_SCREEN_SIZE,
    maxWidth: DESKTOP_MIN_SCREEN_SIZE,
  });
  const isDesktopSized = useMediaQuery({ minWidth: DESKTOP_MIN_SCREEN_SIZE });

  const screenLayout = React.useMemo<ScreenLayout>(() => {
    return isDesktopSized ? "desktop" : isTabletSized ? "tablet" : "mobile";
  }, [isTabletSized, isDesktopSized]);

  console.log(screenLayout);

  return (
    <LayoutContext.Provider value={{ screenLayout }}>
      {children}
    </LayoutContext.Provider>
  );
}
