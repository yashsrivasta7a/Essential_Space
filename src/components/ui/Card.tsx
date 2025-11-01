import axios from "axios";
import { ShareIcon } from "../../icons/ShareIcon";
import { useEffect, useRef } from "react";
import { CrossIcon } from "../../icons/CrossIcon";
import { type ContentType } from "../CreateContentModel";
import { useAuth as useClerkAuth, useUser as useClerkUser } from '@clerk/clerk-react';

interface CardProps {
  id: string;
  title: string;
  link: string;
  type: ContentType;
  index?: number;
  desc?: string;
  refresh: () => void;
}

declare global {
  interface Window {
    twttr?: {
      widgets: {
        load: (element: HTMLElement | null) => void;
      };
    };
  }
}

function showClipboardNotification(message: string) {
  const notification = document.createElement("div");
  notification.textContent = message;
  notification.className =
    "fixed top-4 right-4 bg-white text-black px-4 py-2 rounded-lg font-mono text-sm z-50 animate-pulse";
  document.body.appendChild(notification);
  setTimeout(() => document.body.removeChild(notification), 3000);
}

export function Card({ id, title, link, refresh, type, index = 0, desc }: CardProps) {
  const ref = useRef<HTMLDivElement>(null);

  // Clerk hooks at top-level (guarded by compile-time env flag)
  const clerkKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY as string | undefined;
  const clerkEnabled = Boolean(clerkKey);
  let clerkAuth: ReturnType<typeof useClerkAuth> | undefined = undefined as any;
  let clerkUser: ReturnType<typeof useClerkUser> | undefined = undefined as any;
  if (clerkEnabled) {
    clerkAuth = useClerkAuth();
    clerkUser = useClerkUser();
  }

  useEffect(() => {
    if (type === "twitter") {
      if (!window.twttr) {
        const script = document.createElement("script");
        script.src = "https://platform.twitter.com/widgets.js";
        script.async = true;
        script.onload = () => {
          window.twttr?.widgets.load(ref.current);
        };
        document.body.appendChild(script);
      } else {
        window.twttr.widgets.load(ref.current);
      }
    }
  }, [link, type]);

  const handleDelete = async () => {
    try {
<<<<<<< HEAD
      if (!id) {
        console.error("No content ID provided for deletion");
        showDeleteNotification("Error: Missing content ID", "error");
        return;
      }

      let token = localStorage.getItem("tokennn") || "";

      if (clerkEnabled && clerkUser && clerkUser.isSignedIn && clerkAuth && clerkAuth.getToken) {
        try {
          token = (await clerkAuth.getToken()) || token;
        } catch (e) {
          console.error("Failed to get Clerk token:", e);
          // fallback to stored token
        }
      }

      if (!token) {
        showDeleteNotification("Error: Not authenticated", "error");
        return;
      }

      const response = await axios.delete("http://localhost:3001/api/v1/content", {
=======
      await axios.delete("http://localhost:3001/api/v1/content", {
>>>>>>> 80cef382751b5dbc4c106793edd9930ddddd523c
        data: { contentId: id },
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });

      if (response.data.message === "Content deleted successfully") {
        showDeleteNotification("Content deleted successfully", "success");
        refresh();
      } else {
        showDeleteNotification("Error: Failed to delete content", "error");
      }
    } catch (error: any) {
      console.error("Failed to delete content:", error);
      const errorMessage = error.response?.data?.message || "Failed to delete content";
      showDeleteNotification(`Error: ${errorMessage}`, "error");
    }
  };

  const showDeleteNotification = (message: string, type: "success" | "error" = "success") => {
    const notification = document.createElement("div");
    notification.textContent = message;
    notification.className = `fixed top-4 right-4 px-4 py-2 rounded-lg font-mono text-sm z-50 animate-pulse ${
      type === "success" 
        ? "bg-green-500 text-white" 
        : "bg-red-500 text-white"
    }`;
    document.body.appendChild(notification);
    setTimeout(() => {
      if (document.body.contains(notification)) {
        document.body.removeChild(notification);
      }
    }, 3000);
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(link);
      showClipboardNotification("Link copied to clipboard");
    } catch (error) {
      console.error("Can't share the content:", error);
    }
  };

  const truncateTitle = (str: string, length: number = 30) => {
    return str.length > length ? str.substring(0, length) + "..." : str;
  };

  const getYouTubeVideoId = (url: string) => {
    const regExp =
      /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|embed)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/;
    const match = url.match(regExp);
    return match ? match[1] : "";
  };

  return (
    <div
      className="group bg-[black/40] backdrop-blur-md border border-white/30 rounded-2xl overflow-hidden hover:border-white/30 transition-all duration-300 hover:scale-[1.01] hover:shadow-xl"
      style={{
        animationDelay: `${index * 100}ms`,
        animation: "fadeInUp 0.6s ease-out forwards",
      }}
    >
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center border border-white/20">
              <span className="text-xs font-mono">
                {type === "youtube" ? "YT" : type === "twitter" ? "TW" : "NT"}
              </span>
            </div>
            <div>
              <h3 className="font-mono text-sm text-white truncate" title={title}>
                {truncateTitle(title)}
              </h3>
              <p className="text-xs text-gray-400 uppercase tracking-wider">{type}</p>
            </div>
          </div>

          <div className="flex items-center space-x-2 opacity-60 group-hover:opacity-100 transition-opacity">
            <button
              onClick={handleDelete}
              className="w-8 h-8 rounded-lg bg-red-500/20 border border-red-500/30 text-red-400 hover:bg-red-500/30 transition-all duration-200 flex items-center justify-center"
              aria-label="Delete content"
            >
              <CrossIcon />
            </button>
            <button
              onClick={handleShare}
              className="w-8 h-8 rounded-lg bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all duration-200 flex items-center justify-center"
              aria-label="Share content link"
            >
              <ShareIcon />
            </button>
          </div>
        </div>
      </div>

      <div className="aspect-video bg-black/20 p-4 overflow-auto rounded-b-xl">
        {type === "youtube" && (
          <iframe
            className="w-full h-full rounded-lg"
            src={`https://www.youtube.com/embed/${getYouTubeVideoId(link)}`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}

        {type === "twitter" && (
          <div
            ref={ref}
            className="w-full h-full overflow-hidden bg-slate-900/50 rounded-lg"
          >
            <blockquote
              className="twitter-tweet tw-align-center !m-0"
              data-theme="dark"
              data-conversation="none"
              data-dnt="true"
              data-cards="hidden"
              data-chrome="noheader nofooter noborders transparent"
              style={{ maxWidth: "100%", minHeight: "100%" }}
            >
              <a href={link.replace("x.com", "twitter.com")}></a>
            </blockquote>
          </div>
        )}

        {type === "note" && (
          <div className="text-white font-mono text-sm whitespace-pre-wrap">
            {desc || "No content."}
          </div>
        )}
      </div>

      <div className="p-4 bg-black/20 rounded-b-xl">
        <div className="flex items-center justify-between">
          <div className="text-xs text-gray-400 font-mono">Added recently</div>
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}
