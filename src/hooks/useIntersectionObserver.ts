import { useEffect, useState } from "react";

function useIntersectionObserver(
  target: Element,
  callback: IntersectionObserverCallback,
  options?: IntersectionObserverInit | undefined
) {
  const [observerState, setObserverState] = useState<IntersectionObserver | null>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(callback, options);
    observer.observe(target);
    setObserverState(observer);
    return () => {
      observer.disconnect();
      setObserverState(null);
    };
  }, [target, callback, options]);
  return observerState;
}

export default useIntersectionObserver;
