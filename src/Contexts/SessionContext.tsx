import React from "react";
import SessionData from "../Models/Session";

interface SessionContextState {
  session: SessionData;
}

const DEFAULT_SESSION_CONTEXT_STATE: SessionContextState = {
  session: {} as SessionData,
};

export const SessionContext = React.createContext(
  DEFAULT_SESSION_CONTEXT_STATE
);

export function SessionContextProvider({
  session,
  children,
}: {
  session: SessionData;
  children: JSX.Element;
}) {
  return (
    <SessionContext.Provider value={{ session }}>
      {children}
    </SessionContext.Provider>
  );
}
