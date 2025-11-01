import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth as useClerkAuth, useUser as useClerkUser } from '@clerk/clerk-react';

export function useContent() {
  const [contents, setContents] = useState([]);
  const clerkEnabled = Boolean(import.meta.env.VITE_CLERK_PUBLISHABLE_KEY);
  const clerkAuth = clerkEnabled ? useClerkAuth() : undefined as any;
  const clerkUser = clerkEnabled ? useClerkUser() : undefined as any;

  function refresh() {
<<<<<<< HEAD
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

        const res = await axios.get("http://localhost:3001/api/v1/content", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
=======
    axios
      .get("http://localhost:3001/api/v1/content", {
        headers: {
          Authorization: localStorage.getItem("tokennn") || "",
        },
      })
      .then((res) => {
>>>>>>> 80cef382751b5dbc4c106793edd9930ddddd523c
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
