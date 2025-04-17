// src/screens/Auth/Register.tsx
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { FormInput } from "../../components/ui/form-input";
import { useAuth } from "../../contexts/AuthContext";
import { AlertCircle } from "lucide-react";

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type RegisterFormData = z.infer<typeof registerSchema>;

export const Register = () => {
  const navigate = useNavigate();
  const { register: registerUser, error, clearError, isLoading } = useAuth();
  const [submitting, setSubmitting] = useState(false);
  
  const { register, handleSubmit, formState: { errors }, watch } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: "onBlur", // Validate on blur for real-time feedback
  });

  const onSubmit = async (data: RegisterFormData) => {
    if (submitting) return;
    
    try {
      setSubmitting(true);
      clearError();
      await registerUser(data.name, data.email, data.password);
      navigate("/dashboard", { replace: true });
    } catch (err) {
      // Error is handled in auth context
      console.error("Registration error:", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white min-h-screen w-full flex justify-center items-center">
      <div className="w-full max-w-[390px] px-5">
        <Card className="w-full">
          <CardContent className="p-6">
            <h1 className="text-2xl font-bold text-center mb-6">Create Account</h1>
            
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2 text-red-700">
                <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <p className="text-sm">{error}</p>
              </div>
            )}
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <FormInput
                label="Name"
                type="text"
                id="name"
                placeholder="Enter your name"
                error={errors.name?.message}
                {...register("name")}
              />

              <FormInput
                label="Email"
                type="email"
                id="email"
                placeholder="Enter your email"
                error={errors.email?.message}
                {...register("email")}
              />

              <FormInput
                label="Password"
                type="password"
                id="password"
                placeholder="Enter your password"
                error={errors.password?.message}
                {...register("password")}
              />

              <FormInput
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                placeholder="Confirm your password"
                error={errors.confirmPassword?.message}
                {...register("confirmPassword")}
              />

              <Button
                type="submit"
                className="w-full bg-[#005e54] text-white"
                disabled={submitting || isLoading}
              >
                {(submitting || isLoading) ? "Creating account..." : "Register"}
              </Button>

              <p className="text-center text-sm">
                Already have an account?{" "}
                <Link to="/login" className="text-[#005e54] font-semibold">
                  Login
                </Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};