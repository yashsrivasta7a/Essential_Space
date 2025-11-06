import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import axios from "axios";
import { SignUp as ClerkSignUp, useUser as useClerkUser } from '@clerk/clerk-react';

export function SignupPage() {
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const clerkKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY as string | undefined;
    const clerkEnabled = Boolean(clerkKey);
    const clerkUser = clerkEnabled ? useClerkUser() : undefined as any;

    useEffect(() => {
      if (clerkEnabled && clerkUser && clerkUser.isSignedIn) {
        navigate('/dashboard');
      }
    }, [clerkEnabled, clerkUser, navigate]);

    // If Clerk is configured, render Clerk sign-up UI as primary flow
    if (clerkEnabled) {
      return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4" style={{ backgroundColor: "#000000", color: "#ffffff" }}>
          <div className="relative z-10 w-full max-w-md">
            <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl">
              <div className="text-center mb-4">
                <div className="flex items-center justify-center space-x-3 mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 border-2 border-white rounded-full flex items-center justify-center">
                    <div className="w-4 h-4 sm:w-5 sm:h-5 bg-white rounded-full"></div>
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-light tracking-[0.2em]">ESSENTIAL SPACE</h1>
                </div>
                <p className="text-gray-400 font-mono text-sm mb-2">Create your account</p>
              </div>
              <ClerkSignUp routing="path" path="/signup" />
            </div>
          </div>
        </div>
      );
    }

  const handleSignup = async () => {
    const username = usernameRef.current?.value || "";
    const pass = passwordRef.current?.value || "";

    if (!username.trim() || !pass.trim()) {
      alert("Please fill in all fields");
      return;
    }

    setLoading(true);

    try {
      await axios.post("https://essential-space-backend.vercel.app//api/v1/signup", {
        username,
        pass,
      });
      const notification = document.createElement("div");
      notification.textContent = "Account created successfully!";
      notification.className =
        "fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg font-mono text-sm z-50 animate-pulse";
      document.body.appendChild(notification);
      setTimeout(() => document.body.removeChild(notification), 3000);
      
      navigate("/signin");
    } catch (e: unknown) {
      const error = e as { response?: { data?: { message?: string } }; message?: string };
      console.error("❌ Signup error:", error.response?.data || error.message);
      
      const notification = document.createElement("div");
      notification.textContent = error.response?.data?.message || "Signup failed";
      notification.className =
        "fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg font-mono text-sm z-50 animate-pulse";
      document.body.appendChild(notification);
      setTimeout(() => document.body.removeChild(notification), 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4" style={{ backgroundColor: "#000000", color: "#ffffff" }}>

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/3 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">

        <div className="text-center mb-8 sm:mb-12">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 border-2 border-white rounded-full flex items-center justify-center">
              <div className="w-4 h-4 sm:w-5 sm:h-5 bg-white rounded-full"></div>
            </div>
            <h1 className="text-2xl sm:text-3xl font-light tracking-[0.2em]">ESSENTIAL SPACE</h1>
          </div>
          <p className="text-gray-400 font-mono text-sm mb-6">Create your digital space</p>
          <h2 className="text-xl sm:text-2xl font-light tracking-wide">Create Account</h2>
        </div>

        <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl">
          <div className="space-y-6">
            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2">
                Username
              </label>
              <Input 
                placeholder="Enter your username" 
                ref={usernameRef} 
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2">
                Password
              </label>
              <Input 
                placeholder="Create a password" 
                ref={passwordRef} 
                type="password"
                className="w-full"
              />
            </div>

            <div className="pt-4">
              <Button
                onClick={handleSignup}
                variant="primary"
                size="md"
                text={loading ? "Creating Account..." : "Create Account"}
                fullWidth={true}
                disabled={loading}
              />
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-white/10 text-center">
            <p className="text-gray-400 text-sm font-mono">
              Already have an account?{" "}
              <button 
                onClick={() => navigate("/signin")}
                className="text-white hover:text-gray-300 underline transition-colors"
              >
                Sign in
              </button>
            </p>
          </div>
        </div>

        {/* Clerk SignUp widget (optional) */}
        {clerkKey && (
          <div className="relative z-10 w-full max-w-md mt-6">
            <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl">
              <div className="text-center mb-4">
                <p className="text-gray-400 font-mono text-sm mb-2">Or sign up using Clerk</p>
              </div>
              <ClerkSignUp routing="path" path="/signup" />
            </div>
          </div>
        )}

        <div className="text-center mt-8">
          <p className="text-xs text-gray-500 font-mono">
            Essential Space © 2025
          </p>
        </div>
      </div>
      <style>{`
        @media (max-width: 640px) {
          .min-h-screen {
            padding-top: 2rem;
            padding-bottom: 2rem;
          }
        }
      `}</style>
    </div>
  );
}