import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SignInButton, SignUpButton } from '@clerk/clerk-react';

export default function Landing() {
  const navigate = useNavigate();
  const clerkKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY as string | undefined;
  const clerkEnabled = Boolean(clerkKey);

  useEffect(() => {
    document.title = 'Essential Space';
  }, []);

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6" style={{ backgroundColor: '#000000', color: '#ffffff' }}>
      <div className="w-full max-w-3xl text-center">
        <div className="mb-8">
          <h1 className="text-4xl sm:text-5xl font-light tracking-[0.2em]">ESSENTIAL SPACE</h1>
          <p className="mt-4 text-gray-400">Organize and share your digital knowledge. Sign in or create an account to get started.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {clerkEnabled ? (
            <>
              <SignInButton mode="modal">
                <button className="px-6 py-3 rounded-lg bg-white text-black font-mono text-sm hover:opacity-90 transition">Sign in</button>
              </SignInButton>

              <SignUpButton mode="modal">
                <button className="px-6 py-3 rounded-lg border border-white text-white font-mono text-sm hover:opacity-90 transition">Create account</button>
              </SignUpButton>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate('/signin')}
                className="px-6 py-3 rounded-lg bg-white text-black font-mono text-sm hover:opacity-90 transition"
              >
                Sign in
              </button>

              <button
                onClick={() => navigate('/signup')}
                className="px-6 py-3 rounded-lg border border-white text-white font-mono text-sm hover:opacity-90 transition"
              >
                Create account
              </button>
            </>
          )}
        </div>

        <p className="mt-8 text-sm text-gray-500">Essential Space © 2025</p>
      </div>
    </div>
  );
}
