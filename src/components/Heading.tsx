import React from "react";

type Props = {
  children: React.ReactNode;
};

const Heading = ({ children }: Props) => {
  return <h1 className="text-3xl mb-5">{children}</h1>;
};

export default Heading;
