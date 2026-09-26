import React from 'react';
import { Poll } from '../types/vote';
import { Users, Clock, ShieldCheck, Lock, CheckCircle, ChevronRight } from 'lucide-react';

interface PollCardProps {
  poll: Poll;
  hasVoted: boolean;
  onSelect: (poll: Poll) => void;
}

export const PollCard: React.FC<PollCardProps> = ({ poll, hasVoted, onSelect }) => {
  const getCategoryLabel = (cat: string) => {
    switch (cat) {
      case 'awards':
        return { label: 'Giải Thưởng & Danh Hiệu', color: 'bg-amber-100 text-amber-800 border-amber-200' };
      case 'tech':
        return { label: 'Công Nghệ & Khởi Nghiệp', color: 'bg-indigo-100 text-indigo-800 border-indigo-200' };
      case 'culture':
        return { label: 'Văn Hóa & Ẩm Thực', color: 'bg-rose-100 text-rose-800 border-rose-200' };
      case 'contest':
        return { label: 'Cuộc Thi & Nội Bộ', color: 'bg-emerald-100 text-emerald-800 border-emerald-200' };
      default:
        return { label: 'Khảo Sát Ý Kiến', color: 'bg-slate-100 text-slate-800 border-slate-200' };
    }
  };

  const catInfo = getCategoryLabel(poll.category);

  // Find top candidate
  const sortedCandidates = [...poll.candidates].sort((a, b) => b.votesCount - a.votesCount);
  const leadingCandidate = sortedCandidates[0];

  const formattedDeadline = new Date(poll.endDate).toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  return (
    <div
      onClick={() => onSelect(poll)}
      className="group bg-white rounded-2xl border border-slate-200/90 hover:border-indigo-400 shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col cursor-pointer hover:-translate-y-1"
    >
      {/* Banner / Cover */}
      <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-900">
        <img
          src={poll.bannerUrl}
          alt={poll.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/30" />

        {/* Badges on Banner */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${catInfo.color} shadow-xs backdrop-blur-md`}>
            {catInfo.label}
          </span>
          {poll.accessType === 'pin_protected' && (
            <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-900/80 text-amber-300 border border-amber-500/40 backdrop-blur-md">
              <Lock className="w-3 h-3" />
              Mã PIN
            </span>
          )}
        </div>

        {/* Bottom Banner Info */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
          <div className="flex items-center gap-1.5 text-xs font-semibold bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-lg">
            <Users className="w-3.5 h-3.5 text-indigo-300" />
            <span>{poll.totalVotes.toLocaleString('vi-VN')} phiếu</span>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-slate-200 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-lg">
            <Clock className="w-3.5 h-3.5 text-amber-300" />
            <span>Đến {formattedDeadline}</span>
          </div>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
              {poll.organizer.name}
            </span>
            {hasVoted && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                <CheckCircle className="w-3 h-3 text-emerald-600" />
                Đã bình chọn
              </span>
            )}
          </div>

          <h3 className="font-bold text-lg text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-2 leading-snug">
            {poll.title}
          </h3>

          <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
            {poll.shortDescription}
          </p>
        </div>

        {/* Leading Candidate Snippet */}
        {leadingCandidate && (
          <div className="bg-slate-50 rounded-xl p-2.5 border border-slate-100 flex items-center gap-3">
            <img
              src={leadingCandidate.avatar}
              alt={leadingCandidate.name}
              className="w-10 h-10 rounded-lg object-cover ring-1 ring-slate-200"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-amber-600">Đang dẫn đầu:</span>
                <span className="text-[11px] font-bold text-indigo-600">
                  {((leadingCandidate.votesCount / (poll.totalVotes || 1)) * 100).toFixed(0)}%
                </span>
              </div>
              <p className="text-xs font-semibold text-slate-800 truncate">{leadingCandidate.name}</p>
            </div>
          </div>
        )}

        {/* Footer info & CTA */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs text-slate-500 font-medium">
            {poll.candidates.length} ứng viên / lựa chọn
          </span>
          <span className="text-xs font-bold text-indigo-600 group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
            Chi tiết & Bình chọn
            <ChevronRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </div>
  );
};
