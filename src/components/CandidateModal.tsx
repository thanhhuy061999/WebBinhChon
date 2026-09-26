import React from 'react';
import { Candidate } from '../types/vote';
import { X, Award, CheckCircle2, Building, Vote, ThumbsUp } from 'lucide-react';

interface CandidateModalProps {
  candidate: Candidate | null;
  onClose: () => void;
  onVoteForThisCandidate: (candidateId: string) => void;
  hasVotedForThis: boolean;
  totalPollVotes: number;
}

export const CandidateModal: React.FC<CandidateModalProps> = ({
  candidate,
  onClose,
  onVoteForThisCandidate,
  hasVotedForThis,
  totalPollVotes,
}) => {
  if (!candidate) return null;

  const percentage = ((candidate.votesCount / (totalPollVotes || 1)) * 100).toFixed(1);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto animate-fadeIn">
      <div className="relative bg-white rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden border border-slate-100 my-8">
        {/* Header with image */}
        <div className="relative h-64 sm:h-72 w-full bg-slate-900">
          <img
            src={candidate.avatar}
            alt={candidate.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* SBD Badge */}
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1.5 rounded-full text-xs font-black bg-amber-400 text-slate-950 shadow-md">
              {candidate.code}
            </span>
          </div>

          {/* Candidate Name & Title on Banner */}
          <div className="absolute bottom-4 left-6 right-6 text-white space-y-1">
            <h2 className="text-2xl sm:text-3xl font-black">{candidate.name}</h2>
            <p className="text-sm text-slate-300 font-medium">{candidate.title}</p>
            {candidate.organization && (
              <div className="flex items-center gap-1.5 text-xs text-indigo-300 pt-0.5">
                <Building className="w-3.5 h-3.5" />
                <span>{candidate.organization}</span>
              </div>
            )}
          </div>
        </div>

        {/* Body content */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Vote statistics row */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 flex items-center justify-between">
            <div>
              <div className="text-xs text-slate-500 font-medium">Tổng số phiếu hiện tại</div>
              <div className="text-2xl font-black text-indigo-600">
                {candidate.votesCount.toLocaleString('vi-VN')} <span className="text-sm font-normal text-slate-500">phiếu</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs text-slate-500 font-medium">Tỷ lệ bình chọn</div>
              <div className="text-2xl font-black text-amber-500">{percentage}%</div>
            </div>
          </div>

          {/* Biography */}
          <div className="space-y-2">
            <h3 className="text-sm uppercase font-bold text-slate-400 tracking-wider">Tiểu sử & Giới thiệu</h3>
            <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
              {candidate.bio}
            </p>
          </div>

          {/* Highlight Achievements */}
          {candidate.highlightAchievements && candidate.highlightAchievements.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm uppercase font-bold text-slate-400 tracking-wider flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-500" />
                Thành tích & Dấu ấn nổi bật
              </h3>
              <div className="space-y-2">
                {candidate.highlightAchievements.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-indigo-50/60 border border-indigo-100 text-xs sm:text-sm text-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-sm font-bold hover:bg-slate-50 transition-colors"
            >
              Đóng
            </button>
            <button
              onClick={() => {
                onVoteForThisCandidate(candidate.id);
                onClose();
              }}
              className={`px-6 py-2.5 rounded-xl text-sm font-bold shadow-md transition-all flex items-center gap-2 ${
                hasVotedForThis
                  ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white'
              }`}
            >
              <Vote className="w-4 h-4" />
              <span>{hasVotedForThis ? 'Đã chọn ứng viên này' : 'Bình chọn cho ứng viên'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
