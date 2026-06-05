import React from "react";
import { Tool, CategoryType } from "../types";
import { Star, MessageSquare, ExternalLink, ShieldCheck, ArrowRight } from "lucide-react";

interface ToolGridProps {
  tools: Tool[];
  selectedTool: Tool | null;
  onSelectTool: (tool: Tool) => void;
  activeCategory: CategoryType | "All";
  searchQuery: string;
}

export default function ToolGrid({
  tools,
  selectedTool,
  onSelectTool,
  activeCategory,
  searchQuery
}: ToolGridProps) {

  const getCategoryColor = (categoryName: CategoryType) => {
    switch (categoryName) {
      case "Frontend": return "bg-sky-950/40 text-sky-400 border border-sky-800/30";
      case "Backend": return "bg-emerald-950/40 text-emerald-400 border border-emerald-800/30";
      case "Database": return "bg-yellow-950/40 text-yellow-500 border border-yellow-800/30";
      case "DevOps": return "bg-purple-950/40 text-purple-400 border border-purple-800/30";
      case "Cloud": return "bg-blue-950/40 text-blue-400 border border-blue-800/30";
      case "Mobile": return "bg-pink-950/40 text-pink-400 border border-pink-800/30";
      case "AI": return "bg-indigo-950/40 text-indigo-400 border border-indigo-800/30";
      case "Testing": return "bg-teal-950/40 text-teal-400 border border-teal-800/30";
      case "Design": return "bg-orange-950/40 text-orange-400 border border-orange-850/30";
      default: return "bg-slate-950/40 text-slate-400 border border-slate-800";
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest font-mono">
          {searchQuery ? "Kết quả tìm kiếm" : activeCategory === "All" ? "Tất cả công nghệ hiện có" : `Công cụ thuộc ${activeCategory}`}
        </h2>
        <span className="text-xs text-slate-500 font-mono">
          Tìm thấy: <strong className="text-slate-350">{tools.length}</strong> công cụ
        </span>
      </div>

      {tools.length === 0 ? (
        <div className="p-10 text-center bg-slate-900/30 border border-dashed border-slate-850 rounded-xl space-y-3">
          <p className="text-slate-400 text-sm">Không tìm thấy công cụ hoặc danh mục phù hợp với từ khóa của bạn.</p>
          <p className="text-xs text-slate-500 leading-normal max-w-md mx-auto">
            Hệ thống quản lý công cụ tập trung. Đề xuất thêm công nghệ mới bằng cách gửi yêu cầu trong tab **Open Source Workspace** của chúng tôi!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tools.map((tool) => {
            const isSelected = selectedTool?.id === tool.id;
            return (
              <div
                key={tool.id}
                onClick={() => onSelectTool(tool)}
                className={`p-5 rounded-xl border transition-all duration-200 cursor-pointer flex flex-col justify-between h-52 group relative select-text hover:shadow-lg ${
                  isSelected
                    ? "bg-slate-905 border-indigo-600/75 ring-1 ring-indigo-500/10 shadow-indigo-950/20"
                    : "bg-slate-900 hover:bg-slate-900/80 border-slate-800/70 hover:border-slate-700/60"
                }`}
                id={`tool_card_${tool.id}`}
              >
                {/* Upper container */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between gap-2.5">
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase tracking-wider ${getCategoryColor(tool.category)}`}>
                      {tool.category}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-amber-400 fill-amber-400 text-xs font-semibold flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        {tool.avgRating.toFixed(1)}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <h3 className="font-bold text-white text-base font-sans group-hover:text-indigo-400 transition-colors flex items-center gap-1.5">
                      <span>{tool.name}</span>
                      {tool.avgRating >= 4.5 && (
                        <span className="text-[9px] bg-indigo-950 text-indigo-400 border border-indigo-900 px-1.5 py-0.2 rounded font-mono uppercase font-bold tracking-wider" title="High Rated Community Approved Tool">
                          Top Tier
                        </span>
                      )}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed font-sans">
                      {tool.description}
                    </p>
                  </div>
                </div>

                {/* Bottom Stats & Trigger indicator */}
                <div className="flex items-center justify-between border-t border-slate-850/50 pt-3 mt-2 text-[11px] text-slate-500 font-sans">
                  <span className="flex items-center gap-1">
                    <MessageSquare className="w-3.5 h-3.5" />
                    {tool.totalReviews} đánh giá
                  </span>

                  <span className="text-xs text-indigo-450 group-hover:text-indigo-450 font-semibold inline-flex items-center gap-1.5 group-hover:translate-x-1.5 transition-transform">
                    <span>Xem đánh giá</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
