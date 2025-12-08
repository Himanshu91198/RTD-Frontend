import { cloneElement, ReactElement, ReactNode, useState } from "react";
import { useOutsideClick } from "../hooks/useOutsideClick";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import { ModalContext, useModal } from "../hooks/useModal";

export interface IModalProps {
  children: ReactElement<WindowChildProps>;
  name: string;
}

interface WindowChildProps {
  onClose?: () => void;
  modalStatus?: string;
}

export interface IModalContextType {
  open: React.Dispatch<React.SetStateAction<string>>;
  close: React.Dispatch<React.SetStateAction<string>>;
  openName: string;
}
type ClickableElement = ReactElement<{ onClick?: () => void }>;

export function ModalProvider({ children }: { children: ReactNode }) {
  const [openName, setOpenName] = useState<string>("");

  const close = () => setOpenName("");
  const open = setOpenName;

  return (
    <ModalContext.Provider value={{ close, open, openName }}>
      {children}
    </ModalContext.Provider>
  );
}

export function Open({
  children,
  opensWindowName,
}: {
  children: ClickableElement;
  opensWindowName: string;
}) {
  const { open } = useModal();
  return cloneElement(children, { onClick: () => open(opensWindowName) });
}

export default function Window({ children, name }: IModalProps) {
  const { openName, close } = useModal();
  const ref = useOutsideClick<HTMLDivElement>(close);
  if (name !== openName) return null;

  return createPortal(
    <div
      className="fixed inset-0 
        bg-black/20 
        backdrop-blur-sm 
        z-40"
    >
      <div
        className="fixed top-1/2 left-1/2 
        -translate-x-1/2 -translate-y-1/2
        bg-(--color-grey-0)
        rounded-xl shadow-md 
        px-[2.4rem] pt-3.5 pb-[2rem]
        z-50      
        transition-all duration-300"
        ref={ref}
      >
        <div className="flex justify-end">
          <button className="border-0" onClick={() => close("")}>
            <HiXMark className="text-4xl hover:text-(--color-brand-500) float-right" />
          </button>
        </div>
        {cloneElement(children, {
          onClose: () => close(""),
          modalStatus: openName,
        })}
      </div>
    </div>,
    document.body
  );
}
export const Modal = Object.assign(ModalProvider, {
  Open,
  Window,
});
