import React, { useState } from "react";
import { Tool, Review, UserProfile, NewReviewInput } from "../types";
import { 
  Star, 
  MessageSquare, 
  ThumbsUp, 
  GitBranch, 
  Globe, 
  Github as GithubIcon, 
  PlusCircle, 
  AlertCircle, 
  Calendar,
  X,
  Sparkles,
  Award
} from "lucide-react";

interface ToolDetailViewProps {
  tool: Tool;
  reviews: Review[];
  currentUser: UserProfile | null;
  onAddReview: (input: NewReviewInput) => void;
  onUpvoteReview: (reviewId: string) => void;
  upvotedReviewIds: string[];
}

export default function ToolDetailView({
  tool,
  reviews,
  currentUser,
  onAddReview,
  onUpvoteReview,
  upvotedReviewIds
}: ToolDetailViewProps) {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      setErrorMsg("Vui lòng điền đầy đủ tiêu đề và nội dung.");
      return;
    }

    if (content.trim().length < 15) {
      setErrorMsg("Nội dung đánh giá cần ít nhất 15 ký tự để khách quan nhất.");
      return;
    }

    onAddReview({
      rating,
      title: title.trim(),
      content: content.trim()
    });

    // Reset Form
    setTitle("");
    setContent("");
    setErrorMsg("");
    setShowReviewForm(false);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl" id={`tool_detail_view_${tool.id}`}>
      
      {/* TOOL HEADER & DESCRIPTION CONTROLLER */}
      <div className="p-6 bg-slate-950/40 border-b border-slate-850 space-y-4 select-text">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              <span>{tool.name}</span>
            </h2>
            <div className="flex items-center gap-3 text-xs text-slate-400">
              <span className="font-mono text-indigo-400 font-bold uppercase">{tool.category}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <strong>{tool.avgRating.toFixed(1)}</strong> / 5
              </span>
              <span>•</span>
              <span><strong>{reviews.length}</strong> reviews</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={tool.websiteUrl}
              target="_blank"
              rel="noreferrer"
              className="px-3.5 py-2 bg-slate-950 border border-slate-800 text-slate-300 hover:text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors pointer-events-auto"
            >
              <Globe className="w-3.5 h-3.5 text-slate-500" />
              <span>Website</span>
            </a>
            {tool.githubUrl && (
              <a
                href={tool.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-2 bg-slate-950 border border-slate-800 text-slate-300 hover:text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors pointer-events-auto"
              >
                <GithubIcon className="w-3.5 h-3.5 text-slate-550" />
                <span>Source</span>
              </a>
            )}
          </div>
        </div>

        <div className="pt-2 border-t border-slate-850/60">
          <p className="text-sm text-slate-300 leading-relaxed font-sans">{tool.longDescription}</p>
        </div>
      </div>

      <div className="p-6 space-y-6">
        
        {/* REVIEWS HEADER & TRIGGER CRITERIA */}
        <div className="flex items-center justify-between border-b border-slate-850 pb-4">
          <h3 className="text-xs font-bold font-mono text-slate-400 uppercase tracking-widest flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-indigo-400" />
            <span>Đánh Giá Từ Cộng Đồng ({reviews.length})</span>
          </h3>
          
          {!showReviewForm && (
            <button
              onClick={() => {
                if (currentUser) {
                  setShowReviewForm(true);
                  setErrorMsg("");
                } else {
                  setErrorMsg("Vui lòng click 'Sign in with GitHub' ở thanh bên trái trước khi viết đánh giá.");
                }
              }}
              className="px-3.5 py-2 bg-gradient-to-r from-indigo-700 to-indigo-650 hover:from-indigo-600 hover:to-indigo-550 text-white rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer pointer-events-auto"
              id="write_review_btn"
            >
              <PlusCircle className="w-4 h-4 text-indigo-200" />
              <span>Viết Review Mới</span>
            </button>
          )}
        </div>

        {/* MOCK AUTHENTICATION FAILURE ALERT BANNER */}
        {errorMsg && !currentUser && (
          <div className="p-3.5 bg-red-950/20 border border-red-900/60 rounded-xl text-red-400 text-xs flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
            <div className="space-y-1">
              <span className="font-semibold text-red-300">Yêu cầu đăng nhập:</span>
              <p className="leading-relaxed">Bạn cần được cấp quyền tác giả. Click Đăng nhập bằng tài khoản mã nguồn mở GitHub tại sidebar bên trái để tiếp tục viết đánh giá.</p>
            </div>
          </div>
        )}

        {/* ADD REVIEW WORKSPACE FORM (visible only if logged in) */}
        {showReviewForm && currentUser && (
          <form onSubmit={handleSubmitReview} className="bg-slate-950/80 border border-slate-800 rounded-xl p-5 space-y-4 font-sans select-text" id="review_creation_form">
            <div className="flex items-center justify-between border-b border-slate-850 pb-2">
              <span className="text-xs font-semibold text-slate-350 flex items-center gap-1.5 font-mono">
                <PlusCircle className="w-3.5 h-3.5 text-indigo-400" />
                ĐÁNH GIÁ CÔNG CỤ: {tool.name.toUpperCase()}
              </span>
              <button
                type="button"
                onClick={() => setShowReviewForm(false)}
                className="text-slate-500 hover:text-slate-400 text-xs p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {errorMsg && (
              <div className="p-2.5 bg-red-950/20 border border-red-900/40 rounded-lg text-red-400 text-xs flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* STAR RATING INTERACTION */}
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-slate-400">Chọn số sao đánh giá:</label>
              <div className="flex items-center gap-1.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(null)}
                    className="p-1 focus:outline-none transition-transform active:scale-95 duration-75"
                  >
                    <Star
                      className={`w-6 h-6 transition-all ${
                        star <= (hoverRating ?? rating)
                          ? "fill-amber-400 text-amber-400 scale-105"
                          : "text-slate-700 hover:text-slate-500"
                      }`}
                    />
                  </button>
                ))}
                <span className="text-xs text-slate-400 ml-2 font-mono">
                  ({rating} / 5 sao - {rating === 5 ? "Rất xuất sắc" : rating === 4 ? "Tốt / Đáng dùng" : rating === 3 ? "Bình thường" : rating === 2 ? "Nhiều hạn chế" : "Kém / Không khuyên dùng"})
                </span>
              </div>
            </div>

            {/* REVIEW TITLE */}
            <div className="space-y-1.5">
              <label htmlFor="review_title_input" className="block text-xs font-medium text-slate-400">Tiêu đề đánh giá ngắn gọn:</label>
              <input
                id="review_title_input"
                type="text"
                placeholder="Ví dụ: Cực kỳ phù hợp cho MVPs, tuy nhiên giá hơi cao..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                maxLength={80}
                className="w-full bg-slate-950 border border-slate-800 text-xs text-slate-100 px-3.5 py-2 rounded-lg focus:outline-none focus:border-indigo-500"
              />
            </div>

            {/* REVIEW CONTENT */}
            <div className="space-y-1.5">
              <label htmlFor="review_content_input" className="block text-xs font-medium text-slate-400">Trải nghiệm thực tế chi tiết:</label>
              <textarea
                id="review_content_input"
                rows={4}
                placeholder="Hãy viết ít nhất 15 ký tự về ưu điểm, nhược điểm, lời khuyên thực tế khi chạy môi trường production..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                maxLength={1000}
                className="w-full bg-slate-950 border border-slate-800 text-xs text-slate-100 p-3 rounded-lg focus:outline-none focus:border-indigo-500 resize-none leading-relaxed"
              ></textarea>
              <div className="text-right text-[10px] text-slate-500 font-mono">
                {content.length}/1000 ký tự (Tối thiểu 15)
              </div>
            </div>

            <div className="flex justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setShowReviewForm(false)}
                className="px-3 py-1.5 bg-slate-950 hover:bg-slate-900 border border-slate-800 text-slate-400 text-xs rounded-lg transition-colors cursor-pointer"
              >
                Hủy bỏ
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 bg-emerald-650 hover:bg-emerald-600 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
              >
                Đăng Review
              </button>
            </div>
          </form>
        )}

        {/* REVIEWS LAYOUT LIST */}
        {reviews.length === 0 ? (
          <div className="p-12 text-center bg-slate-950/20 border border-dashed border-slate-850 rounded-xl">
            <p className="text-slate-400 text-xs">Chưa có bài review nào cho công cụ này.</p>
            <p className="text-[11px] text-slate-500 mt-1 leading-normal">Trở thành lập trình viên tiên phong viết đánh giá thực tế đầu tiên!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {reviews.map((rev) => {
              const isUpvoted = upvotedReviewIds.includes(rev.id);
              
              // Formatting dates elegantly
              const formattedDate = new Date(rev.createdAt).toLocaleDateString("vi-VN", {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              });

              return (
                <div
                  key={rev.id}
                  className="p-5 bg-slate-950/50 border border-slate-850/70 hover:border-slate-800 rounded-xl space-y-3.5 transition-colors select-text"
                  id={`review_item_${rev.id}`}
                >
                  {/* Top user profile bar */}
                  <div className="flex items-start justify-between gap-3 flex-wrap">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={rev.authorAvatar}
                        alt={rev.authorUsername}
                        className="w-8 h-8 rounded-full border border-slate-800 object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-white">@{rev.authorUsername}</span>
                          <span className="text-[10px] text-slate-500 font-sans">{rev.authorBio}</span>
                        </div>
                        <div className="text-[10px] text-slate-500 flex items-center gap-2">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-slate-600" />
                            Đăng ngày {formattedDate}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Star Rating indicator */}
                    <div className="flex items-center gap-0.5 bg-slate-900 border border-slate-850 px-2.5 py-1 rounded-lg">
                      {[1, 2, 3, 4, 5].map((strIndex) => (
                        <Star
                          key={strIndex}
                          className={`w-3 h-3 ${
                            strIndex <= rev.rating 
                              ? "fill-amber-400 text-amber-400" 
                              : "text-slate-800"
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Title and message content */}
                  <div className="space-y-1.5 pl-0.5">
                    <h4 className="font-bold text-sm text-slate-100 font-sans">{rev.title}</h4>
                    <p className="text-xs text-slate-300 leading-relaxed font-sans whitespace-pre-line">{rev.content}</p>
                  </div>

                  {/* Upvoted system logic indicators */}
                  <div className="flex items-center justify-between pt-2 border-t border-slate-900/60 text-[11px] text-slate-500 font-sans">
                    <button
                      onClick={() => {
                        if (currentUser) {
                          onUpvoteReview(rev.id);
                        } else {
                          alert("Vui lòng Sign In bằng GitHub ở thanh bên trái trước khi vote!");
                        }
                      }}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-all pointer-events-auto cursor-pointer ${
                        isUpvoted
                          ? "bg-pink-950/40 text-pink-400 border-pink-905"
                          : "bg-slate-900 hover:bg-slate-850 border-slate-850 text-slate-400 hover:text-slate-200"
                      }`}
                      title={isUpvoted ? "Bạn đã upvote review này" : "Upvote review hữu ích"}
                    >
                      <ThumbsUp className={`w-3.5 h-3.5 ${isUpvoted ? "fill-pink-500 text-pink-400 animate-bounce" : ""}`} />
                      <span>{isUpvoted ? "Đóng góp hữu ích!" : "Hữu ích"}</span>
                      <span className="font-mono font-bold font-xs ml-0.5 bg-slate-950/80 px-1.5 py-0.2 rounded-md border border-slate-850">
                        {rev.upvotes}
                      </span>
                    </button>

                    <div className="text-[10px] text-slate-500 font-mono italic">
                      {rev.upvotes >= 15 && (
                        <span className="flex items-center gap-1 text-sky-400">
                          <Award className="w-3.5 h-3.5" /> Thảo luận chất lượng
                        </span>
                      )}
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>

    </div>
  );
}
