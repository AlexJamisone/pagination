import Link from "next/link";
import { ReactNode } from "react";

type LinkProps = {
  href: string;
  children: ReactNode;
  isActive?: boolean;
  styles?: string;
};
const LinkButton = ({ href, children, isActive, styles }: LinkProps) => {
  return (
    <Link
      href={href}
      className={`transition-all flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${isActive ? "bg-blue-300 text-blue-500 pointer-events-none" : ""} ${styles} `}
    >
      {children}
    </Link>
  );
};
export default LinkButton;
