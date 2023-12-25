import React from "react";

type Props = { children: React.ReactNode };

const Button = ({ children }: Props) => {
  return (
    <button className="bg-green-700 py-1.5 px-6 rounded-md self-end text-white duration-100 text-sm hover:bg-green-600">
      {children}
    </button>
  );
};

export default Button;
