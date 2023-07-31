import { RefObject, useEffect, useState, useRef } from "react";

/**
 * Hook to observe an element's intersection
 * @param ref ref to the element to observe
 * @param options intersection observer options
 * @returns a boolean indicating if the element is intersecting
 */
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
