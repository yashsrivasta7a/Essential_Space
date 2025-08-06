import { useEffect, useState } from "react";
import "../App.css";
import { CreateContentModel } from "../components/CreateContentModel";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { PlusIcon } from "../icons/PlusIcon";
import { ShareIcon } from "../icons/ShareIcon";
import Sidebar from "../components/ui/Sidebar";
import { useContent } from "../hooks/useContent";
import axios from "axios";

type ContentItem = {
  _id: string;
  type: "youtube" | "twitter" | "note"; 
  link: string;
  title: string;
  desc: string;
};

function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);

  const { contents, refresh } = useContent() as {
    contents: ContentItem[];
    refresh: () => void;
  };

  useEffect(() => {
    if (!modalOpen) {
      refresh();
    }
  }, [modalOpen, refresh]);

  const shareURl = async () => {
    try {
      const res = await axios.post(
        "https://essential-space.onrender.com/api/v1/brain/share",
        {
          share: "true",
        },
        {
          headers: {
            authorization: localStorage.getItem("tokennn") || "",
          },
        }
      );
      const uri = `https://essentialspaceai.vercel.app/share/${res.data.hash}`;

      navigator.clipboard.writeText(uri);

      const notification = document.createElement("div");
      notification.textContent = "Share link copied to clipboard";
      notification.className =
        "fixed top-4 right-4 bg-white text-black px-4 py-2 rounded-lg font-mono text-sm z-50 animate-pulse";
      document.body.appendChild(notification);
      setTimeout(() => document.body.removeChild(notification), 3000);
    } catch (error) {
      console.error("Failed to Share Space:", error);
    }
  };

  return (
    <div
      className="min-h-screen bg-black text-white"
      style={{ backgroundColor: "#000000", color: "#ffffff" }}
    >
    
      <div className="hidden lg:block">
        <Sidebar />
      </div>
      
   
      <div className="lg:ml-80 p-4 sm:p-6 lg:p-8">
        <CreateContentModel
          open={modalOpen}
          onClose={() => setModalOpen(false)}
        />

        <div className="mb-8 sm:mb-12">   
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8 space-y-4 sm:space-y-0">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-light mb-2 font-mono tracking-wider">
                Dashboard
              </h1>
              <p className="text-sm text-white/40 font-mono">
                Organize your digital thoughts
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
              <Button
                variant="secondary"
                size="md"
                text="Add Content"
                onClick={() => setModalOpen(true)}
                startIcon={<PlusIcon />}
                className="w-full sm:w-auto justify-center sm:justify-start"
              />
              <Button
                onClick={shareURl}
                variant="primary"
                size="md"
                text="Share Space"
                startIcon={<ShareIcon />}
                className="w-full sm:w-auto justify-center sm:justify-start"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 lg:flex lg:gap-6 gap-3 sm:gap-4 mb-6 sm:mb-8">
            {[
              {
                label: "Total Items",
                value: contents?.length || 0,
              },
              {
                label: "Videos",
                value:
                  contents?.filter((c) => c.type === "youtube").length || 0,
              },
              {
                label: "Tweets",
                value:
                  contents?.filter((c) => c.type === "twitter").length || 0,
              },
              {
                label: "Notes",
                value: contents?.filter((c) => c.type === "note").length || 0,
              },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="px-4 sm:px-6 py-3 sm:py-4 rounded-lg"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  backdropFilter: "blur(8px)",
                }}
              >
                <div className="text-xl sm:text-2xl font-mono text-white">
                  {stat.value}
                </div>
                <div className="text-xs uppercase text-white/40 tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
        {contents && contents.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 pb-6 lg:pb-0">
            {contents.map(({ _id, type, link, title, desc }, index) => (
              <Card
                key={_id}
                id={_id}
                title={title}
                type={type}
                link={link}
                desc={desc}
                index={index}
                refresh={refresh}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 sm:py-20 px-4">
            <div className="w-20 h-20 sm:w-24 sm:h-24 border-2 border-dashed border-white/20 rounded-full flex items-center justify-center mb-4 sm:mb-6">
              <PlusIcon />
            </div>
            <h3 className="text-lg sm:text-xl font-light mb-2 text-center">No content yet</h3>
            <p className="text-gray-400 text-sm mb-4 sm:mb-6 text-center">
              Start building your digital brain
            </p>
            <Button
              variant="primary"
              size="md"
              text="Add Your First Item"
              onClick={() => setModalOpen(true)}
              startIcon={<PlusIcon />}
              className="w-full sm:w-auto max-w-xs"
            />
          </div>
        )}
      </div>

      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-black/95 backdrop-blur-md border-t border-white/10 px-4 py-3 z-40">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <button className="flex flex-col items-center space-y-1 px-4 py-2">
            <div className="w-6 h-6 bg-white/10 rounded-full flex items-center justify-center">
              <span className="text-xs">◈</span>
            </div>
            <span className="text-xs font-mono text-white">Space</span>
          </button>
          
          <button 
            onClick={() => setModalOpen(true)}
            className="flex flex-col items-center space-y-1 px-4 py-2 bg-white/10 rounded-lg"
          >
            <PlusIcon />
            <span className="text-xs font-mono text-white">Add</span>
          </button>
          
          <button 
            onClick={shareURl}
            className="flex flex-col items-center space-y-1 px-4 py-2"
          >
            <ShareIcon />
            <span className="text-xs font-mono text-white">Share</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;