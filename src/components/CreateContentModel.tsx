import axios from "axios";
import { CrossIcon } from "../icons/CrossIcon";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { useEffect, useRef, useState } from "react";


export const ContentType = {
  Youtube: "youtube",
  Twitter: "twitter", 
  Note: "note",
} as const;

export type ContentType = typeof ContentType[keyof typeof ContentType];

interface CreateContentModelProps {
  open: boolean;
  onClose: () => void;
}

export function CreateContentModel({ open, onClose }: CreateContentModelProps) {
  const titleRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);
  const [type, setType] = useState<ContentType>(ContentType.Youtube);
  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState(false);

  const addContent = async () => {
    const title = titleRef.current?.value;
    const link = linkRef.current?.value;

    if (!title) return;

    if (type !== ContentType.Note && !link) {
      return;
    }
    if (type === ContentType.Note && !desc.trim()) {
      return;
    }

    setLoading(true);

    try {
      await axios.post(
        "https://essential-space.onrender.com/api/v1/content",
        {
          title,
          type,
          link: type === ContentType.Note ? "" : link,
          desc: type === ContentType.Note ? desc : "",
        },
        {
          headers: {
            Authorization: localStorage.getItem("tokennn") || "",
          },
        }
      );
      onClose();
      // Reset fields after add
      if (titleRef.current) titleRef.current.value = "";
      if (linkRef.current) linkRef.current.value = "";
      setDesc("");
      setType(ContentType.Youtube);
    } catch (error) {
      console.error("Failed to add content:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (open) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-black border border-white/20 rounded-2xl p-8 w-full max-w-md mx-4 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors p-2"
          aria-label="Close modal"
        >
          <CrossIcon />
        </button>

        <div className="mb-8">
          <h2 className="text-2xl font-light tracking-wide mb-2">Add Content</h2>
          <p className="text-gray-400 text-sm font-mono">Expand your digital brain</p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2">Title</label>
            <Input placeholder="Enter content title" ref={titleRef} />
          </div>

          {type !== ContentType.Note && (
            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2">Link</label>
              <Input placeholder="Paste your link here" ref={linkRef} />
            </div>
          )}

          {type === ContentType.Note && (
            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2">Content</label>
              <textarea
                className="w-full bg-black border border-white/20 rounded-lg p-3 text-black-300-300 font-mono resize-y min-h-[60px]"
                placeholder="Write your note here..."
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              />
            </div>
          )}

          <div>
            <label className="block text-xs uppercase tracking-wider text-gray-400 mb-3">Content Type</label>
            <div className="flex gap-2">
              <button
                onClick={() => setType(ContentType.Youtube)}
                className={`flex-1 py-3 px-4 rounded-lg border transition-all duration-200 font-mono text-sm ${
                  type === ContentType.Youtube
                    ? "bg-white text-black-300 border-white"
                    : "bg-transparent text-black-300-300 border-white/20 hover:border-white/40"
                }`}
                type="button"
              >
                YouTube
              </button>
              <button
                onClick={() => setType(ContentType.Twitter)}
                className={`flex-1 py-3 px-4 rounded-lg border transition-all duration-200 font-mono text-sm ${
                  type === ContentType.Twitter
                    ? "bg-white text-black-300 border-white"
                    : "bg-transparent text-white border-white/20 hover:border-white/40"
                }`}
                type="button"
              >
                Twitter
              </button>
              <button
                onClick={() => setType(ContentType.Note)}
                className={`flex-1 py-3 px-4 rounded-lg border transition-all duration-200 font-mono text-sm ${
                  type === ContentType.Note
                    ? "bg-white text-black-300 border-white"
                    : "bg-transparent text-white border-white/20 hover:border-white/40"
                }`}
                type="button"
              >
                Note
              </button>
            </div>
          </div>

          <div className="pt-4 flex justify-center items-center ">
            <Button
              onClick={addContent}
              variant="primary"
              text={loading ? "Adding..." : "Add Content"}
              size="md"
              disabled={loading}
            />
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-white/10">
          <p className="text-xs text-gray-500 font-mono">Tip: Press Escape to close this dialog</p>
        </div>
      </div>
    </div>
  );
}
