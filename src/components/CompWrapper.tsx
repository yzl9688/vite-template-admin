import React, { Suspense, useMemo } from "react";
import Loading from "./Loading";

// 异步加载所有组件
const components = import.meta.glob("../pages/**/*.tsx");

// 惰性加载所有组件
const lazyComponents: { [key: string]: React.ComponentType<any> } = {};
Object.keys(components).forEach((item) => {
  lazyComponents[item] = React.lazy(components[item] as any);
});

const CompWrapper: React.FC<{ path: string }> = ({ path }) => {
  const LazyComp = useMemo(() => {
    const Comp = lazyComponents[`../pages/${path}.tsx`];

    if (!Comp) return null;

    return Comp;
  }, [path]);

  if (!LazyComp) {
    return (
      <div className="w-full h-full text-center mt-[300px] text-[24px]">
        Component not found.
      </div>
    );
  }

  return (
    <Suspense fallback={<Loading />}>
      <LazyComp />
    </Suspense>
  );
};

export default CompWrapper;
