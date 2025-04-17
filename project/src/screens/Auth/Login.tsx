// src/screens/Auth/Login.tsx
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { FormInput } from "../../components/ui/form-input";
import { useAuth } from "../../contexts/AuthContext";
import { AlertCircle } from "lucide-react";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, error, clearError, isLoading } = useAuth();
  const [submitting, setSubmitting] = useState(false);
  
  // Get the previous location or default to home
  const from = (location.state as any)?.from?.pathname || "/dashboard";
  
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur", // Validate on blur for real-time feedback
  });

  const onSubmit = async (data: LoginFormData) => {
    if (submitting) return;
    
    try {
      setSubmitting(true);
      clearError();
      await login(data.email, data.password);
      navigate(from, { replace: true });
    } catch (err) {
      // Error is handled in auth context
      console.error("Login error:", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white min-h-screen w-full flex justify-center items-center">
      <div className="w-full max-w-[390px] px-5">
        <Card className="w-full">
          <CardContent className="p-6">
            <h1 className="text-2xl font-bold text-center mb-6">Welcome Back</h1>
            
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2 text-red-700">
                <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <p className="text-sm">{error}</p>
              </div>
            )}
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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

              <Button
                type="submit"
                className="w-full bg-[#005e54] text-white"
                disabled={submitting || isLoading}
              >
                {(submitting || isLoading) ? "Loading..." : "Login"}
              </Button>

              <p className="text-center text-sm">
                Don't have an account?{" "}
                <Link to="/register" className="text-[#005e54] font-semibold">
                  Register
                </Link>
              </p>
              
              <div className="text-center text-xs text-gray-500 mt-4">
                <p>For demo purposes, use:</p>
                <p>Email: test@example.com</p>
                <p>Password: password123</p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};