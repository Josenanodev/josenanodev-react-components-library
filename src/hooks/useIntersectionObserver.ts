import { RefObject, useEffect, useState, useRef } from "react";

function useIntersectionObserver(
  ref: RefObject<Element>,
  options?: IntersectionObserverInit | undefined
) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const observer = useRef<IntersectionObserver | null>(null);
  useEffect(() => {
    if(observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options);
    if (ref.current) observer.current.observe(ref.current);
  
    return () => {
      if(observer.current) observer.current.disconnect();
    }
  }, [ref, options])
  return isIntersecting;
}

export default useIntersectionObserver;
