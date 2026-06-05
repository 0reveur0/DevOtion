import React, { useState, useEffect } from "react";
import { 
  CategoryType, 
  Tool, 
  Review, 
  UserProfile, 
  NewReviewInput, 
  ContributorIssue 
} from "./types";
import HeroSection from "./components/HeroSection";
import Sidebar from "./components/Sidebar";
import ToolGrid from "./components/ToolGrid";
import ToolDetailView from "./components/ToolDetailView";
import GithubWorkPanel from "./components/GithubWorkPanel";

import { 
  INITIAL_TOOLS, 
  INITIAL_REVIEWS, 
  DEMO_USER_PROFILE, 
  INITIAL_ISSUES 
} from "./data/devotionData";

import { 
  Heart, 
  Code2, 
  Github, 
  BookOpen, 
  Layers, 
  Sparkles, 
  TrendingUp, 
  Award,
  AlertCircle
} from "lucide-react";

export default function App() {
  // Live states initialized from localStorage or mock defaults
  const [tools, setTools] = useState<Tool[]>(() => {
    const saved = localStorage.getItem("devotion_tools_v1");
    return saved ? JSON.parse(saved) : INITIAL_TOOLS;
  });

  const [reviews, setReviews] = useState<Review[]>(() => {
    const saved = localStorage.getItem("devotion_reviews_v1");
    return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
  });

  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem("devotion_user_v1");
    return saved ? JSON.parse(saved) : null;
  });

  const [upvotedReviewIds, setUpvotedReviewIds] = useState<string[]>(() => {
    const saved = localStorage.getItem("devotion_upvotes_v1");
    return saved ? JSON.parse(saved) : [];
  });

  const [issues, setIssues] = useState<ContributorIssue[]>(() => {
    const saved = localStorage.getItem("devotion_issues_v1");
    return saved ? JSON.parse(saved) : INITIAL_ISSUES;
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<CategoryType | "All">("All");

  // Selection state defaulting to the first tool for a rich instant detail view
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);

  // Sync state to LocalStorage
  useEffect(() => {
    localStorage.setItem("devotion_tools_v1", JSON.stringify(tools));
  }, [tools]);

  useEffect(() => {
    localStorage.setItem("devotion_reviews_v1", JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem("devotion_user_v1", JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem("devotion_upvotes_v1", JSON.stringify(upvotedReviewIds));
  }, [upvotedReviewIds]);

  useEffect(() => {
    localStorage.setItem("devotion_issues_v1", JSON.stringify(issues));
  }, [issues]);

  // Handle selectedTool initialization
  useEffect(() => {
    if (tools.length > 0 && !selectedTool) {
      setSelectedTool(tools[0]);
    }
  }, [tools, selectedTool]);

  // Auth simulators
  const handleLogin = () => {
    setCurrentUser(DEMO_USER_PROFILE);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  const handleUpdateBio = (newBio: string) => {
    if (currentUser) {
      setCurrentUser(prev => prev ? { ...prev, bio: newBio } : null);
    }
  };

  // Add a review
  const handleAddReview = (input: NewReviewInput) => {
    if (!currentUser || !selectedTool) return;

    const newReview: Review = {
      id: `rev-${Date.now()}`,
      toolId: selectedTool.id,
      authorUsername: currentUser.username,
      authorAvatar: currentUser.avatar,
      authorBio: currentUser.bio || "Developer",
      rating: input.rating,
      title: input.title,
      content: input.content,
      createdAt: new Date().toISOString(),
      upvotes: 0
    };

    // Prepend new review
    const updatedReviews = [newReview, ...reviews];
    setReviews(updatedReviews);

    // Increment user contribution stats
    setCurrentUser(prev => {
      if (!prev) return null;
      return {
        ...prev,
        reviewsCount: prev.reviewsCount + 1
      };
    });

    // Recalculate tool averages for state and persistence
    const toolReviews = updatedReviews.filter(r => r.toolId === selectedTool.id);
    const avgRating = toolReviews.reduce((sum, r) => sum + r.rating, 0) / toolReviews.length;

    const updatedTools = tools.map(t => {
      if (t.id === selectedTool.id) {
        return {
          ...t,
          avgRating,
          totalReviews: toolReviews.length
        };
      }
      return t;
    });

    setTools(updatedTools);
    
    // Update selectedTool reference
    const freshToolRef = updatedTools.find(t => t.id === selectedTool.id);
    if (freshToolRef) {
      setSelectedTool(freshToolRef);
    }
  };

  // Upvoting logic with single upvote restriction per user
  const handleUpvoteReview = (reviewId: string) => {
    if (!currentUser) return;

    let updatedReviews = [...reviews];
    let isAlreadyUpvoted = upvotedReviewIds.includes(reviewId);

    if (isAlreadyUpvoted) {
      // Toggle off upvote
      setUpvotedReviewIds(prev => prev.filter(id => id !== reviewId));
      updatedReviews = updatedReviews.map(r => {
        if (r.id === reviewId) {
          const newUpvotes = Math.max(0, r.upvotes - 1);
          
          // If the logged in user happens to be the author of this review, sync upvotes count
          if (r.authorUsername === currentUser.username) {
            setCurrentUser(prevProfile => {
              if (!prevProfile) return null;
              return {
                ...prevProfile,
                totalUpvotesReceived: Math.max(0, prevProfile.totalUpvotesReceived - 1)
              };
            });
          }
          return { ...r, upvotes: newUpvotes };
        }
        return r;
      });
    } else {
      // Toggle on upvote
      setUpvotedReviewIds(prev => [...prev, reviewId]);
      updatedReviews = updatedReviews.map(r => {
        if (r.id === reviewId) {
          const newUpvotes = r.upvotes + 1;

          // If the logged in user is the author, increment upvotes received
          if (r.authorUsername === currentUser.username) {
            setCurrentUser(prevProfile => {
              if (!prevProfile) return null;
              return {
                ...prevProfile,
                totalUpvotesReceived: prevProfile.totalUpvotesReceived + 1
              };
            });
          }
          return { ...r, upvotes: newUpvotes };
        }
        return r;
      });
    }

    setReviews(updatedReviews);
  };

  // Add a dynamically proposed tool (simulated open-source contributor pipeline)
  const handleAddToolProposal = (proposal: { name: string; category: CategoryType; description: string }) => {
    const proposedId = proposal.name.toLowerCase().replace(/[^a-z0-9]/g, "-");
    
    // Add to Tools list immediately so the contributor sees it in action!
    const newTool: Tool = {
      id: proposedId,
      name: proposal.name,
      category: proposal.category,
      description: proposal.description,
      longDescription: `${proposal.description} (Được đề xuất bởi nhà đóng góp mã nguồn mở thông qua DevOtion Workspace).`,
      websiteUrl: "https://github.com",
      githubUrl: "https://github.com",
      avgRating: 5.0,
      totalReviews: 0
    };

    setTools(prev => {
      if (prev.some(t => t.id === proposedId)) return prev;
      return [...prev, newTool];
    });

    // Auto-create a companion tracking issue
    const newIssue: ContributorIssue = {
      id: `iss-${Date.now().toString().slice(-4)}`,
      title: `review: Audit and release proposed tool config for '${proposal.name}'`,
      status: "open",
      labels: ["good first issue", "enhancement"],
      commentsCount: 0,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setIssues(prev => [newIssue, ...prev]);

    // Force highlight the new tool
    setSelectedTool(newTool);
  };

  // Category list counting calculation
  const categoriesList: { name: CategoryType; count: number }[] = [
    "Frontend",
    "Backend",
    "Database",
    "DevOps",
    "Cloud",
    "Mobile",
    "AI",
    "Testing",
    "Design"
  ].map(cat => {
    const count = tools.filter(t => t.category === cat).length;
    return { name: cat as CategoryType, count };
  });

  // Filter tools matching filters and search queries
  const filteredTools = tools.filter(t => {
    const matchesCategory = activeCategory === "All" || t.category === activeCategory;
    const matchesSearch = searchQuery === "" || 
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Calculate global platform telemetry
  const totalReviewsCount = reviews.length;
  const topVotedReviews = [...reviews].sort((a, b) => b.upvotes - a.upvotes).slice(0, 3);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-slate-800">
      
      {/* PROFESSIONAL COMPACT GITHUB-STYLE NAVBAR */}
      <header className="border-b border-slate-900 bg-slate-950 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 select-none">
            <div className="p-2 border border-slate-850 bg-slate-900 rounded-lg text-indigo-400">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-sans font-bold text-base text-white tracking-tight">
                  DevOtion
                </h1>
                <span className="text-[10px] bg-slate-900 border border-slate-800 text-slate-400 px-1.5 py-0.2 rounded font-mono font-medium">
                  v1.0.0-beta
                </span>
              </div>
              <p className="text-[10px] text-slate-500">Mã nguồn mở tìm kiếm đánh giá công cụ phát triển phần mềm</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a 
              href="https://github.com/0reveur0/DevOtion" 
              target="_blank" 
              rel="noreferrer"
              className="text-xs text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 font-mono pointer-events-auto bg-slate-900/60 border border-slate-850 px-2.5 py-1.5 rounded-lg"
            >
              <Github className="w-4 h-4" />
              <span className="hidden sm:inline">0reveur0/DevOtion</span>
            </a>
          </div>
        </div>
      </header>

      {/* CORE HERO SECTION FOR ADVERTISING SUMMARY AND SEARCH */}
      <HeroSection
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        totalTools={tools.length}
        totalReviews={reviews.length}
      />

      {/* CORE DESKTOP LAYOUT GRID */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* COLUMN 1: SIDEBAR (3/12 width in responsive wide viewports) */}
        <nav className="lg:col-span-3 flex flex-col gap-6" id="app_navigation_rail">
          <Sidebar
            categories={categoriesList}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            currentUser={currentUser}
            onLogin={handleLogin}
            onLogout={handleLogout}
            onUpdateBio={handleUpdateBio}
          />
        </nav>

        {/* COLUMN 2: PRIMARY INTERACTIVE GRID AND DETAIL BOARD (9/12 width) */}
        <section className="lg:col-span-9 space-y-8" id="app_primary_viewboard">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* GRID OF INCLUDED DEVELOPER TOOLS */}
            <div className="space-y-4" id="tools_collection_view">
              <ToolGrid
                tools={filteredTools}
                selectedTool={selectedTool}
                onSelectTool={(t) => setSelectedTool(t)}
                activeCategory={activeCategory}
                searchQuery={searchQuery}
              />
            </div>

            {/* SEPARATED DETAIL PANEL VIEW */}
            <div className="space-y-4 font-sans" id="tool_deepdive_panel">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold font-mono text-slate-400 uppercase tracking-widest flex items-center gap-1.5 select-none">
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                  <span>Chi Tiết Công Nghệ</span>
                </span>
                
                {selectedTool && (
                  <span className="text-[10px] font-mono font-bold bg-slate-900 border border-slate-850 px-2 py-0.5 rounded text-indigo-400">
                    ID: {selectedTool.id}
                  </span>
                )}
              </div>

              {selectedTool ? (
                <ToolDetailView
                  tool={selectedTool}
                  reviews={reviews.filter((r) => r.toolId === selectedTool.id)}
                  currentUser={currentUser}
                  onAddReview={handleAddReview}
                  onUpvoteReview={handleUpvoteReview}
                  upvotedReviewIds={upvotedReviewIds}
                />
              ) : (
                <div className="p-12 text-center bg-slate-900/40 border border-dashed border-slate-850 rounded-xl flex flex-col items-center justify-center gap-3">
                  <Award className="w-8 h-8 text-slate-700 animate-pulse" />
                  <p className="text-xs text-slate-500 max-w-xs">
                    Vui lòng chọn một công nghệ ở bảng bên trái để hiển thị thông tin đánh giá thực tế chi tiết từ cộng đồng lập trình viên.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* OPEN SOURCE CONTRIBUTION WORKSPACE TABS */}
          <div className="pt-4 border-t border-slate-900/80">
            <GithubWorkPanel
              issues={issues}
              onAddToolProposal={handleAddToolProposal}
            />
          </div>

          {/* DYNAMIC TOP UPVOTED CONTRIBUTED REVIEWS SUMMARY BOARD */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
            <h3 className="text-xs font-bold font-mono text-slate-400 uppercase tracking-widest flex items-center gap-1.5 select-none">
              <Award className="w-4 h-4 text-pink-400" />
              <span>Đánh Giá Có Bình Chọn Cao Nhất Hệ Thống</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-sans text-xs">
              {topVotedReviews.map(rev => {
                const targetTool = tools.find(t => t.id === rev.toolId);
                return (
                  <div key={rev.id} className="p-4 bg-slate-950/60 border border-slate-850 rounded-lg flex flex-col justify-between gap-3">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-indigo-400">@{rev.authorUsername}</span>
                        <span className="font-mono bg-slate-900 border border-slate-800 text-[10px] px-2 py-0.2 rounded text-slate-350">
                          {targetTool?.name || rev.toolId}
                        </span>
                      </div>
                      <p className="text-slate-300 font-semibold line-clamp-1">"{rev.title}"</p>
                      <p className="text-slate-400 line-clamp-2 leading-relaxed italic">"{rev.content}"</p>
                    </div>
                    
                    <div className="flex items-center justify-between border-t border-slate-850/60 pt-2 font-mono text-[10px] text-slate-500">
                      <span>Xếp hạng: {rev.rating} ★</span>
                      <span className="text-pink-400 text-right">♥ {rev.upvotes} upvotes</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </section>
      </main>

      {/* FOOTER AREA */}
      <footer className="border-t border-slate-900/80 bg-slate-950 py-8 text-center text-xs text-slate-500 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-2 font-sans select-none">
          <p className="font-semibold text-slate-400">DevOtion — Nền Tảng Đánh Giá Công Cụ Lập Trình Mã Nguồn Mở</p>
          <p className="text-[10px] text-slate-600">Được cấp phép theo MIT License • Dự án thuộc quyền sở hữu của cộng đồng vĩnh viễn.</p>
        </div>
      </footer>

    </div>
  );
}
