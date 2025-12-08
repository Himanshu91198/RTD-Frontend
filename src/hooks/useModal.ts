import { createContext, useContext } from "react";
import { IModalContextType } from "../components/Modal";

export const ModalContext = createContext<IModalContextType | null>(null);

export function useModal() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
}
