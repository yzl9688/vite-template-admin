import React, { Suspense } from "react";
import Loading from "./Loading";

const components = import.meta.glob("../pages/**/*.tsx");

const CompWrapper: React.FC<{ path: string }> = ({ path }) => {
  const Comp = components[`../pages/${path}.tsx`];
  if (!Comp) {
    return (
      <div className="w-full h-full text-center mt-[300px] text-[24px]">
        Component not found.
      </div>
    );
  }

  const LazyComp = React.lazy(Comp as any);

  return (
    <Suspense fallback={<Loading />}>
      <LazyComp />
    </Suspense>
  );
};

export default CompWrapper;
