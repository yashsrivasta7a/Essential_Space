import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useAuth as useClerkAuth, useUser as useClerkUser } from "@clerk/clerk-react";

type ContentItem = {
  _id: string;
  type: "youtube" | "twitter" | "note";
  link: string;
  title: string;
  desc: string;
};

export function useContent() {
  const [contents, setContents] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Call Clerk hooks unconditionally (must be wrapped in <ClerkProvider> at app level)
  const { getToken } = useClerkAuth();
  const { isSignedIn } = useClerkUser();

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      let token = localStorage.getItem("tokennn") || "";

      if (isSignedIn && typeof getToken === "function") {
        const t = await getToken();
        if (t) token = t;
      }

      const res = await axios.get(
        "https://essential-space-backend.vercel.app/api/v1/content",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setContents(res.data.content as ContentItem[]);
    } catch (err) {
      console.error("Error fetching content:", err);
    } finally {
      setLoading(false);
    }
  }, [getToken, isSignedIn]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { contents, refresh, loading };
}
