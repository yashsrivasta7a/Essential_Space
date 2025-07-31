import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShareIcon } from "../icons/ShareIcon";
import { Card } from "../components/ui/Card";
import { ContentType } from "../components/CreateContentModel";
interface Content {
  _id: string;
  title: string;
  link: string;
  type: ContentType;
}

interface SharedBrainResponse {
  username: string;
  content: Content[];
}

const SharedBrain = () => {
  const { shareLink } = useParams<{ shareLink: string }>();
  const [data, setData] = useState<SharedBrainResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchSharedBrain = async () => {
      try {
        if (!shareLink) {
          setError("No share link provided");
          setLoading(false);
          return;
        }

        const response = await fetch(
          `http://localhost:3001/api/v1/brain/${shareLink}`
        );

        if (!response.ok) {
          const errData = await response.json();
          throw new Error(errData.message || "Failed to fetch shared brain");
        }

        const jsonData: SharedBrainResponse = await response.json();
        setData(jsonData);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSharedBrain();
  }, [shareLink]);

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    const notification = document.createElement("div");
    notification.textContent = "Link copied to clipboard";
    notification.className =
      "fixed top-4 right-4 bg-white text-black px-4 py-2 rounded-lg font-mono text-sm z-50 animate-pulse";
    document.body.appendChild(notification);
    setTimeout(() => document.body.removeChild(notification), 3000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="font-mono text-sm text-gray-400">Loading shared brain...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-red-400 font-mono text-sm">{error}</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-gray-400 font-mono text-sm">No data found</p>
      </div>
    );
  }

  const { username, content } = data;

 return (
  <div  className="min-h-screen bg-black text-white" style={{ backgroundColor: '#000000', color: '#ffffff' }}>
    <div className="min-h-screen bg-black text-white px-8 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-white/10 rounded-full border border-white/20 flex items-center justify-center">
            <span className="font-mono text-lg">{username.charAt(0).toUpperCase()}</span>
          </div>
          <div>
            <h1 className="text-2xl font-light tracking-wide">{username}'s Brain</h1>
            <p className="text-gray-400 font-mono text-sm">Shared digital collection</p>
          </div>
        </div>

        <button
          onClick={copyLink}
          className="flex items-center space-x-2 bg-white/10 border border-white/20 rounded-lg px-4 py-2 hover:bg-white/20 transition-all duration-200"
        >
          <ShareIcon />
          <span className="font-mono text-sm">Share</span>
        </button>
      </div>

      {/* Stats */}
      <div className="flex gap-6 mb-10">
        <div className="px-6 py-4 rounded-lg bg-white/5 border border-white/10 backdrop-blur-md">
          <div className="text-2xl font-mono">{content.length}</div>
          <div className="text-xs uppercase text-gray-400 tracking-wider">Items</div>
        </div>
        <div className="px-6 py-4 rounded-lg bg-white/5 border border-white/10 backdrop-blur-md">
          <div className="text-2xl font-mono">{content.filter(c => c.type === 'youtube').length}</div>
          <div className="text-xs uppercase text-gray-400 tracking-wider">Videos</div>
        </div>
        <div className="px-6 py-4 rounded-lg bg-white/5 border border-white/10 backdrop-blur-md">
          <div className="text-2xl font-mono">{content.filter(c => c.type === 'twitter').length}</div>
          <div className="text-xs uppercase text-gray-400 tracking-wider">Tweets</div>
        </div>
      </div>

      {/* Content Grid */}
      {content.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {content.map(({ _id, type, link, title }, index) => (
            <Card
              key={_id}
              title={title}
              type={type}
              link={link}
              index={index}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="w-24 h-24 border-2 border-dashed border-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-gray-400 text-2xl">∅</span>
          </div>
          <h3 className="text-xl font-light mb-2">Nothing shared yet</h3>
          <p className="text-gray-400 font-mono text-sm">This brain is empty</p>
        </div>
      )}

      {/* Footer */}
      <div className="mt-20 text-center text-gray-500 text-xs font-mono">
        Powered by Essential Space © 2025
      </div>
    </div>
  </div>
);

};

export default SharedBrain;
