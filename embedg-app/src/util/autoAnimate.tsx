import autoAnimate, { AutoAnimateOptions } from "@formkit/auto-animate";
import { ReactNode, useEffect, useState } from "react";

export function useAutoAnimate<T>(options: Partial<AutoAnimateOptions> = {}) {
  const [element, setElement] = useState<T | null>(null);
  useEffect(() => {
    if (!(element instanceof HTMLElement)) return;

    const controller = autoAnimate(element, options);

    return () => {
      controller.disable();
    };
  }, [element, options]);
  return [setElement];
}

interface Props {
  children: ReactNode;
  className?: string;
}

export function AutoAnimate({ children, className }: Props) {
  const [setElement] = useAutoAnimate();
  return (
    <div ref={setElement} className={className}>
      {children}
    </div>
  );
}
