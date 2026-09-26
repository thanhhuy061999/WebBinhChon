import React from 'react';
import { X, CheckCircle, Award, Sparkles, Heart, Share2, Star } from 'lucide-react';
import { Candidate, Poll } from '../types';

interface CandidateDetailModalProps {
  candidate: Candidate;
  poll: Poll;
  onClose: () => void;
  onVote: (candidate: Candidate) => void;
  hasVoted: boolean;
  lang: 'vi' | 'en';
}

export const CandidateDetailModal: React.FC<CandidateDetailModalProps> = ({
  candidate,
  poll,
  onClose,
  onVote,
  hasVoted,
  lang,
}) => {
  const t = {
    vi: {
      candidateCode: 'Mã số bình chọn',
      voteCount: 'Lượt bình chọn hiện tại',
      votePercentage: 'Tỷ lệ phiếu',
      highlights: 'Thành tích & Dấu ấn tiêu biểu',
      bio: 'Tiểu sử & Câu chuyện truyền cảm hứng',
      voteBtn: 'Bình chọn cho ứng viên này',
      alreadyVoted: 'Bạn đã bình chọn',
      pollClosed: 'Cuộc bình chọn đã kết thúc',
      shareCandidate: 'Chia sẻ hồ sơ',
    },
    en: {
      candidateCode: 'Candidate Code',
      voteCount: 'Current Verified Votes',
      votePercentage: 'Vote Share',
      highlights: 'Key Achievements & Milestones',
      bio: 'Biography & Inspirational Story',
      voteBtn: 'Vote For This Candidate',
      alreadyVoted: 'Already Voted',
      pollClosed: 'Poll is closed',
      shareCandidate: 'Share Profile',
    },
  }[lang];

  const totalVotes = poll.totalVotes || 1;
  const percentage = Math.round((candidate.votes / totalVotes) * 100);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-white rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Cover Image & Close Button */}
        <div className="relative h-48 sm:h-56 w-full bg-slate-900">
          <img
            src={candidate.coverImage || poll.banner}
            alt={candidate.name}
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/40 to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-sm transition"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Candidate Code Pill */}
          <div className="absolute top-4 left-4 bg-indigo-600/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-black tracking-wider uppercase flex items-center gap-1.5 shadow-md">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>{candidate.code}</span>
          </div>

          {/* Header Info Overlay */}
          <div className="absolute bottom-4 left-4 right-4 flex items-end gap-4">
            <div className="relative">
              <img
                src={candidate.avatar}
                alt={candidate.name}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-3 border-white shadow-xl"
              />
            </div>
            <div className="min-w-0 text-white pb-1">
              <h2 className="text-xl sm:text-2xl font-black truncate">{candidate.name}</h2>
              <p className="text-xs sm:text-sm text-indigo-200 line-clamp-1">{candidate.organization}</p>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-6">
          
          {/* Quick Metrics */}
          <div className="grid grid-cols-2 gap-3 p-3.5 rounded-2xl bg-indigo-50/70 border border-indigo-100">
            <div>
              <p className="text-xs text-indigo-600 font-semibold">{t.voteCount}</p>
              <p className="text-xl font-black text-indigo-950 mt-0.5">
                {candidate.votes.toLocaleString()} <span className="text-xs font-semibold text-slate-500">phiếu</span>
              </p>
            </div>
            <div>
              <p className="text-xs text-indigo-600 font-semibold">{t.votePercentage}</p>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-xl font-black text-indigo-950">{percentage}%</span>
                <div className="flex-1 h-2 bg-indigo-200/70 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-indigo-600 rounded-full transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Bio */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-indigo-500" />
              {t.bio}
            </h4>
            <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100">
              {candidate.bio}
            </p>
          </div>

          {/* Highlights */}
          {candidate.highlights && candidate.highlights.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-500" />
                {t.highlights}
              </h4>
              <ul className="space-y-2">
                {candidate.highlights.map((h, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 bg-white p-2.5 rounded-xl border border-slate-200/80 shadow-2xs"
                  >
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Action Button */}
          <div className="pt-2 flex items-center gap-3">
            <button
              onClick={() => {
                if (poll.status === 'active' && !hasVoted) {
                  onVote(candidate);
                }
              }}
              disabled={poll.status !== 'active' || hasVoted}
              className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-md transition ${
                hasVoted
                  ? 'bg-emerald-100 text-emerald-700 cursor-not-allowed border border-emerald-200'
                  : poll.status !== 'active'
                  ? 'bg-slate-200 text-slate-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white shadow-indigo-500/25 active:scale-98'
              }`}
            >
              <Heart className={`w-4 h-4 ${hasVoted ? 'fill-emerald-600 text-emerald-600' : 'fill-white text-white'}`} />
              <span>
                {hasVoted ? t.alreadyVoted : poll.status !== 'active' ? t.pollClosed : t.voteBtn}
              </span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
