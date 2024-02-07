import { ReactNode } from "react";

export interface FeatureProps {
  description: string;
  children?: ReactNode;
}

const Feature = ({ description, children }: FeatureProps) => {
  return (
    <div className="flex flex-col">
      <dt className="flex items-center gap-x-3 text-md font-bold leading-7 font-display">
        {children}
      </dt>
      <dd className="mt-4 flex flex-auto flex-col text-base leading-7">
        <p className="flex-auto">{description}</p>
      </dd>
    </div>
  );
};

export default Feature;
