import { useRef, useState } from "react";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Signin() {
  const navigate = useNavigate();
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);

  const handleSignin = async () => {
    const username = usernameRef.current?.value || "";
    const pass = passwordRef.current?.value || "";
    
    if (!username.trim() || !pass.trim()) {
      const notification = document.createElement("div");
      notification.textContent = "Please fill in all fields";
      notification.className =
        "fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg font-mono text-sm z-50 animate-pulse";
      document.body.appendChild(notification);
      setTimeout(() => document.body.removeChild(notification), 3000);
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post("https://essential-space.onrender.com/api/v1/signin", {
        username,
        pass,
      });
      const jwt = response.data.token;
      localStorage.setItem("tokennn", jwt);
      
      const notification = document.createElement("div");
      notification.textContent = "Welcome back!";
      notification.className =
        "fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg font-mono text-sm z-50 animate-pulse";
      document.body.appendChild(notification);
      setTimeout(() => document.body.removeChild(notification), 2000);
      
      navigate("/dashboard");
    } catch (e: unknown) {
      const error = e as { response?: { data?: { message?: string } }; message?: string };
      console.error("❌ Signin error:", error.response?.data || error.message);
      
      const notification = document.createElement("div");
      notification.textContent = error.response?.data?.message || "Signin failed";
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
        <div className="absolute top-1/3 left-1/5 w-72 h-72 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/5 w-96 h-96 bg-white/3 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 border-2 border-white rounded-full flex items-center justify-center">
              <div className="w-4 h-4 sm:w-5 sm:h-5 bg-white rounded-full"></div>
            </div>
            <h1 className="text-2xl sm:text-3xl font-light tracking-[0.2em]">ESSENTIAL SPACE</h1>
          </div>
          <p className="text-gray-400 font-mono text-sm mb-6">Access your digital space</p>
          <h2 className="text-xl sm:text-2xl font-light tracking-wide">Welcome Back</h2>
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
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    passwordRef.current?.focus();
                  }
                }}
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2">
                Password
              </label>
              <Input 
                placeholder="Enter your password" 
                ref={passwordRef} 
                type="password"
                className="w-full"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSignin();
                  }
                }}
              />
            </div>

            <div className="pt-4">
              <Button
                onClick={handleSignin}
                variant="primary"
                size="md"
                text={loading ? "Signing In..." : "Sign In"}
                fullWidth={true}
                disabled={loading}
              />
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-white/10 text-center">
            <p className="text-gray-400 text-sm font-mono">
              Don't have an account?{" "}
              <button 
                onClick={() => navigate("/signup")}
                className="text-white hover:text-gray-300 underline transition-colors"
              >
                Create one
              </button>
            </p>
          </div>
        </div>

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