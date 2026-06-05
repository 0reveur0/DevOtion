import React from "react";
import { Sparkles, Terminal, Code2, Users, Search } from "lucide-react";

interface HeroSectionProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
  totalTools: number;
  totalReviews: number;
}

export default function HeroSection({
  searchQuery,
  setSearchQuery,
  activeCategory,
  setActiveCategory,
  totalTools,
  totalReviews
}: HeroSectionProps) {
  return (
    <div className="bg-slate-900 border-b border-slate-800/80 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/40 text-emerald-400 border border-emerald-900/40 text-xs font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
              <span>Open Source Platform • v1.0.0</span>
            </div>
            <h1 className="text-3xl font-bold text-white tracking-tight sm:text-4xl font-sans">
              DevOtion <span className="text-indigo-400">Review Hub</span>
            </h1>
            <p className="text-slate-400 max-w-2xl text-sm leading-relaxed font-sans">
              Nền tảng cộng đồng mã nguồn mở dành cho lập trình viên chia sẻ, đánh giá & bình chọn các công cụ phát triển phần mềm thực chiến. Tìm kiếm và đóng góp ý kiến trung thực ngay.
            </p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-3 gap-3 md:w-auto w-full">
            <div className="px-4 py-3 bg-slate-950/80 border border-slate-850 rounded-xl space-y-1">
              <div className="text-[10px] text-slate-500 uppercase tracking-wider font-mono">Công cụ</div>
              <div className="text-lg font-bold text-indigo-400 font-mono">{totalTools}</div>
            </div>
            <div className="px-4 py-3 bg-slate-950/80 border border-slate-850 rounded-xl space-y-1">
              <div className="text-[10px] text-slate-500 uppercase tracking-wider font-mono">Đánh giá</div>
              <div className="text-lg font-bold text-sky-400 font-mono">{totalReviews}</div>
            </div>
            <div className="px-4 py-3 bg-slate-950/80 border border-slate-850 rounded-xl space-y-1">
              <div className="text-[10px] text-slate-500 uppercase tracking-wider font-mono">Đóng góp</div>
              <div className="text-lg font-bold text-emerald-400 font-mono">100%</div>
            </div>
          </div>
        </div>

        {/* Global Instant Search container */}
        <div className="max-w-xl relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Search className="h-4.5 w-4.5" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm kiếm công cụ (ví dụ: firebase, supabase, nextjs) hoặc danh mục..."
            className="block w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-colors shadow-inner"
            id="global_search_input"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-xs text-slate-400 hover:text-white"
            >
              Xóa
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
