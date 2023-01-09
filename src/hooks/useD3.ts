import { useEffect, useRef } from "react";
import * as d3 from "d3";

const useD3 = (funcionRender: Function, dependencias: React.DependencyList) => {
  const ref = useRef<SVGSVGElement>(null);
  useEffect(() => {
    funcionRender(d3.select(ref.current));
    return () => {};
  }, [dependencias, funcionRender]);
  return ref;
};

export default useD3;
