"use client";

import pagesLink from "@/links";
import { ModeToggle } from "./ModeToggle";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
  return (
    <nav className="flex justify-between items-center h-16 px-6 bg-card shadow-md">
      {/* Logo Section */}
      <div className="flex items-center gap-3 bg-muted/60 p-2 rounded-full shadow-sm">
        <Link href="/">
          <Image
            src="/logo.webp"
            alt="EchoCast logo"
            width={50}
            height={50}
            priority
            className="cursor-pointer rounded-full"
          />
        </Link>
        <span className="font-semibold text-2xl bg-gradient-to-r from-blue-400 to-gray-800 dark:from-blue-300 dark:to-gray-500 text-transparent bg-clip-text">
          EchoCast
        </span>
      </div>

      {/* Navigation Links */}
      <div className="flex items-center space-x-6">
        <ul className="hidden md:flex space-x-4">
          {pagesLink.map((page) => (
            <Link
              href={page.href}
              key={page.id}
              className={
                pathname === page.href ? "text-primary" : "text-gray-500"
              }
            >
              <li className="cursor-pointer">{page.name.toUpperCase()}</li>
            </Link>
          ))}
        </ul>
        <ModeToggle />
      </div>
    </nav>
  );
};

export default Navbar;
