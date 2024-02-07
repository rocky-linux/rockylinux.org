import type { ReactNode } from "react";

const FeaturesList = ({ children }: { children: ReactNode }) => {
  return (
    <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
      {children}
    </dl>
  );
};

export default FeaturesList;
