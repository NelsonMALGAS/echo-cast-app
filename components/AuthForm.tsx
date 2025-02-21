"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import useAuth from "@/hooks/useAuth";
import Alert from "./ui/alert";
import { useRouter } from "next/navigation";
import { ErrorType } from "@/types";


type AuthFormProps = {
  mode: "login" | "register";
};

const AuthForm = ({ mode }: AuthFormProps) => {
  const {
    handleLogin,
    handleSignUp,
    handleSendPasswordResetEmail,
    user,
    loading,
    success,
    error,
  } = useAuth();
  const isRegister = mode === "register";
  const [pending, setPending] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [resetMessage, setResetMessage] = useState<string | null>(null);
  const [passwordsMisMatch , setPasswordsMisMatch] = useState<ErrorType>({message:"" , statusCode:null})
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push("/podcasts");
    }
  }, [loading, router, user]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setPending(true);
    setAuthError(null);
    setResetMessage(null);

    if(isRegister && formData.password !== formData.confirmPassword){
      setPasswordsMisMatch({message:"Passwords do not match" , statusCode:400})
      return
    }
    try {
      if (isRegister) {
        await handleSignUp(formData.email, formData.password , formData.username);
        setAuthError(null)
      } else if (mode === "login") {
        await handleLogin(formData.email, formData.password);
        setAuthError(null)
      }
    } catch (error) {
      if (error instanceof Error) {
        setAuthError(`Error while submitting form: ${error.message}`);
      }
    }
  };

  const handleReset = async () => {
    setPending(true);
    setAuthError(null);

    try {
      if (!loading && formData.email) {
        await handleSendPasswordResetEmail(formData.email);
        setResetMessage("Password reset email sent. Please check your inbox.");
        setPending(false);
      }
    } catch (error) {
      if (error instanceof Error) {
        setAuthError(`Error while sending password reset email: ${error.message}`);
      }
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <Card className="w-[400px] p-6 bg-card border border-border text-foreground shadow-lg">
        <CardContent className="space-y-6">
          <h2 className="text-2xl font-semibold text-center">
            {isRegister ? "Create an account" : "Sign in"}
          </h2>
          <p className="text-sm text-muted-foreground text-center">
            {isRegister ? "Enter your details to create an account" : "Enter your details to sign in"}
          </p>

          {/* OAuth Buttons */}
          <div className="flex gap-2">
            <Button
              className="flex-1 bg-muted hover:bg-muted-foreground transition"
              variant="outline"
            >
              <FaGithub className="mr-2" />
              GitHub
            </Button>
            <Button
              className="flex-1 bg-muted hover:bg-muted-foreground transition"
              variant="outline"
            >
              <FcGoogle className="mr-2" />
              Google
            </Button>
          </div>

          <div className="relative flex items-center justify-center">
            <span className="absolute bg-card px-2 text-sm text-muted-foreground">
              OR CONTINUE WITH
            </span>
            <div className="h-px w-full bg-muted"></div>
          </div>

          {/* Form Inputs */}
          <div className="space-y-4">
            {isRegister && (
              <Input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                className="bg-input text-foreground border border-border placeholder:text-muted-foreground"
              />
            )}
            <Input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="bg-input text-foreground border border-border placeholder:text-muted-foreground"
            />
            <Input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="bg-input text-foreground border border-border placeholder:text-muted-foreground"
            />
            {isRegister && (
              <Input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="bg-input text-foreground border border-border placeholder:text-muted-foreground"
              />
            )}
          </div>

          {/* Reset Password Link (only for login) */}
          {!isRegister && (
            <div className="text-right">
              <button className="text-sm text-muted-foreground hover:text-primary" onClick={handleReset}>
                Forgot password?
              </button>
            </div>
          )}

          {/* Submit Button */}
          <Button
            className="w-full bg-primary hover:bg-primary/90 transition"
            onClick={handleSubmit}
            disabled={pending}
          >
            {isRegister ? "Create account" : "Sign in"}
          </Button>
        </CardContent>
      </Card>

      {/* Alert Messages */}
      {authError && <Alert message={authError} type="error" />}
      {resetMessage && <Alert message={resetMessage} type="success" />}
      {success && <Alert message={success} type="success" />}
      {error?.message && <Alert message={error.message} type="error" code={error.statusCode ?? undefined} />}
      {passwordsMisMatch.message && <Alert message={passwordsMisMatch.message} type="error" code={passwordsMisMatch.statusCode ?? undefined} />}
    </div>
  );
};

export default AuthForm;
