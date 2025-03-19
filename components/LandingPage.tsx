"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Headphones, LogIn, UserPlus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import useAuth from "@/hooks/useAuth";

const LandingPage = () => {
  const { user, loading } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-background px-6 py-5">
      {/* Card Container */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-card border border-border shadow-lg rounded-2xl p-10 md:p-16 text-foreground text-center w-full max-w-2xl"
      >
        {/* Logo Section */}
        <div className="flex flex-col items-center space-y-4">
          <Image
            src="/logo.webp"
            alt="EchoCast Logo"
            width={90}
            height={90}
            className="rounded-full border-2 border-primary"
          />
          <h1 className="text-3xl md:text-4xl font-bold tracking-wide">
            EchoCast
          </h1>
        </div>

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="mt-8"
        >
          {loading ? (
            <p className="text-lg text-muted-foreground">Loading...</p>
          ) : user ? (
            <>
              <h2 className="text-3xl md:text-5xl font-extrabold leading-snug text-center">
                Welcome back,
                <span className="block bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                  {user?.displayName || user?.email}!
                </span>
              </h2>

              <p className="mt-4 text-lg text-muted-foreground">
                Continue exploring the best podcasts curated just for you.
              </p>

              {/* Start Listening Button */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mt-6 flex justify-center"
              >
                <Link href="/podcasts">
                  <Button
                    size="lg"
                    className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-full flex items-center"
                  >
                    Go to Podcasts <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </motion.div>
            </>
          ) : (
            <>
              <h2 className="text-3xl md:text-4xl font-extrabold leading-tight">
                Discover, Listen, and Enjoy <br />
                Your Favorite <span className="text-primary">Podcasts</span>
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                To start exploring, please log in or create an account.
              </p>

              {/* Auth Buttons */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mt-6 flex flex-col md:flex-row justify-center gap-4"
              >
                <Link href="/login">
                  <Button
                    size="lg"
                    variant="ghost"
                    className="dark:bg-transparent bg-primary/80 border border-primary dark:hover:bg-primary/80 hover:bg-primary/80 hover:text-white/90 text-white px-6 py-3 rounded-full flex items-center"
                  >
                    Login <LogIn className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/sign-up">
                  <Button
                    size="lg"
                    className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-full flex items-center"
                  >
                    Sign Up <UserPlus className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </motion.div>
            </>
          )}
        </motion.div>

        {/* Icon Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-10 flex justify-center space-x-6"
        >
          <Headphones className="h-12 w-12 text-primary" />
          <Headphones className="h-12 w-12 text-muted-foreground" />
          <Headphones className="h-12 w-12 text-primary" />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LandingPage;
