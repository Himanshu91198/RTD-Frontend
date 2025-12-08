import { useEffect, useRef } from "react";

export function useOutsideClick<T extends HTMLElement>(
  handler: React.Dispatch<React.SetStateAction<string>>,
  listenCapturing: boolean = true
) {
  const ref = useRef<T>(null);
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        handler("");
      }
    }

    document.addEventListener("click", handleClick, listenCapturing);

    return () => {
      document.removeEventListener("click", handleClick, listenCapturing);
    };
  }, [handler]);

  return ref;
}
