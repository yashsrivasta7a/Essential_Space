import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth as useClerkAuth, useUser as useClerkUser } from '@clerk/clerk-react';

export function useContent() {
  const [contents, setContents] = useState([]);
  const clerkEnabled = Boolean(import.meta.env.VITE_CLERK_PUBLISHABLE_KEY);
  const clerkAuth = clerkEnabled ? useClerkAuth() : undefined as any;
  const clerkUser = clerkEnabled ? useClerkUser() : undefined as any;

  function refresh() {
    (async () => {
      try {
        let token = localStorage.getItem("tokennn") || "";

        if (clerkUser && clerkUser.isSignedIn && clerkAuth && clerkAuth.getToken) {
          try {
            token = (await clerkAuth.getToken()) || token;
          } catch (e) {
            // ignore and fallback to local token
          }
        }

        const res = await axios.get("https://essential-space-backend.vercel.app//api/v1/content", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setContents(res.data.content);
      } catch (err) {
        console.error("Error fetching content:", err);
      }
    })();
  }

  useEffect(() => {
      refresh();
    }, []);
  return {contents,refresh};
}
