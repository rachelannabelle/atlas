import { createContext, useContext } from "react";
import type { PrototypeConfig } from "./PrototypeConfig.types";

interface PrototypeConfigContextValue {
  config: PrototypeConfig;
}

export const PrototypeConfigContext = createContext<PrototypeConfigContextValue | null>(null);

export function usePrototypeConfig(): PrototypeConfigContextValue {
  const context = useContext(PrototypeConfigContext);
  if (!context) {
    throw new Error("usePrototypeConfig must be used within PrototypeConfigContext.Provider");
  }
  return context;
}

