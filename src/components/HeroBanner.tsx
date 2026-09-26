import React, { useState, useEffect } from 'react';
import { Poll } from '../types/vote';
import { ShieldCheck, Flame, Users, Clock, Award, ArrowRight } from 'lucide-react';

interface HeroBannerProps {
  featuredPoll?: Poll;
  totalVotesAll: number;
  totalPollsCount: number;
  onSelectPoll: (poll: Poll) => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  featuredPoll,
  totalVotesAll,
  totalPollsCount,
  onSelectPoll,
}) => {
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    if (!featuredPoll) return;

    const calculateTime = () => {
      const difference = +new Date(featuredPoll.endDate) - +new Date();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [featuredPoll]);

  if (!featuredPoll) return null;

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-10 my-6 shadow-2xl border border-indigo-900/50">
      {/* Background ambient decorative shapes */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 -mb-20 w-80 h-80 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Info & Action */}
        <div className="lg:col-span-7 space-y-5">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              Sự Kiện Tâm Điểm 2026
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Minh bạch 100%
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight sm:leading-tight">
            {featuredPoll.title}
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed line-clamp-3">
            {featuredPoll.shortDescription}
          </p>

          {/* Countdown Clock */}
          <div className="pt-2">
            <div className="text-xs uppercase font-bold tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              Thời gian bình chọn còn lại
            </div>
            <div className="grid grid-cols-4 gap-2 sm:gap-3 max-w-sm">
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-2 sm:p-2.5 text-center border border-white/10">
                <div className="text-xl sm:text-2xl font-black text-amber-400">{timeLeft.days}</div>
                <div className="text-[10px] sm:text-xs text-slate-300 font-medium">Ngày</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-2 sm:p-2.5 text-center border border-white/10">
                <div className="text-xl sm:text-2xl font-black text-amber-400">{timeLeft.hours}</div>
                <div className="text-[10px] sm:text-xs text-slate-300 font-medium">Giờ</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-2 sm:p-2.5 text-center border border-white/10">
                <div className="text-xl sm:text-2xl font-black text-amber-400">{timeLeft.minutes}</div>
                <div className="text-[10px] sm:text-xs text-slate-300 font-medium">Phút</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-2 sm:p-2.5 text-center border border-white/10">
                <div className="text-xl sm:text-2xl font-black text-amber-400">{timeLeft.seconds}</div>
                <div className="text-[10px] sm:text-xs text-slate-300 font-medium">Giây</div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => onSelectPoll(featuredPoll)}
              className="px-6 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black rounded-xl shadow-lg shadow-amber-500/25 transition-all flex items-center gap-2 active:scale-95 text-sm sm:text-base cursor-pointer"
            >
              <span>Bình chọn ngay</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>
            <button
              onClick={() => onSelectPoll(featuredPoll)}
              className="px-5 py-3.5 bg-white/10 hover:bg-white/15 text-white font-bold rounded-xl border border-white/15 transition-all text-sm sm:text-base cursor-pointer"
            >
              Xem danh sách ứng viên ({featuredPoll.candidates.length})
            </button>
          </div>
        </div>

        {/* Right Column: Visual Showcase & Stats */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-800/80 backdrop-blur-md border border-white/10 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="text-xs uppercase font-bold tracking-wider text-slate-400">Ứng viên dẫn đầu</span>
              <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-indigo-500/30 text-indigo-300 border border-indigo-400/30">
                Hạng 1
              </span>
            </div>

            {featuredPoll.candidates[0] && (
              <div className="flex items-center gap-4">
                <img
                  src={featuredPoll.candidates[0].avatar}
                  alt={featuredPoll.candidates[0].name}
                  className="w-16 h-16 rounded-xl object-cover ring-2 ring-amber-400 shadow-md"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-amber-400">{featuredPoll.candidates[0].code}</span>
                  </div>
                  <h4 className="text-base font-bold text-white truncate">{featuredPoll.candidates[0].name}</h4>
                  <p className="text-xs text-slate-400 truncate">{featuredPoll.candidates[0].title}</p>
                  <div className="mt-1 flex items-center justify-between text-xs">
                    <span className="text-indigo-300 font-bold">
                      {featuredPoll.candidates[0].votesCount.toLocaleString('vi-VN')} phiếu
                    </span>
                    <span className="text-slate-400">
                      {((featuredPoll.candidates[0].votesCount / (featuredPoll.totalVotes || 1)) * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Quick platform stats */}
            <div className="grid grid-cols-3 gap-2 pt-3 border-t border-white/10 text-center">
              <div>
                <div className="text-lg font-black text-white">{totalVotesAll.toLocaleString('vi-VN')}</div>
                <div className="text-[10px] text-slate-400 font-medium">Tổng lượt bầu</div>
              </div>
              <div>
                <div className="text-lg font-black text-white">{totalPollsCount}</div>
                <div className="text-[10px] text-slate-400 font-medium">Cuộc bình chọn</div>
              </div>
              <div>
                <div className="text-lg font-black text-emerald-400">100%</div>
                <div className="text-[10px] text-slate-400 font-medium">Khách quan</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
