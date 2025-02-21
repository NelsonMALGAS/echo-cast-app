"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ModeToggle } from "./ModeToggle";
import { Menu, X, Home, Headphones, Heart, LogIn, UserPlus, LogOut } from "lucide-react";
import pagesLink from "@/links";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import useAuth from "@/hooks/useAuth";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user , loading , handleLogout } = useAuth()
  const pathname = usePathname();

  const toggleNavbar = () => setIsOpen(!isOpen);

  const signOut = async () => {
    await handleLogout()
  }

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex justify-between items-center h-16 px-6 bg-card shadow-md relative"
    >
      {/* Logo Section */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-3 bg-muted/60 p-2 rounded-full shadow-sm"
      >
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
      </motion.div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-6">
        <motion.ul
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="hidden md:flex space-x-4"
        >
          {pagesLink.map((page) => (
            <Link
              href={page.href}
              key={page.id}
              className={cn(
                "flex items-center gap-2 text-gray-500 hover:text-primary transition-all",
                pathname === page.href && "text-primary"
              )}
            >
              {page.icon === "home" && <Home size={20} />}
              {page.icon === "headphones" && <Headphones size={20} />}
              {page.icon === "heart" && <Heart size={20} />}
              <li className="cursor-pointer">{page.name}</li>
            </Link>
          ))}

          {/* Show Login & Sign Up if NOT logged in */}
          {!loading && !user ? (
            <>
              <Link href="/login" className="flex items-center gap-2 text-gray-500 hover:text-primary transition-all">
                <LogIn size={20} />
                <li className="cursor-pointer">Login</li>
              </Link>
              <Link href="/register" className="flex items-center gap-2 text-gray-500 hover:text-primary transition-all">
                <UserPlus size={20} />
                <li className="cursor-pointer">Sign Up</li>
              </Link>
            </>
          ) : (
            // Show Logout if user exists
            <button
              onClick={() => signOut()}
              className="flex items-center gap-2 text-gray-500 hover:text-red-500 transition-all"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          )}
        </motion.ul>
        <ModeToggle toggleNavbar={toggleNavbar} />
      </div>

      {/* Mobile Menu Button */}
      <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleNavbar}>
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </Button>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.5 }}
            className="fixed top-0 right-0 w-64 h-full bg-card shadow-lg flex flex-col p-6 space-y-4 md:hidden z-50"
          >
            <div className="flex items-center justify-between">
              <Button variant="ghost" size="icon" className="self-end" onClick={toggleNavbar}>
                <X size={24} />
              </Button>
              <ModeToggle toggleNavbar={toggleNavbar} />
            </div>
            <ul className="space-y-4">
              {pagesLink.map((page) => (
                <motion.div
                  key={page.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 * page.id }}
                >
                  <Link
                    href={page.href}
                    className={cn(
                      "flex items-center gap-2 text-gray-500 hover:text-primary transition-all",
                      pathname === page.href && "text-primary"
                    )}
                    onClick={toggleNavbar}
                  >
                    {page.icon === "home" && <Home size={20} />}
                    {page.icon === "headphones" && <Headphones size={20} />}
                    {page.icon === "heart" && <Heart size={20} />}
                    <li className="cursor-pointer">{page.name}</li>
                  </Link>
                </motion.div>
              ))}

              {/* Show Login & Sign Up if NOT logged in */}
              {!loading && !user ? (
                <>
                  <Link
                    href="/login"
                    className="flex items-center gap-2 text-gray-500 hover:text-primary transition-all"
                    onClick={toggleNavbar}
                  >
                    <LogIn size={20} />
                    <li className="cursor-pointer">Login</li>
                  </Link>
                  <Link
                    href="/register"
                    className="flex items-center gap-2 text-gray-500 hover:text-primary transition-all"
                    onClick={toggleNavbar}
                  >
                    <UserPlus size={20} />
                    <li className="cursor-pointer">Sign Up</li>
                  </Link>
                </>
              ) : (
                // Show Logout if user exists
                <button
                  onClick={() => signOut()}
                  className="flex items-center gap-2 text-gray-500 hover:text-red-500 transition-all"
                >
                  <LogOut size={20} />
                  <span>Logout</span>
                </button>
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
