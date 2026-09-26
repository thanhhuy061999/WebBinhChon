import React, { useState } from 'react';
import { Poll, Candidate, PollComment } from '../types/vote';
import { exportPollResultsToExcel } from '../utils/excelHelper';
import confetti from 'canvas-confetti';
import {
  X,
  Vote,
  BarChart3,
  MessageSquare,
  ShieldCheck,
  Clock,
  Share2,
  CheckCircle,
  AlertCircle,
  Lock,
  Heart,
  Send,
  Download,
  Info,
  ChevronRight,
  Sparkles,
  Trophy,
  FileSpreadsheet
} from 'lucide-react';

interface PollDetailModalProps {
  poll: Poll;
  onClose: () => void;
  onVote: (pollId: string, candidateIds: string[], voterName: string) => void;
  hasVoted: boolean;
  userVotedCandidateIds: string[];
  onAddComment: (pollId: string, comment: { author: string; content: string; candidateId?: string }) => void;
  onLikeComment: (pollId: string, commentId: string) => void;
  onOpenCandidateDetails: (candidate: Candidate) => void;
}

export const PollDetailModal: React.FC<PollDetailModalProps> = ({
  poll,
  onClose,
  onVote,
  hasVoted,
  userVotedCandidateIds,
  onAddComment,
  onLikeComment,
  onOpenCandidateDetails,
}) => {
  const [activeTab, setActiveTab] = useState<'vote' | 'results' | 'comments' | 'rules'>('vote');
  const [selectedCandidateIds, setSelectedCandidateIds] = useState<string[]>(userVotedCandidateIds);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [voterName, setVoterName] = useState('');
  const [showConfirmVoteModal, setShowConfirmVoteModal] = useState(false);
  const [captchaAnswer, setCaptchaAnswer] = useState('');
  const [captchaNum1] = useState(Math.floor(Math.random() * 8) + 2);
  const [captchaNum2] = useState(Math.floor(Math.random() * 8) + 1);
  const [captchaError, setCaptchaError] = useState(false);

  // New comment input state
  const [newCommentAuthor, setNewCommentAuthor] = useState('');
  const [newCommentContent, setNewCommentContent] = useState('');
  const [commentTargetCandidate, setCommentTargetCandidate] = useState<string>('');

  const [copiedLink, setCopiedLink] = useState(false);

  const toggleSelectCandidate = (id: string) => {
    if (hasVoted) return;

    if (poll.maxChoices === 1) {
      setSelectedCandidateIds([id]);
    } else {
      if (selectedCandidateIds.includes(id)) {
        setSelectedCandidateIds(selectedCandidateIds.filter((cid) => cid !== id));
      } else {
        if (selectedCandidateIds.length < poll.maxChoices) {
          setSelectedCandidateIds([...selectedCandidateIds, id]);
        }
      }
    }
  };

  const handleStartVote = () => {
    if (selectedCandidateIds.length === 0) return;

    // Check PIN if required
    if (poll.accessType === 'pin_protected') {
      if (pinInput.trim() !== poll.pinCode) {
        setPinError(true);
        return;
      }
    }
    setPinError(false);
    setShowConfirmVoteModal(true);
  };

  const handleFinalVote = () => {
    if (parseInt(captchaAnswer) !== captchaNum1 + captchaNum2) {
      setCaptchaError(true);
      return;
    }
    setCaptchaError(false);
    setIsSubmitting(true);

    setTimeout(() => {
      onVote(poll.id, selectedCandidateIds, voterName.trim() || 'Người bình chọn ẩn danh');
      setIsSubmitting(false);
      setShowConfirmVoteModal(false);

      // Trigger Confetti!
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#4f46e5', '#f59e0b', '#10b981', '#ef4444'],
      });
    }, 400);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleSendComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentContent.trim()) return;

    onAddComment(poll.id, {
      author: newCommentAuthor.trim() || 'Thành viên cộng đồng',
      content: newCommentContent.trim(),
      candidateId: commentTargetCandidate || undefined,
    });

    setNewCommentContent('');
  };

  // Export Results as Excel (.xlsx)
  const handleExportExcel = () => {
    exportPollResultsToExcel(poll);
  };

  const sortedCandidates = [...poll.candidates].sort((a, b) => b.votesCount - a.votesCount);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto animate-fadeIn">
      <div className="relative bg-white rounded-3xl max-w-5xl w-full shadow-2xl overflow-hidden border border-slate-200 my-4 sm:my-8 flex flex-col max-h-[92vh]">
        {/* Banner Section */}
        <div className="relative h-44 sm:h-56 w-full bg-slate-900 shrink-0">
          <img src={poll.bannerUrl} alt={poll.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-black/30" />

          {/* Close & Share */}
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 sm:px-3 sm:py-1.5 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-md transition-colors text-xs font-semibold flex items-center gap-1.5"
            >
              <Share2 className="w-4 h-4" />
              <span className="hidden sm:inline">{copiedLink ? 'Đã sao chép link!' : 'Chia sẻ'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-md transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Banner text */}
          <div className="absolute bottom-4 left-4 sm:left-6 right-4 sm:right-6 text-white space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-indigo-500 text-white">
                {poll.category.toUpperCase()}
              </span>
              <span className="text-xs text-slate-300 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                {poll.organizer.name}
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-black leading-snug">{poll.title}</h1>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b border-slate-200 bg-slate-50/70 px-4 sm:px-6 flex items-center justify-between overflow-x-auto shrink-0">
          <div className="flex items-center gap-1 sm:gap-4 py-2">
            <button
              onClick={() => setActiveTab('vote')}
              className={`px-3 py-2 text-sm font-bold rounded-xl transition-colors flex items-center gap-2 ${
                activeTab === 'vote'
                  ? 'bg-white text-indigo-600 shadow-xs border border-slate-200/80'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Vote className="w-4 h-4" />
              <span>Bình chọn ({poll.candidates.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('results')}
              className={`px-3 py-2 text-sm font-bold rounded-xl transition-colors flex items-center gap-2 ${
                activeTab === 'results'
                  ? 'bg-white text-indigo-600 shadow-xs border border-slate-200/80'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Kết quả thời gian thực</span>
            </button>

            <button
              onClick={() => setActiveTab('comments')}
              className={`px-3 py-2 text-sm font-bold rounded-xl transition-colors flex items-center gap-2 ${
                activeTab === 'comments'
                  ? 'bg-white text-indigo-600 shadow-xs border border-slate-200/80'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>Cổ vũ & Bình luận ({poll.comments.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('rules')}
              className={`px-3 py-2 text-sm font-bold rounded-xl transition-colors flex items-center gap-2 ${
                activeTab === 'rules'
                  ? 'bg-white text-indigo-600 shadow-xs border border-slate-200/80'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Info className="w-4 h-4" />
              <span>Thể lệ ({poll.rules.length})</span>
            </button>
          </div>

          <div className="hidden md:flex items-center gap-2 text-xs font-semibold text-slate-500">
            <Clock className="w-3.5 h-3.5 text-amber-500" />
            <span>Hạn chót: {new Date(poll.endDate).toLocaleDateString('vi-VN')}</span>
          </div>
        </div>

        {/* Tab Content Areas */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1">
          {/* TAB 1: VOTING CANDIDATES */}
          {activeTab === 'vote' && (
            <div className="space-y-6">
              {/* Poll description & Choice requirement */}
              <div className="bg-indigo-50/70 border border-indigo-100 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="text-xs font-bold text-indigo-900 uppercase tracking-wide">
                    Quy định bầu chọn: {poll.maxChoices === 1 ? 'Chọn 01 ứng viên duy nhất' : `Chọn tối đa ${poll.maxChoices} ứng viên`}
                  </div>
                  <p className="text-xs text-indigo-700">
                    Nhấp vào ứng viên để chọn, sau đó nhấn "Xác nhận gửi phiếu bầu" ở góc dưới.
                  </p>
                </div>

                {hasVoted ? (
                  <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 text-white rounded-xl text-xs font-bold shadow-xs">
                    <CheckCircle className="w-4 h-4" />
                    <span>Bạn đã bỏ phiếu cho cuộc bình chọn này</span>
                  </div>
                ) : (
                  <div className="text-xs font-bold px-3 py-1 bg-white border border-indigo-200 text-indigo-800 rounded-lg">
                    Đã chọn: {selectedCandidateIds.length}/{poll.maxChoices}
                  </div>
                )}
              </div>

              {/* PIN Code Input if required */}
              {poll.accessType === 'pin_protected' && !hasVoted && (
                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-amber-200 text-amber-900">
                      <Lock className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-amber-950">Cuộc bình chọn yêu cầu Mã PIN Nội Bộ</div>
                      <div className="text-xs text-amber-800">
                        Nhập mã bảo mật do ban tổ chức cung cấp để gửi phiếu. (Mã mẫu: <span className="font-mono font-bold">{poll.pinCode}</span>)
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <input
                      type="text"
                      placeholder="Nhập mã PIN..."
                      value={pinInput}
                      onChange={(e) => {
                        setPinInput(e.target.value.toUpperCase());
                        setPinError(false);
                      }}
                      className={`px-3 py-1.5 text-sm bg-white border rounded-xl font-mono uppercase font-bold outline-none ${
                        pinError ? 'border-rose-500 ring-2 ring-rose-200' : 'border-amber-300 focus:border-amber-600'
                      }`}
                    />
                    {pinError && <span className="text-xs text-rose-600 font-semibold">Sai mã PIN!</span>}
                  </div>
                </div>
              )}

              {/* Candidate Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {poll.candidates.map((c) => {
                  const isSelected = selectedCandidateIds.includes(c.id);
                  const isVotedByMe = userVotedCandidateIds.includes(c.id);
                  const percentage = ((c.votesCount / (poll.totalVotes || 1)) * 100).toFixed(1);

                  return (
                    <div
                      key={c.id}
                      onClick={() => toggleSelectCandidate(c.id)}
                      className={`relative rounded-2xl border p-4 sm:p-5 transition-all duration-200 flex gap-4 cursor-pointer select-none ${
                        isSelected
                          ? 'border-indigo-600 bg-indigo-50/40 ring-2 ring-indigo-500/20 shadow-md'
                          : 'border-slate-200 hover:border-indigo-300 hover:bg-slate-50/60'
                      } ${hasVoted ? 'cursor-default' : ''}`}
                    >
                      {/* Avatar */}
                      <div className="relative shrink-0">
                        <img
                          src={c.avatar}
                          alt={c.name}
                          className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover ring-1 ring-slate-200 shadow-xs"
                        />
                        <span className="absolute -top-1.5 -left-1.5 px-2 py-0.5 rounded-md text-[10px] font-black bg-amber-400 text-slate-950 shadow-xs">
                          {c.code}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between gap-1">
                            <h3 className="font-bold text-base sm:text-lg text-slate-900 leading-snug line-clamp-1">
                              {c.name}
                            </h3>
                            {/* Selection check box / radio */}
                            {!hasVoted && (
                              <div
                                className={`w-6 h-6 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                                  isSelected
                                    ? 'bg-indigo-600 border-indigo-600 text-white'
                                    : 'border-slate-300 bg-white'
                                }`}
                              >
                                {isSelected && <CheckCircle className="w-4 h-4 fill-white text-indigo-600" />}
                              </div>
                            )}
                            {isVotedByMe && (
                              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                                Đã bầu
                              </span>
                            )}
                          </div>

                          <p className="text-xs text-indigo-600 font-semibold line-clamp-1 mt-0.5">{c.title}</p>
                          <p className="text-xs text-slate-600 line-clamp-2 mt-1.5">{c.bio}</p>
                        </div>

                        {/* Votes bar & detail link */}
                        <div className="pt-2 mt-2 border-t border-slate-100">
                          <div className="flex items-center justify-between text-xs mb-1">
                            <span className="font-bold text-slate-700">
                              {c.votesCount.toLocaleString('vi-VN')} phiếu
                            </span>
                            <span className="font-semibold text-slate-500">{percentage}%</span>
                          </div>

                          <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                            <div
                              className="bg-indigo-600 h-full rounded-full transition-all duration-500"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>

                          <div className="flex items-center justify-between pt-2">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                onOpenCandidateDetails(c);
                              }}
                              className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-0.5"
                            >
                              <span>Xem hồ sơ</span>
                              <ChevronRight className="w-3 h-3" />
                            </button>
                            <span className="text-[11px] text-slate-400">{c.organization || 'Thí sinh tự do'}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Bottom Sticky Action Bar */}
              <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="text-xs text-slate-500">
                  {hasVoted ? (
                    <span className="text-emerald-700 font-semibold">
                      Phiếu bầu của bạn đã được ghi nhận vào hệ thống an toàn.
                    </span>
                  ) : (
                    <span>
                      Vui lòng kiểm tra kỹ trước khi gửi phiếu. Mỗi cử tri chỉ được bỏ phiếu 01 lần.
                    </span>
                  )}
                </div>

                {!hasVoted && (
                  <button
                    disabled={selectedCandidateIds.length === 0}
                    onClick={handleStartVote}
                    className={`px-8 py-3 rounded-xl font-bold text-sm sm:text-base flex items-center gap-2 shadow-md transition-all ${
                      selectedCandidateIds.length > 0
                        ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white hover:from-indigo-700 hover:to-indigo-800 active:scale-95 cursor-pointer'
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    <Vote className="w-5 h-5" />
                    <span>Xác nhận gửi phiếu ({selectedCandidateIds.length})</span>
                  </button>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: LIVE REAL-TIME RESULTS */}
          {activeTab === 'results' && (
            <div className="space-y-6">
              {/* Podium for top 3 */}
              <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8">
                <div className="flex items-center justify-between pb-6 border-b border-white/10">
                  <div>
                    <h3 className="text-lg sm:text-xl font-black flex items-center gap-2">
                      <Trophy className="w-5 h-5 text-amber-400" />
                      Bảng Xếp Hạng Dẫn Đầu Thời Gian Thực
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Cập nhật trực tiếp theo thời gian thực từ máy chủ xác thực phiếu bầu
                    </p>
                  </div>
                  <button
                    onClick={handleExportExcel}
                    className="px-3.5 py-1.5 bg-emerald-600/90 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 border border-emerald-400/40 transition-colors shadow-xs cursor-pointer"
                  >
                    <FileSpreadsheet className="w-4 h-4" />
                    <span>Xuất File Excel (.xlsx)</span>
                  </button>
                </div>

                {/* Top 3 Visual Podium */}
                {sortedCandidates.length >= 3 && (
                  <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-6 items-end max-w-lg mx-auto">
                    {/* Rank 2 - Silver */}
                    <div className="text-center space-y-2">
                      <div className="relative inline-block">
                        <img
                          src={sortedCandidates[1].avatar}
                          alt={sortedCandidates[1].name}
                          className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover ring-2 ring-slate-300 mx-auto"
                        />
                        <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full text-[10px] font-black bg-slate-200 text-slate-800">
                          HẠNG 2
                        </span>
                      </div>
                      <div className="pt-2">
                        <div className="text-xs font-bold text-white truncate">{sortedCandidates[1].name}</div>
                        <div className="text-[11px] text-slate-400">
                          {sortedCandidates[1].votesCount.toLocaleString('vi-VN')} phiếu
                        </div>
                      </div>
                    </div>

                    {/* Rank 1 - Gold (Taller) */}
                    <div className="text-center space-y-2 -translate-y-4">
                      <div className="relative inline-block">
                        <img
                          src={sortedCandidates[0].avatar}
                          alt={sortedCandidates[0].name}
                          className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover ring-4 ring-amber-400 mx-auto shadow-xl"
                        />
                        <span className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full text-[10px] font-black bg-amber-400 text-slate-950 shadow-md">
                          QUÁN QUÂN
                        </span>
                      </div>
                      <div className="pt-2">
                        <div className="text-sm font-black text-amber-300 truncate">{sortedCandidates[0].name}</div>
                        <div className="text-xs font-bold text-white">
                          {sortedCandidates[0].votesCount.toLocaleString('vi-VN')} phiếu
                        </div>
                        <div className="text-[10px] text-amber-400 font-semibold">
                          {(
                            (sortedCandidates[0].votesCount / (poll.totalVotes || 1)) *
                            100
                          ).toFixed(1)}
                          %
                        </div>
                      </div>
                    </div>

                    {/* Rank 3 - Bronze */}
                    <div className="text-center space-y-2">
                      <div className="relative inline-block">
                        <img
                          src={sortedCandidates[2].avatar}
                          alt={sortedCandidates[2].name}
                          className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover ring-2 ring-amber-700/80 mx-auto"
                        />
                        <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full text-[10px] font-black bg-amber-700 text-amber-100">
                          HẠNG 3
                        </span>
                      </div>
                      <div className="pt-2">
                        <div className="text-xs font-bold text-white truncate">{sortedCandidates[2].name}</div>
                        <div className="text-[11px] text-slate-400">
                          {sortedCandidates[2].votesCount.toLocaleString('vi-VN')} phiếu
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Detailed Breakdown List */}
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-slate-700 uppercase tracking-wider">
                  Chi tiết tỉ lệ phiếu bầu tất cả ứng viên
                </h4>

                <div className="space-y-3">
                  {sortedCandidates.map((c, index) => {
                    const percentage = ((c.votesCount / (poll.totalVotes || 1)) * 100).toFixed(1);
                    return (
                      <div key={c.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span
                              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black ${
                                index === 0
                                  ? 'bg-amber-400 text-slate-900'
                                  : index === 1
                                  ? 'bg-slate-300 text-slate-900'
                                  : index === 2
                                  ? 'bg-amber-700 text-white'
                                  : 'bg-slate-200 text-slate-700'
                              }`}
                            >
                              {index + 1}
                            </span>
                            <img src={c.avatar} alt={c.name} className="w-9 h-9 rounded-xl object-cover" />
                            <div>
                              <div className="font-bold text-sm text-slate-900">{c.name}</div>
                              <div className="text-xs text-slate-500">{c.code} • {c.organization || 'Thí sinh'}</div>
                            </div>
                          </div>

                          <div className="text-right">
                            <div className="font-black text-indigo-600 text-sm">
                              {c.votesCount.toLocaleString('vi-VN')} phiếu
                            </div>
                            <div className="text-xs font-bold text-slate-500">{percentage}%</div>
                          </div>
                        </div>

                        {/* Bar */}
                        <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-700 ${
                              index === 0 ? 'bg-amber-500' : 'bg-indigo-600'
                            }`}
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: COMMENTS & CHEERING */}
          {activeTab === 'comments' && (
            <div className="space-y-6">
              {/* Form to add cheer */}
              <form onSubmit={handleSendComment} className="p-4 sm:p-5 rounded-2xl bg-indigo-50/60 border border-indigo-100 space-y-3">
                <div className="text-sm font-bold text-indigo-950 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-indigo-600" />
                  Gửi lời chúc & Cổ vũ ứng viên
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Tên của bạn (hoặc để trống để ẩn danh)"
                    value={newCommentAuthor}
                    onChange={(e) => setNewCommentAuthor(e.target.value)}
                    className="px-3.5 py-2 text-sm bg-white border border-slate-200 rounded-xl outline-none focus:border-indigo-500"
                  />
                  <select
                    value={commentTargetCandidate}
                    onChange={(e) => setCommentTargetCandidate(e.target.value)}
                    className="px-3.5 py-2 text-sm bg-white border border-slate-200 rounded-xl outline-none focus:border-indigo-500"
                  >
                    <option value="">Gửi lời cổ vũ chung cho cuộc bình chọn</option>
                    {poll.candidates.map((c) => (
                      <option key={c.id} value={c.id}>
                        Cổ vũ cho: {c.code} - {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex gap-2">
                  <textarea
                    rows={2}
                    placeholder="Viết lời nhắn động viên, nhận xét tích cực..."
                    value={newCommentContent}
                    onChange={(e) => setNewCommentContent(e.target.value)}
                    className="flex-1 px-3.5 py-2 text-sm bg-white border border-slate-200 rounded-xl outline-none focus:border-indigo-500 resize-none"
                  />
                  <button
                    type="submit"
                    className="px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold flex items-center justify-center shrink-0 transition-colors shadow-xs"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </form>

              {/* Comments Feed */}
              <div className="space-y-3">
                {poll.comments.length === 0 ? (
                  <div className="p-8 text-center text-slate-400 text-sm">
                    Chưa có lời cổ vũ nào. Hãy là người đầu tiên gửi lời chúc tốt đẹp!
                  </div>
                ) : (
                  poll.comments.map((cm) => (
                    <div key={cm.id} className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-xs">
                            {cm.author.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div className="font-bold text-sm text-slate-900">{cm.author}</div>
                            <div className="text-[11px] text-slate-400">{cm.timestamp}</div>
                          </div>
                        </div>

                        {cm.candidateName && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                            Cổ vũ {cm.candidateName}
                          </span>
                        )}
                      </div>

                      <p className="text-sm text-slate-700 pl-10 leading-relaxed">{cm.content}</p>

                      <div className="pl-10 pt-1 flex items-center gap-2">
                        <button
                          onClick={() => onLikeComment(poll.id, cm.id)}
                          className="flex items-center gap-1 text-xs text-slate-500 hover:text-rose-600 transition-colors"
                        >
                          <Heart className="w-3.5 h-3.5 text-rose-500" />
                          <span>{cm.likes}</span>
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* TAB 4: RULES & CRITERIA */}
          {activeTab === 'rules' && (
            <div className="space-y-6">
              <div className="space-y-3">
                <h3 className="text-base font-bold text-slate-900">Thể lệ và Quy định bình chọn</h3>
                <div className="space-y-2">
                  {poll.rules.map((rule, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-800">
                      <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span>{rule}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs text-amber-900 space-y-1.5">
                <div className="font-bold flex items-center gap-1.5 text-amber-950">
                  <AlertCircle className="w-4 h-4 text-amber-600" />
                  Cam kết bảo mật & Minh bạch hệ thống
                </div>
                <p>
                  Tất cả các lượt bình chọn đều được mã hóa và kiểm toán tự động. Mọi hành vi can thiệp bot, giả mạo IP sẽ bị hệ thống tự động loại bỏ để đảm bảo tính công bằng cao nhất cho tất cả các ứng viên.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 text-xs text-slate-600">
                <span className="font-bold text-slate-800">Đơn vị chủ trì & Tổ chức: </span>
                {poll.organizer.name} • Liên hệ: {poll.organizer.contact || 'support@webbinhchon.vn'}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* CONFIRMATION VOTING MODAL */}
      {showConfirmVoteModal && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl border border-slate-200 space-y-5">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center mx-auto shadow-sm">
                <Vote className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-slate-900">Xác nhận gửi phiếu bầu</h3>
              <p className="text-xs text-slate-500">
                Bạn chuẩn bị bỏ phiếu cho <span className="font-bold text-indigo-600">{selectedCandidateIds.length} ứng viên</span>:
              </p>
            </div>

            {/* Selected candidates list */}
            <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
              {poll.candidates
                .filter((c) => selectedCandidateIds.includes(c.id))
                .map((c) => (
                  <div key={c.id} className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                    <img src={c.avatar} alt={c.name} className="w-10 h-10 rounded-lg object-cover" />
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold text-amber-600">{c.code}</div>
                      <div className="text-xs font-bold text-slate-900 truncate">{c.name}</div>
                    </div>
                  </div>
                ))}
            </div>

            {/* Voter name input */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Họ và tên cử tri (tùy chọn)
              </label>
              <input
                type="text"
                placeholder="Nguyễn Văn A"
                value={voterName}
                onChange={(e) => setVoterName(e.target.value)}
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-600"
              />
            </div>

            {/* Anti-bot Math Challenge */}
            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-2">
              <div className="text-xs font-bold text-slate-700 flex items-center justify-between">
                <span>Xác minh chống gian lận (Anti-bot):</span>
                <span className="font-mono text-sm text-indigo-600 font-black">
                  {captchaNum1} + {captchaNum2} = ?
                </span>
              </div>
              <input
                type="number"
                placeholder="Nhập kết quả phép tính..."
                value={captchaAnswer}
                onChange={(e) => {
                  setCaptchaAnswer(e.target.value);
                  setCaptchaError(false);
                }}
                className={`w-full px-3 py-1.5 text-sm bg-white border rounded-xl outline-none ${
                  captchaError ? 'border-rose-500 ring-2 ring-rose-200' : 'border-slate-300 focus:border-indigo-500'
                }`}
              />
              {captchaError && (
                <div className="text-xs text-rose-600 font-semibold">Kết quả tính chưa chính xác, vui lòng thử lại!</div>
              )}
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowConfirmVoteModal(false)}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-sm font-bold hover:bg-slate-50 transition-colors"
              >
                Hủy bỏ
              </button>
              <button
                type="button"
                disabled={isSubmitting || !captchaAnswer}
                onClick={handleFinalVote}
                className="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold shadow-md transition-all active:scale-95 disabled:bg-slate-300"
              >
                {isSubmitting ? 'Đang gửi phiếu...' : 'Gửi phiếu ngay'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
