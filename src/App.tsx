import React, { useState, useEffect } from 'react';
import { Poll, Candidate, Employee } from './types/vote';
import { INITIAL_POLLS } from './data/mockPolls';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { PollCard } from './components/PollCard';
import { PollDetailModal } from './components/PollDetailModal';
import { CandidateModal } from './components/CandidateModal';
import { CreatePollModal } from './components/CreatePollModal';
import { ImportExcelModal } from './components/ImportExcelModal';
import { LeaderboardView } from './components/LeaderboardView';
import { Footer } from './components/Footer';
import { Filter, Sparkles, CheckCircle2, FileSpreadsheet } from 'lucide-react';

const STORAGE_KEY_POLLS = 'web_binh_chon_polls_v1';
const STORAGE_KEY_VOTES = 'web_binh_chon_user_votes_v1';

export const App: React.FC = () => {
  // Load polls
  const [polls, setPolls] = useState<Poll[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_POLLS);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to load polls from storage', e);
    }
    return INITIAL_POLLS;
  });

  // User vote records: { [pollId: string]: string[] (candidateIds) }
  const [userVotes, setUserVotes] = useState<{ [pollId: string]: string[] }>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_VOTES);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to load user votes', e);
    }
    return {};
  });

  // Navigation & Filter state
  const [activeTab, setActiveTab] = useState<'explore' | 'leaderboard'>('explore');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'ended'>('all');

  // Modals state
  const [selectedPoll, setSelectedPoll] = useState<Poll | null>(null);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isImportExcelModalOpen, setIsImportExcelModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Handle Import Excel
  const handleImportSuccess = (employees: Employee[], autoCreatePoll: boolean) => {
    if (autoCreatePoll) {
      // Tự động tạo một cuộc bình chọn mới từ danh sách nhân viên
      const now = new Date();
      const end = new Date();
      end.setDate(now.getDate() + 30);

      const candidateList: Candidate[] = employees.map((emp, i) => ({
        id: `c-emp-${Date.now()}-${i}`,
        code: emp.empCode,
        name: emp.fullName,
        title: emp.position || 'Nhân viên xuất sắc',
        organization: emp.department,
        avatar: emp.avatar || `https://images.unsplash.com/photo-${1534528741775 + (i % 8) * 120}?auto=format&fit=crop&w=400&q=80`,
        bio: `Cán bộ nhân viên thuộc ${emp.department}. Được đề cử danh hiệu Nhân Viên Tiêu Biểu & Gương Mặt Cống Hiến.`,
        votesCount: 0,
        highlightAchievements: [
          `Đóng góp tích cực cho ${emp.department}`,
          'Hoàn thành xuất sắc chỉ tiêu công việc',
        ],
      }));

      const newPoll: Poll = {
        id: `poll-emp-${Date.now()}`,
        slug: `binh-chon-nhan-vien-xuat-sac-${Date.now()}`,
        title: `Bình Chọn Gương Mặt Nhân Viên Tiêu Biểu (${employees.length} Nhân Sự)`,
        shortDescription: `Bình chọn trực tuyến cho các nhân sự tiêu biểu đại diện các phòng ban trong công ty. Dữ liệu được nhập trực tiếp từ file Excel nhân sự.`,
        description: `Chương trình vinh danh và bình chọn thường niên dành cho cán bộ công nhân viên. Toàn thể nhân sự được tham gia bỏ phiếu công tâm, minh bạch để chọn ra các gương mặt xuất sắc nhất.`,
        bannerUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1400&q=80',
        category: 'contest',
        status: 'active',
        startDate: now.toISOString(),
        endDate: end.toISOString(),
        maxChoices: 1,
        minChoices: 1,
        totalVotes: 0,
        totalVoters: 0,
        isFeatured: true,
        accessType: 'public',
        showRealtimeResults: true,
        allowComments: true,
        rules: [
          'Mỗi nhân viên được bình chọn 01 phiếu duy nhất.',
          'Hệ thống tự động ngăn chặn trùng lặp thiết bị.',
          'Kết quả được xuất trực tiếp ra file Excel báo cáo Ban Giám Đốc.',
        ],
        organizer: {
          name: 'Phòng Nhân Sự & Ban Giám Đốc',
          verified: true,
          contact: 'hr@company.vn',
        },
        candidates: candidateList,
        comments: [],
      };

      setPolls((prev) => [newPoll, ...prev]);
      setSelectedPoll(newPoll);
      showToast(`Đã tạo thành công cuộc bình chọn với ${employees.length} nhân viên từ Excel!`);
    } else {
      showToast(`Đã lưu ${employees.length} hồ sơ nhân sự vào hệ thống thành công!`);
    }
  };

  // Sync state to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_POLLS, JSON.stringify(polls));
    } catch (e) {
      console.error('Failed to save polls', e);
    }
  }, [polls]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_VOTES, JSON.stringify(userVotes));
    } catch (e) {
      console.error('Failed to save votes', e);
    }
  }, [userVotes]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Handle voting
  const handleVote = (pollId: string, candidateIds: string[], voterName: string) => {
    // 1. Update polls state
    setPolls((prev) =>
      prev.map((poll) => {
        if (poll.id !== pollId) return poll;

        const updatedCandidates = poll.candidates.map((cand) => {
          if (candidateIds.includes(cand.id)) {
            return {
              ...cand,
              votesCount: cand.votesCount + 1,
            };
          }
          return cand;
        });

        return {
          ...poll,
          totalVotes: poll.totalVotes + candidateIds.length,
          totalVoters: poll.totalVoters + 1,
          candidates: updatedCandidates,
        };
      })
    );

    // 2. Record voter record
    setUserVotes((prev) => ({
      ...prev,
      [pollId]: candidateIds,
    }));

    // 3. Keep selectedPoll in sync
    if (selectedPoll && selectedPoll.id === pollId) {
      const updatedCandidates = selectedPoll.candidates.map((cand) => {
        if (candidateIds.includes(cand.id)) {
          return {
            ...cand,
            votesCount: cand.votesCount + 1,
          };
        }
        return cand;
      });

      setSelectedPoll({
        ...selectedPoll,
        totalVotes: selectedPoll.totalVotes + candidateIds.length,
        totalVoters: selectedPoll.totalVoters + 1,
        candidates: updatedCandidates,
      });
    }

    showToast(`Bình chọn thành công! Cảm ơn ${voterName} đã tham gia.`);
  };

  // Handle adding comments
  const handleAddComment = (
    pollId: string,
    commentData: { author: string; content: string; candidateId?: string }
  ) => {
    const targetCandidate = selectedPoll?.candidates.find((c) => c.id === commentData.candidateId);

    const newComment = {
      id: `cm-${Date.now()}`,
      pollId,
      candidateId: commentData.candidateId,
      candidateName: targetCandidate ? targetCandidate.name : undefined,
      author: commentData.author,
      content: commentData.content,
      timestamp: 'Vừa xong',
      likes: 1,
    };

    setPolls((prev) =>
      prev.map((p) => {
        if (p.id !== pollId) return p;
        return {
          ...p,
          comments: [newComment, ...p.comments],
        };
      })
    );

    if (selectedPoll && selectedPoll.id === pollId) {
      setSelectedPoll({
        ...selectedPoll,
        comments: [newComment, ...selectedPoll.comments],
      });
    }

    showToast('Đã gửi lời cổ vũ của bạn!');
  };

  const handleLikeComment = (pollId: string, commentId: string) => {
    setPolls((prev) =>
      prev.map((p) => {
        if (p.id !== pollId) return p;
        return {
          ...p,
          comments: p.comments.map((cm) => (cm.id === commentId ? { ...cm, likes: cm.likes + 1 } : cm)),
        };
      })
    );

    if (selectedPoll && selectedPoll.id === pollId) {
      setSelectedPoll({
        ...selectedPoll,
        comments: selectedPoll.comments.map((cm) =>
          cm.id === commentId ? { ...cm, likes: cm.likes + 1 } : cm
        ),
      });
    }
  };

  // Handle create poll
  const handleCreatePoll = (newPoll: Poll) => {
    setPolls((prev) => [newPoll, ...prev]);
    showToast('Tạo cuộc bình chọn mới thành công!');
    setSelectedPoll(newPoll);
  };

  // Filter polls
  const filteredPolls = polls.filter((poll) => {
    const matchesCategory = selectedCategory === 'all' || poll.category === selectedCategory;
    const matchesStatus = statusFilter === 'all' || poll.status === statusFilter;
    const matchesSearch =
      !searchQuery.trim() ||
      poll.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      poll.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      poll.candidates.some(
        (c) =>
          c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.code.toLowerCase().includes(searchQuery.toLowerCase())
      );

    return matchesCategory && matchesStatus && matchesSearch;
  });

  const featuredPoll = polls.find((p) => p.isFeatured) || polls[0];
  const totalVotesAll = polls.reduce((sum, p) => sum + p.totalVotes, 0);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-['Be_Vietnam_Pro',sans-serif]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-70 bg-slate-900 text-white px-5 py-3.5 rounded-2xl shadow-xl border border-slate-700 flex items-center gap-3 animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Main Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenCreate={() => setIsCreateModalOpen(true)}
        onOpenImportExcel={() => setIsImportExcelModalOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        votedCount={Object.keys(userVotes).length}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'explore' && (
          <div className="space-y-8">
            {/* Hero Showcase (only if no active search query) */}
            {!searchQuery && (
              <HeroBanner
                featuredPoll={featuredPoll}
                totalVotesAll={totalVotesAll}
                totalPollsCount={polls.length}
                onSelectPoll={(p) => setSelectedPoll(p)}
              />
            )}

            {/* Filter and Category Bar */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-indigo-600" />
                    <span>Cuộc Bình Chọn Đang Mở</span>
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500">
                    Bỏ phiếu minh bạch cho ứng viên và dự án bạn tín nhiệm
                  </p>
                </div>

                {/* Status Tabs */}
                <div className="flex items-center bg-slate-200/70 p-1 rounded-xl text-xs font-bold self-start sm:self-auto">
                  <button
                    onClick={() => setStatusFilter('all')}
                    className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                      statusFilter === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Tất cả ({polls.length})
                  </button>
                  <button
                    onClick={() => setStatusFilter('active')}
                    className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                      statusFilter === 'active' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Đang mở
                  </button>
                  <button
                    onClick={() => setStatusFilter('ended')}
                    className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                      statusFilter === 'ended' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Đã kết thúc
                  </button>
                </div>
              </div>

              {/* Category Pills */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {[
                  { id: 'all', label: 'Tất cả' },
                  { id: 'awards', label: 'Giải Thưởng & Danh Hiệu' },
                  { id: 'tech', label: 'Công Nghệ & AI' },
                  { id: 'culture', label: 'Văn Hóa & Ẩm Thực' },
                  { id: 'contest', label: 'Cuộc Thi Nội Bộ' },
                  { id: 'polls', label: 'Khảo Sát Ý Kiến' },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3.5 py-1.5 text-xs font-bold rounded-xl whitespace-nowrap transition-colors cursor-pointer ${
                      selectedCategory === cat.id
                        ? 'bg-slate-900 text-white'
                        : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Excel Import Banner */}
            <div className="bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-indigo-500/10 border border-emerald-200/80 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                  <FileSpreadsheet className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    Bạn có file Excel danh sách nhân viên cần tổ chức bình chọn?
                  </h4>
                  <p className="text-xs text-slate-600">
                    Tải file (.xlsx) lên để hệ thống tự động khởi tạo danh sách ứng viên và cho phép nhân viên bình chọn, xuất báo cáo ngay lập tức.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsImportExcelModalOpen(true)}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-all shadow-xs shrink-0 flex items-center gap-1.5 cursor-pointer active:scale-95"
              >
                <FileSpreadsheet className="w-4 h-4" />
                <span>Import File Excel Nhân Viên</span>
              </button>
            </div>

            {/* Polls Grid */}
            {filteredPolls.length === 0 ? (
              <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
                  <Filter className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-slate-800 text-lg">Không tìm thấy cuộc bình chọn phù hợp</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Hãy thử tìm kiếm với từ khóa khác hoặc chuyển sang danh mục khác để xem thêm.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setSearchQuery('');
                    setStatusFilter('all');
                  }}
                  className="px-4 py-2 bg-indigo-600 text-white text-xs font-bold rounded-xl shadow-xs cursor-pointer"
                >
                  Xem tất cả cuộc bình chọn
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPolls.map((poll) => (
                  <PollCard
                    key={poll.id}
                    poll={poll}
                    hasVoted={Boolean(userVotes[poll.id])}
                    onSelect={(p) => setSelectedPoll(p)}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Leaderboard */}
        {activeTab === 'leaderboard' && (
          <LeaderboardView
            polls={polls}
            onSelectPoll={(p) => setSelectedPoll(p)}
          />
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Poll Details Modal */}
      {selectedPoll && (
        <PollDetailModal
          poll={selectedPoll}
          onClose={() => setSelectedPoll(null)}
          onVote={handleVote}
          hasVoted={Boolean(userVotes[selectedPoll.id])}
          userVotedCandidateIds={userVotes[selectedPoll.id] || []}
          onAddComment={handleAddComment}
          onLikeComment={handleLikeComment}
          onOpenCandidateDetails={(cand) => setSelectedCandidate(cand)}
        />
      )}

      {/* Candidate Profile Modal */}
      {selectedCandidate && (
        <CandidateModal
          candidate={selectedCandidate}
          onClose={() => setSelectedCandidate(null)}
          onVoteForThisCandidate={(candidateId) => {
            if (selectedPoll) {
              handleVote(selectedPoll.id, [candidateId], 'Cử tri trực tiếp');
            }
          }}
          hasVotedForThis={
            selectedPoll ? Boolean(userVotes[selectedPoll.id]?.includes(selectedCandidate.id)) : false
          }
          totalPollVotes={selectedPoll?.totalVotes || 1}
        />
      )}

      {/* Create Poll Modal */}
      {isCreateModalOpen && (
        <CreatePollModal
          onClose={() => setIsCreateModalOpen(false)}
          onCreate={handleCreatePoll}
        />
      )}

      {/* Import Excel Modal */}
      {isImportExcelModalOpen && (
        <ImportExcelModal
          onClose={() => setIsImportExcelModalOpen(false)}
          onImportSuccess={handleImportSuccess}
        />
      )}
    </div>
  );
};

export default App;
