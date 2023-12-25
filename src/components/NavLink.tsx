import Link from "next/link";
import React from "react";

type Props = {
  href: string;
  children: React.ReactNode;
};

const NavLink = ({ href, children }: Props) => {
  return (
    <Link
      className="bg-gray-700 hover:bg-gray-800 duration-100 py-1.5 px-3 text-sm rounded-md"
      href={href}
    >
      {children}
    </Link>
  );
};

export default NavLink;
