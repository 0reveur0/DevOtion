import React, { useState } from "react";
import { ContributorIssue, CategoryType } from "../types";
import { 
  GitPullRequest, 
  Terminal, 
  Flame, 
  HelpCircle, 
  PlusCircle, 
  CheckCircle2, 
  GitBranch, 
  BookOpen, 
  ShieldCheck, 
  AlertCircle,
  Hash
} from "lucide-react";

interface GithubWorkPanelProps {
  issues: ContributorIssue[];
  onAddToolProposal: (proposal: { name: string; category: CategoryType; description: string }) => void;
}

export default function GithubWorkPanel({
  issues,
  onAddToolProposal
}: GithubWorkPanelProps) {
  const [activeTab, setActiveTab] = useState<"issues" | "propose" | "contribute">("issues");
  const [proposalName, setProposalName] = useState("");
  const [proposalCategory, setProposalCategory] = useState<CategoryType>("Frontend");
  const [proposalDesc, setProposalDesc] = useState("");
  const [proposalLogs, setProposalLogs] = useState<string[]>([]);
  const [loadingProposal, setLoadingProposal] = useState(false);

  const [filterLabel, setFilterLabel] = useState<string>("all");

  const labelsList = ["all", "good first issue", "bug", "enhancement", "help wanted", "documentation"];

  const filteredIssues = filterLabel === "all"
    ? issues
    : issues.filter(iss => iss.labels.includes(filterLabel));

  const handleProposeTool = (e: React.FormEvent) => {
    e.preventDefault();
    if (!proposalName.trim() || !proposalDesc.trim()) {
      alert("Vui lòng nhập đầy đủ thông tin tên công nghệ và mô tả.");
      return;
    }

    setLoadingProposal(true);
    setProposalLogs(prev => [...prev, `[INIT] Khởi tạo đề xuất công cụ: ${proposalName}...`]);

    setTimeout(() => {
      setProposalLogs(prev => [
        ...prev,
        `[VALIDATION] Định dạng danh mục [${proposalCategory}] hợp lệ.`,
        `[COMPILING] Phân tích cấu trúc file config bảo mật...`,
        `[SUCCESS] Hồ sơ đề xuất của bạn đã được staging thành công! Đang chờ admin hoặc maintainer phê duyệt và cập nhật (merge) vào mã nguồn.`
      ]);
      setLoadingProposal(false);
      onAddToolProposal({
        name: proposalName.trim(),
        category: proposalCategory,
        description: proposalDesc.trim()
      });
      setProposalName("");
      setProposalDesc("");
    }, 1500);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-lg select-text" id="open_source_contributor_workspace">
      
      {/* TABS CONTROLLER */}
      <div className="border-b border-slate-850 bg-slate-950/60 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h3 className="font-bold text-sm text-white flex items-center gap-1.5 font-sans">
            <GitPullRequest className="w-4 h-4 text-emerald-400" />
            <span>Open Source Workspace</span>
          </h3>
          <p className="text-[11px] text-slate-500">Môi trường đóng góp mã nguồn mở, theo dõi sự cố và đề xuất thêm công nghệ mới</p>
        </div>

        <div className="flex bg-slate-900 border border-slate-850 p-1 rounded-lg text-xs gap-1 font-sans">
          <button
            onClick={() => setActiveTab("issues")}
            className={`px-3 py-1.5 rounded-md font-semibold transition-colors pointer-events-auto cursor-pointer ${
              activeTab === "issues" ? "bg-slate-950 text-white border border-slate-800" : "text-slate-400 hover:text-white"
            }`}
          >
            Issue Board
          </button>
          <button
            onClick={() => setActiveTab("propose")}
            className={`px-3 py-1.5 rounded-md font-semibold transition-colors pointer-events-auto cursor-pointer ${
              activeTab === "propose" ? "bg-slate-950 text-white border border-slate-800" : "text-slate-400 hover:text-white"
            }`}
          >
            Đề Xuất Tool
          </button>
          <button
            onClick={() => setActiveTab("contribute")}
            className={`px-3 py-1.5 rounded-md font-semibold transition-colors pointer-events-auto cursor-pointer ${
              activeTab === "contribute" ? "bg-slate-950 text-white border border-slate-800" : "text-slate-400 hover:text-white"
            }`}
          >
            Guidelines
          </button>
        </div>
      </div>

      <div className="p-5">
        
        {/* TAB 1: ISSUES BOARD */}
        {activeTab === "issues" && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-950/30 p-3 rounded-lg border border-slate-850">
              <div className="text-xs text-slate-400 font-sans">
                💡 Tìm các issues có nhãn <strong className="text-emerald-400">good first issue</strong> để bắt đầu đóng góp code.
              </div>
              
              {/* LABEL FILTER DROPDOWN */}
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] text-slate-500 font-mono">Label:</span>
                <select
                  value={filterLabel}
                  onChange={(e) => setFilterLabel(e.target.value)}
                  className="bg-slate-950 border border-slate-800 text-[11px] text-slate-350 font-mono rounded px-2.5 py-1 focus:outline-none focus:border-indigo-500"
                >
                  {labelsList.map(lbl => (
                    <option key={lbl} value={lbl}>
                      {lbl}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-3">
              {filteredIssues.map((iss) => (
                <div
                  key={iss.id}
                  className="p-4 bg-slate-950/40 border border-slate-850 rounded-xl hover:border-slate-800 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono text-[10px] text-indigo-400 font-bold">{iss.id}</span>
                      <span className="font-semibold text-slate-200 hover:text-indigo-400 transition-colors">
                        {iss.title}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                      {iss.labels.map(lbl => (
                        <span
                          key={lbl}
                          className={`px-2 py-0.5 rounded font-mono text-[9px] font-bold ${
                            lbl === "good first issue"
                              ? "bg-emerald-950/60 text-emerald-400 border border-emerald-900/60"
                              : lbl === "bug"
                              ? "bg-red-950/60 text-red-400 border border-red-900/60"
                              : lbl === "enhancement"
                              ? "bg-purple-950/60 text-purple-400 border border-purple-900/60"
                              : lbl === "help wanted"
                              ? "bg-indigo-950/60 text-indigo-400 border border-indigo-900/60"
                              : "bg-slate-950 text-slate-500 border border-slate-800"
                          }`}
                        >
                          {lbl}
                        </span>
                      ))}
                      <span className="text-slate-600 font-mono">•</span>
                      <span className="text-slate-500 text-[10px]">Tạo ngày {iss.createdAt}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-[10px] text-slate-500">
                      {iss.commentsCount} bình luận
                    </span>
                    <button
                      onClick={() => alert(`Bạn đã đăng ký nhận xử lý sự cố ${iss.id}. Hãy hoàn thành Pull Request mô phỏng ở tab Đề xuất!`)}
                      className="px-3 py-1.5 bg-slate-950 hover:bg-slate-850 text-slate-350 hover:text-white border border-slate-800 rounded-lg text-[11px] font-medium font-sans cursor-pointer pointer-events-auto"
                    >
                      Đăng ký xử lý
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: PROPOSE TOOL WORKSPACE */}
        {activeTab === "propose" && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start font-sans">
            
            {/* INSTRUCTIONS */}
            <div className="md:col-span-12 p-3 bg-indigo-950/20 border border-indigo-900/40 rounded-xl space-y-1">
              <span className="text-xs font-bold text-indigo-400 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> Quy định quản lý công cụ tập trung:
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                Người dùng phổ thông không thể tự ý tạo các công cụ trực tiếp để đảm bảo tính xác thực. Tuy nhiên, lập trình viên đóng góp mã nguồn mở có thể gửi một đề xuất công nghệ. Sau khi thành công, admin hoặc maintainer sẽ review và cập nhật dữ liệu.
              </p>
            </div>

            {/* FORM */}
            <div className="md:col-span-6 space-y-3.5">
              <form onSubmit={handleProposeTool} className="space-y-3.5">
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-300">Tên công cụ (Ví dụ: Framer, Vite):</label>
                  <input
                    type="text"
                    required
                    placeholder="Nhập tên chính thức..."
                    value={proposalName}
                    onChange={(e) => setProposalName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 text-xs text-slate-100 px-3.5 py-2 rounded-lg focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-300">Danh mục:</label>
                  <select
                    value={proposalCategory}
                    onChange={(e) => setProposalCategory(e.target.value as CategoryType)}
                    className="w-full bg-slate-950 border border-slate-800 text-xs text-slate-200 px-3.5 py-2 rounded-lg focus:outline-none"
                  >
                    <option value="Frontend">Frontend</option>
                    <option value="Backend">Backend</option>
                    <option value="Database">Database</option>
                    <option value="DevOps">DevOps</option>
                    <option value="Cloud">Cloud</option>
                    <option value="Mobile">Mobile</option>
                    <option value="AI">AI</option>
                    <option value="Testing">Testing</option>
                    <option value="Design">Design</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-300">Mô tả tóm tắt tính năng:</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Giới thiệu chức năng nổi trội và đường dẫn website chính thức..."
                    value={proposalDesc}
                    onChange={(e) => setProposalDesc(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 text-xs text-slate-100 p-3 rounded-lg focus:outline-none resize-none leading-relaxed"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loadingProposal}
                  className="w-full px-4 py-2 bg-emerald-650 hover:bg-emerald-600 disabled:bg-slate-800 text-white text-xs font-bold font-sans rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>{loadingProposal ? "Đang xử lý đề xuất..." : "Gửi Đề Xuất Công Cụ"}</span>
                </button>
              </form>
            </div>

            {/* SIMULATED PUSH CONSOLE LOGS */}
            <div className="md:col-span-6 space-y-2">
              <span className="block text-xs font-mono font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1">
                <Terminal className="w-3.5 h-3.5" /> Simulation Console
              </span>
              <div className="bg-slate-950/80 border border-slate-850 rounded-xl p-4 h-56 font-mono text-[11px] text-slate-350 leading-relaxed overflow-y-auto space-y-1.5 shadow-inner">
                {proposalLogs.length === 0 ? (
                  <div className="text-slate-600 text-center py-10">
                    Console idle. Hãy gửi đề xuất công nghệ để chạy mô phỏng CI/CD pipeline tự động.
                  </div>
                ) : (
                  proposalLogs.map((log, i) => (
                    <div key={i} className={log.includes("[SUCCESS]") ? "text-emerald-400" : log.includes("[INIT]") ? "text-sky-400" : "text-slate-400"}>
                      {log}
                    </div>
                  ))
                )}
              </div>
            </div>

          </div>
        )}

        {/* TAB 3: CONTRIBUTING GUIDELINES */}
        {activeTab === "contribute" && (
          <div className="space-y-4 font-sans select-text">
            <div className="p-4 bg-slate-950/35 border border-slate-850 rounded-xl space-y-3">
              <h4 className="font-bold text-xs font-sans text-white uppercase tracking-widest flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-indigo-400" />
                <span>Quy chuẩn đóng góp vào dự án cộng đồng DevOtion</span>
              </h4>
              
              <ul className="space-y-3.5 text-xs text-slate-350 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="font-mono text-emerald-400 font-bold bg-slate-950 px-1 rounded">1.</span>
                  <div>
                    <strong className="text-slate-100">Tìm kiếm Issue phù hợp:</strong> Xem Tab **Issue Board**, bạn có thể bấm để đăng ký sửa lỗi hoặc nâng cấp các tính năng được phát hiện bởi cộng đồng.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-mono text-emerald-400 font-bold bg-slate-950 px-1 rounded">2.</span>
                  <div>
                    <strong className="text-slate-100">Bảo mật tuyệt đối (API keys):</strong> Tránh tuyệt đối việc nhúng khóa API hoặc credentials không an toàn vào Client-side code. Mọi tương tác AI hoặc cơ sở dữ liệu cần cài đặt phía máy chủ an toàn.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-mono text-emerald-400 font-bold bg-slate-950 px-1 rounded">3.</span>
                  <div>
                    <strong className="text-slate-100">Cấu trúc mã nguồn dễ đóng góp:</strong> Chia nhỏ file, định nghĩa Type đầy đủ trong `/src/types.ts` và lưu trữ nội dung reviews trong tệp dữ liệu trung tâm.
                  </div>
                </li>
              </ul>
            </div>

            <div className="p-3 bg-slate-950/20 border border-slate-850 rounded-lg flex items-center justify-between text-xs">
              <span className="text-slate-400">Bạn muốn đọc toàn văn tài liệu đóng góp chính thức?</span>
              <button
                onClick={() => alert("Xem chi tiết tệp /CONTRIBUTING.md trực tiếp trên mã nguồn GitHub DevOtion!")}
                className="px-3 py-1 bg-slate-900 border border-slate-800 rounded font-semibold text-white cursor-pointer pointer-events-auto hover:bg-slate-850 transition-colors"
              >
                Xem CONTRIBUTING.md
              </button>
            </div>
          </div>
        )}

      </div>

    </div>
  );
}
