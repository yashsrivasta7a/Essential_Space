import { useState } from "react";


export default function Sidebar() {
  const [activeItem, setActiveItem] = useState("Dashboard");

  const menuItems = [
    { name: "My Space", icon: "◈" },
    { name: "Shared Links", icon: "◎" },
  ];

const handleSignout = () => {
  localStorage.removeItem('tokennn');
  window.location.href = "/signin";
};
  return (
    <div className="h-screen bg-black/95 backdrop-blur-md text-white fixed w-80 left-0 border-r border-white/10 flex flex-col">
      <div className="p-8 border-b border-white/10">
        <div className="flex items-center space-x-3 mb-2">
          <div className="w-8 h-8 border-2 border-white rounded-full flex items-center justify-center">
            <div className="w-3 h-3 bg-white rounded-full"></div>
          </div>
          <h1 className="text-2xl font-light tracking-[0.2em]">ESSENTIAL SPACE</h1>
        </div>
        <p className="text-xs text-gray-400 font-mono pl-11">v2.0</p>
      </div>

 
      <nav className="flex-1 p-6">
        <div className="space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.name}
              onClick={() => setActiveItem(item.name)}
              className={`w-full flex items-center space-x-4 px-4 py-3 rounded-xl transition-all duration-200 text-left group ${
                activeItem === item.name
                  ? 'bg-white/10 text-white border border-white/20'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <span className="text-lg font-mono">{item.icon}</span>
              <span className="font-mono text-sm tracking-wide">{item.name}</span>
              {activeItem === item.name && (
                <div className="ml-auto w-2 h-2 bg-white rounded-full"></div>
              )}
            </button>
          ))}
        </div>
      </nav>

    
      <div className="p-6 border-t border-white/10">
      <button onClick={handleSignout} className="w-full py-2 px-4 border border-white/20 rounded-lg text-sm font-mono text-gray-400 hover:text-white hover:border-white/40 transition-all duration-200">
          Sign Out
        </button>
      </div>


      <div className="p-6 border-t border-white/10">
        <div className="text-xs text-gray-500 font-mono text-center">
          Essential Space © 2025
        </div>
      </div>
    </div>
  );
}