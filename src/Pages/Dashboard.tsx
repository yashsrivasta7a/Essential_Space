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

// ✅ Add proper type for each content item
type ContentItem = {
  _id: string;
  type: "youtube" | "twitter" | "note"; // or use an imported enum ContentType
  link: string;
  title: string;
  desc: string;
};

function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);

  // ✅ Type assertion added
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
        "http://localhost:3001/api/v1/brain/share",
        {
          share: "true",
        },
        {
          headers: {
            authorization: localStorage.getItem("tokennn") || "",
          },
        }
      );
      const uri = `http://localhost:5173/share/${res.data.hash}`;

      navigator.clipboard.writeText(uri);

      const notification = document.createElement("div");
      notification.textContent = "Share link copied to clipboard";
      notification.className =
        "fixed top-4 right-4 bg-white text-black px-4 py-2 rounded-lg font-mono text-sm z-50 animate-pulse";
      document.body.appendChild(notification);
      setTimeout(() => document.body.removeChild(notification), 3000);
    } catch (error) {
      console.error("Failed to share brain:", error);
    }
  };

  return (
    <div
      className="min-h-screen bg-black text-white"
      style={{ backgroundColor: "#000000", color: "#ffffff" }}
    >
      <Sidebar />
      <div className="ml-80 p-8">
        <CreateContentModel
          open={modalOpen}
          onClose={() => setModalOpen(false)}
        />

        <div className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-light mb-2 font-mono tracking-wider">
                Dashboard
              </h1>
              <p className="text-sm text-white/40 font-mono">
                Organize your digital thoughts
              </p>
            </div>
            <div className="flex gap-4">
              <Button
                variant="secondary"
                size="md"
                text="Add Content"
                onClick={() => setModalOpen(true)}
                startIcon={<PlusIcon />}
              />
              <Button
                onClick={shareURl}
                variant="primary"
                size="md"
                text="Share Brain"
                startIcon={<ShareIcon />}
              />
            </div>
          </div>

          <div className="flex gap-6 mb-8 flex-wrap">
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
                className="px-6 py-4 rounded-lg"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  backdropFilter: "blur(8px)",
                }}
              >
                <div className="text-2xl font-mono text-white">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-24 h-24 border-2 border-dashed border-white/20 rounded-full flex items-center justify-center mb-6">
              <PlusIcon />
            </div>
            <h3 className="text-xl font-light mb-2">No content yet</h3>
            <p className="text-gray-400 text-sm mb-6">
              Start building your digital brain
            </p>
            <Button
              variant="primary"
              size="md"
              text="Add Your First Item"
              onClick={() => setModalOpen(true)}
              startIcon={<PlusIcon />}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
