import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SignIn as ClerkSignIn } from '@clerk/clerk-react';

export function Signin() {
  const navigate = useNavigate();
  const clerkKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY as string | undefined;
  const clerkEnabled = Boolean(clerkKey);

  useEffect(() => {
    document.title = 'Sign in — Essential Space';
  }, []);

  if (!clerkEnabled) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
        <div className="text-center">
          <h2 className="text-2xl mb-4">Clerk not configured</h2>
          <p className="text-gray-400 mb-6">Sign-in is handled by Clerk. Please set VITE_CLERK_PUBLISHABLE_KEY to enable authentication.</p>
          <button onClick={() => navigate('/')} className="px-4 py-2 bg-white text-black rounded">Go back</button>
        </div>
      </div>
    );
  }

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
            <p className="text-gray-400 font-mono text-sm mb-2">Sign in to your account</p>
          </div>
          <ClerkSignIn routing="path" path="/signin" />
        </div>
      </div>
    </div>
  );
}
