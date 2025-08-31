import { useCallback } from 'react';
import { useUser as useClerkUser } from '@clerk/clerk-react';

export const useAuth = () => {
  const clerkEnabled = Boolean(import.meta.env.VITE_CLERK_PUBLISHABLE_KEY);
  // Only call Clerk hooks when Clerk is intended to be used (static env var)
  const clerkUser = clerkEnabled ? useClerkUser() : undefined as any;

  const isAuthenticated = useCallback(() => {
    // If Clerk is available and user is signed in, prefer that
    if (clerkEnabled && clerkUser && clerkUser.isSignedIn) return true;

    // Fallback to legacy JWT stored in localStorage
    const token = localStorage.getItem('tokennn');
    if (!token) return false;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const isValid = payload.exp * 1000 > Date.now();

      if (!isValid) {
        localStorage.removeItem('tokennn');
        return false;
      }

      return true;
    } catch (error) {
      console.warn('Invalid token format:', error);
      localStorage.removeItem('tokennn');
      return false;
    }
  }, [clerkEnabled, clerkUser]);

  return { isAuthenticated };
};