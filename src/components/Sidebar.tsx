import React, { useState } from "react";
import { CategoryType, UserProfile, Tool } from "../types";
import { 
  Github, 
  Layers, 
  Server, 
  Database, 
  Cpu, 
  Cloud, 
  Smartphone, 
  Terminal, 
  CheckSquare, 
  Palette, 
  ChevronRight, 
  User, 
  Calendar, 
  Heart, 
  FileText, 
  MessageSquare,
  Edit2,
  Check
} from "lucide-react";

interface SidebarProps {
  categories: { name: CategoryType; count: number }[];
  activeCategory: CategoryType | "All";
  setActiveCategory: (cat: CategoryType | "All") => void;
  currentUser: UserProfile | null;
  onLogin: () => void;
  onLogout: () => void;
  onUpdateBio: (newBio: string) => void;
}

export default function Sidebar({
  categories,
  activeCategory,
  setActiveCategory,
  currentUser,
  onLogin,
  onLogout,
  onUpdateBio
}: SidebarProps) {
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [tempBio, setTempBio] = useState("");

  const getCategoryIcon = (categoryName: CategoryType) => {
    switch (categoryName) {
      case "Frontend": return <Layers className="w-4 h-4 text-sky-400" />;
      case "Backend": return <Server className="w-4 h-4 text-emerald-400" />;
      case "Database": return <Database className="w-4 h-4 text-yellow-500" />;
      case "DevOps": return <Terminal className="w-4 h-4 text-purple-400" />;
      case "Cloud": return <Cloud className="w-4 h-4 text-blue-400" />;
      case "Mobile": return <Smartphone className="w-4 h-4 text-pink-400" />;
      case "AI": return <Cpu className="w-4 h-4 text-indigo-400" />;
      case "Testing": return <CheckSquare className="w-4 h-4 text-teal-400" />;
      case "Design": return <Palette className="w-4 h-4 text-orange-400" />;
      default: return <Layers className="w-4 h-4 text-slate-400" />;
    }
  };

  const startEditing = () => {
    if (currentUser) {
      setTempBio(currentUser.bio);
      setIsEditingBio(true);
    }
  };

  const saveBio = () => {
    onUpdateBio(tempBio);
    setIsEditingBio(false);
  };

  return (
    <div className="space-y-6">
      
      {/* GITHUB LOGIN / USER PROFILE PANEL */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg relative overflow-hidden" id="auth_sidebar_panel">
        
        {/* Subtle top decoration badge */}
        <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500"></div>

        {!currentUser ? (
          <div className="space-y-4 text-center py-4">
            <div className="mx-auto w-12 h-12 rounded-full bg-slate-950 flex items-center justify-center border border-slate-800 text-slate-400">
              <Github className="w-6 h-6 text-white" />
            </div>
            <div className="space-y-1">
              <h3 className="font-semibold text-sm text-white">Đăng nhập với GitHub</h3>
              <p className="text-xs text-slate-400 max-w-xs mx-auto leading-relaxed">
                Đăng nhập để khởi tạo hồ sơ cá nhân, bình bầu và viết các đánh giá trung thực về thư viện/framework.
              </p>
            </div>
            <button
              onClick={onLogin}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-950 rounded-lg text-xs font-semibold font-sans transition-colors cursor-pointer"
              id="github_auth_btn"
            >
              <Github className="w-4 h-4" />
              <span>Sign in with GitHub</span>
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-850 pb-3">
              <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest">
                GitHub Account
              </span>
              <button
                onClick={onLogout}
                className="text-[10px] text-red-400 hover:text-red-300 transition-colors font-mono font-bold"
              >
                Sign out
              </button>
            </div>

            <div className="flex items-start gap-3 select-text">
              <img
                src={currentUser.avatar}
                alt={currentUser.username}
                className="w-11 h-11 rounded-lg border border-slate-850 object-cover bg-slate-950"
                referrerPolicy="no-referrer"
              />
              <div className="space-y-1">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-sm text-white">{currentUser.name}</span>
                  <span className="text-[10px] text-slate-500 font-mono">@{currentUser.username}</span>
                </div>
                <div className="flex items-center gap-2 text-[10px] text-slate-400">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-slate-500" />
                    Joined: {currentUser.joinedDate}
                  </span>
                </div>
              </div>
            </div>

            {/* BIO EDITING IN SIDEBAR */}
            <div className="bg-slate-950/60 border border-slate-850 rounded-lg p-3 space-y-2 select-text">
              <div className="flex items-center justify-between text-[11px] text-slate-400 font-sans">
                <span className="font-medium text-slate-500 font-mono text-[10px] uppercase">My Bio</span>
                {!isEditingBio ? (
                  <button onClick={startEditing} className="text-slate-500 hover:text-indigo-400 p-0.5" title="Chỉnh sửa tiểu sử">
                    <Edit2 className="w-3 h-3" />
                  </button>
                ) : (
                  <button onClick={saveBio} className="text-emerald-400 hover:text-emerald-300 p-0.5" title="Lưu">
                    <Check className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
              
              {isEditingBio ? (
                <textarea
                  value={tempBio}
                  onChange={(e) => setTempBio(e.target.value)}
                  maxLength={150}
                  rows={2}
                  className="w-full bg-slate-950 border border-slate-800 text-xs text-slate-200 p-1.5 rounded focus:outline-none focus:border-indigo-500 focus:ring-0 resize-none font-sans"
                />
              ) : (
                <p className="text-xs text-slate-350 leading-relaxed italic">
                  {currentUser.bio || "Chưa thiết lập tiểu sử."}
                </p>
              )}
            </div>

            {/* USER STATS */}
            <div className="grid grid-cols-2 gap-3 pt-1 border-t border-slate-850/60 font-sans">
              <div className="p-2.5 bg-slate-950/50 rounded-lg text-center border border-slate-850/40">
                <div className="text-[10px] text-slate-500 font-medium">Đã Đánh Giá</div>
                <div className="text-sm font-bold text-white font-mono mt-0.5 flex items-center justify-center gap-1">
                  <FileText className="w-3 h-3 text-indigo-400" />
                  {currentUser.reviewsCount}
                </div>
              </div>
              <div className="p-2.5 bg-slate-950/50 rounded-lg text-center border border-slate-850/40">
                <div className="text-[10px] text-slate-500 font-medium">Upvotes Nhận</div>
                <div className="text-sm font-bold text-white font-mono mt-0.5 flex items-center justify-center gap-1">
                  <Heart className="w-3 h-3 text-pink-400 fill-pink-500/20" />
                  {currentUser.totalUpvotesReceived}
                </div>
              </div>
            </div>
            
            <p className="text-[10px] text-slate-500 text-center leading-normal">
              Bạn có thể click vào bất kỳ tool nào để viết đánh giá mới.
            </p>
          </div>
        )}
      </div>

      {/* CATEGORIES SELECTION PANEL */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg" id="categories_sidebar_panel">
        <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2 font-mono">
          <Layers className="w-4 h-4 text-indigo-400" />
          <span>Danh Mục Công Nghệ</span>
        </h3>
        
        <div className="space-y-1.5">
          {/* ALL CATEGORIES BUTTON */}
          <button
            onClick={() => setActiveCategory("All")}
            className={`w-full text-left px-3.5 py-2.5 rounded-lg flex items-center justify-between text-xs transition-all pointer-events-auto cursor-pointer ${
              activeCategory === "All"
                ? "bg-indigo-650 text-white font-semibold shadow-lg shadow-indigo-950/20 border border-indigo-600/30"
                : "text-slate-400 hover:text-white hover:bg-slate-950/60 border border-transparent"
            }`}
          >
            <span className="flex items-center gap-2.5">
              <span className="h-2 w-2 rounded-full bg-slate-400"></span>
              <span>Tất cả công nghệ</span>
            </span>
            <ChevronRight className={`w-3.5 h-3.5 opacity-55 ${activeCategory === "All" ? "translate-x-0.5" : ""}`} />
          </button>

          {/* LISTED CATEGORIES */}
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setActiveCategory(cat.name)}
              className={`w-full text-left px-3.5 py-2.5 rounded-lg flex items-center justify-between text-xs transition-all pointer-events-auto cursor-pointer ${
                activeCategory === cat.name
                  ? "bg-slate-950 border border-slate-800 text-white font-semibold"
                  : "text-slate-400 hover:text-white hover:bg-slate-950/60 border border-transparent"
              }`}
            >
              <span className="flex items-center gap-2.5">
                {getCategoryIcon(cat.name)}
                <span>{cat.name}</span>
              </span>
              <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                activeCategory === cat.name 
                  ? "bg-slate-900 text-indigo-400 border border-slate-800" 
                  : "bg-slate-950 text-slate-400"
              }`}>
                {cat.count}
              </span>
            </button>
          ))}
        </div>
      </div>

    </div>
  );
}
