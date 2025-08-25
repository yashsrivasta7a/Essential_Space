import { useState } from "react";

export default function Sidebar() {
  const [activeItem, setActiveItem] = useState("Dashboard");
  const [showRoadmapModal, setShowRoadmapModal] = useState(false);

  const menuItems = [
    { name: "My Space", icon: "◈", action: () => setActiveItem("My Space") },
    { name: "What's Coming Next", icon: "◎", action: () => setShowRoadmapModal(true) },
  ];

  const handleSignout = () => {
    localStorage.removeItem('tokennn');
    window.location.href = "/";
  };

  const handleMenuClick = (item: typeof menuItems[0]) => {
    if (item.name === "What's Coming Next") {
      item.action();
    } else {
      setActiveItem(item.name);
    }
  };

  const closeModal = () => {
    setShowRoadmapModal(false);
  };

  return (
    <>
      <div className="h-screen bg-black/95 backdrop-blur-md text-white fixed w-80 left-0 border-r border-white/10 flex flex-col z-30">
        <div className="p-8 border-b border-white/10">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-8 h-8 border-2 border-white rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-full"></div>
            </div>
            <h1 className="text-2xl font-light tracking-[0.2em]">ESSENTIAL SPACE</h1>
          </div>
          <p className="text-xs text-gray-400 font-mono pl-11">v1.0</p>
        </div>

        <nav className="flex-1 p-6">
          <div className="space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleMenuClick(item)}
                className={`w-full flex items-center space-x-4 px-4 py-3 rounded-xl transition-all duration-200 text-left group ${
                  activeItem === item.name && item.name !== "What's Coming Next"
                    ? 'bg-white/10 text-white border border-white/20'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <span className="text-lg font-mono">{item.icon}</span>
                <span className="font-mono text-sm tracking-wide">{item.name}</span>
                {activeItem === item.name && item.name !== "What's Coming Next" && (
                  <div className="ml-auto w-2 h-2 bg-white rounded-full"></div>
                )}
                {item.name === "What's Coming Next" && (
                  <div className="ml-auto">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                  </div>
                )}
              </button>
            ))}
          </div>
        </nav>

        <div className="p-6 border-t border-white/10">
          <button 
            onClick={handleSignout} 
            className="w-full py-2 px-4 border border-white/20 rounded-lg text-sm font-mono text-gray-400 hover:text-white hover:border-white/40 transition-all duration-200"
          >
            Sign Out
          </button>
        </div>

        <div className="p-6 border-t border-white/10">
          <div className="text-xs text-gray-500 font-mono text-center">
            Essential Space © 2025
          </div>
        </div>
      </div>


      {showRoadmapModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black-300/80 backdrop-blur-sm" onClick={closeModal} />
          
          <div className="relative bg-black border border-white/20 rounded-2xl p-6 sm:p-8 w-full max-w-lg mx-4 shadow-2xl max-h-[90vh] overflow-y-auto">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors p-2"
              aria-label="Close modal"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            
            <div className="mb-8 pr-8">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                  <span className="text-black-300 font-mono text-lg">1.2</span>
                </div>
                <h2 className="text-2xl font-light tracking-wide text-white">What's Coming Next</h2>
              </div>
              <p className="text-gray-400 text-sm font-mono">The future of Essential Space</p>
            </div>

            
            <div className="space-y-6">
              <div className="bg-white/5 border border-white/10 rounded-lg p-4 backdrop-blur-md">
                <h3 className="text-lg font-light text-white mb-3 font-mono tracking-wide">Essential Space v2.0</h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-4">
                  We're building the next generation of digital space management with powerful AI capabilities.
                </p>
              </div>

              
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-500/20 border border-blue-500/30 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-mono text-white font-medium mb-1">AI-Based Search</h4>
                    <p className="text-gray-400 text-sm">Intelligent search across all your content with natural language queries and semantic understanding.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-green-500/20 border border-green-500/30 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-mono text-white font-medium mb-1">AI Summarization</h4>
                    <p className="text-gray-400 text-sm">Automatically generate summaries of your videos, articles, and notes to quickly grasp key insights.</p>
                  </div>
                </div>

                {/* <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-purple-500/20 border border-purple-500/30 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-mono text-white font-medium mb-1">Smart Categorization</h4>
                    <p className="text-gray-400 text-sm">AI-powered automatic tagging and organization of your content for better discovery.</p>
                  </div>
                </div> */}

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-yellow-500/20 border border-yellow-500/30 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-mono text-white font-medium mb-1">Intelligent Insights</h4>
                    <p className="text-gray-400 text-sm">Discover connections between your content and get personalized recommendations.</p>
                  </div>
                </div>
              </div>

              
              <div className="bg-white/5 border border-white/10 rounded-lg p-4 backdrop-blur-md">
                <h4 className="font-mono text-white font-medium mb-3 flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Expected Timeline
                </h4>
                <p className="text-gray-400 text-sm">
                  <span className="text-blue-400 font-mono">Q4 2025</span> - Beta release with core AI features
                </p>
              </div>
            </div>

            
          </div>
        </div>
      )}
    </>
  );
}