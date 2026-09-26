import React, { useState } from 'react';
import { Poll } from '../types/vote';
import * as XLSX from 'xlsx';
import { Trophy, TrendingUp, Users, CheckCircle2, ShieldCheck, Flame, ArrowUpRight, FileSpreadsheet } from 'lucide-react';

interface LeaderboardViewProps {
  polls: Poll[];
  onSelectPoll: (poll: Poll) => void;
}

export const LeaderboardView: React.FC<LeaderboardViewProps> = ({ polls, onSelectPoll }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredPolls = selectedCategory === 'all'
    ? polls
    : polls.filter((p) => p.category === selectedCategory);

  // Flatten all candidates with their poll context
  const allCandidatesWithPoll = filteredPolls.flatMap((p) =>
    p.candidates.map((c) => ({
      ...c,
      pollTitle: p.title,
      pollSlug: p.slug,
      pollCategory: p.category,
      parentPoll: p,
      pollTotalVotes: p.totalVotes,
    }))
  );

  // Sort descending by votes
  allCandidatesWithPoll.sort((a, b) => b.votesCount - a.votesCount);

  const top10 = allCandidatesWithPoll.slice(0, 10);
  const totalVotesAcrossAll = polls.reduce((sum, p) => sum + p.totalVotes, 0);

  const handleExportAllToExcel = () => {
    const data = allCandidatesWithPoll.map((c, index) => ({
      'Hạng Toàn Hệ Thống': index + 1,
      'Mã NV / SBD': c.code,
      'Họ và Tên': c.name,
      'Chức Danh / Vị Trí': c.title,
      'Đơn Vị': c.organization || 'N/A',
      'Cuộc Bình Chọn': c.pollTitle,
      'Số Phiếu Nhận Được': c.votesCount,
      'Tỷ Lệ % Cuộc Thi': `${((c.votesCount / (c.pollTotalVotes || 1)) * 100).toFixed(1)}%`,
    }));

    const ws = XLSX.utils.json_to_sheet(data);
    ws['!cols'] = [
      { wch: 20 },
      { wch: 15 },
      { wch: 25 },
      { wch: 30 },
      { wch: 20 },
      { wch: 35 },
      { wch: 20 },
      { wch: 15 },
    ];

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Bang_Xep_Hang_Tong_Hop');
    XLSX.writeFile(wb, `Bao_Cao_Xep_Hang_Binh_Chon_${new Date().toISOString().slice(0, 10)}.xlsx`);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Banner Stats */}
      <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-10 text-white relative overflow-hidden border border-indigo-900/50 shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30">
              <Trophy className="w-3.5 h-3.5 text-amber-400" />
              Bảng Tổng Sắp Minh Bạch Toàn Hệ Thống
            </span>
            <h2 className="text-2xl sm:text-4xl font-black">Xếp Hạng & Thống Kê Phiếu Bầu</h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              Theo dõi biến động và thứ hạng các ứng viên, dự án được cộng đồng tín nhiệm nhiều nhất trên toàn hệ thống WebBinhChon.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-white/5 backdrop-blur-md p-4 rounded-2xl border border-white/10">
            <div className="text-center p-2">
              <div className="text-2xl sm:text-3xl font-black text-amber-400">
                {totalVotesAcrossAll.toLocaleString('vi-VN')}
              </div>
              <div className="text-[11px] text-slate-400">Tổng phiếu bầu</div>
            </div>
            <div className="text-center p-2">
              <div className="text-2xl sm:text-3xl font-black text-indigo-400">{polls.length}</div>
              <div className="text-[11px] text-slate-400">Cuộc bình chọn</div>
            </div>
            <div className="text-center p-2 col-span-2 sm:col-span-1">
              <div className="text-2xl sm:text-3xl font-black text-emerald-400">100%</div>
              <div className="text-[11px] text-slate-400">Kiểm toán thực</div>
            </div>
          </div>
        </div>
      </div>

      {/* Category filter */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {[
          { id: 'all', label: 'Tất Cả Chuyên Mục' },
          { id: 'awards', label: 'Giải Thưởng & Danh Hiệu' },
          { id: 'tech', label: 'Công Nghệ & Khởi Nghiệp' },
          { id: 'culture', label: 'Văn Hóa & Ẩm Thực' },
          { id: 'contest', label: 'Cuộc Thi Nội Bộ' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedCategory(tab.id)}
            className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-xl whitespace-nowrap transition-colors cursor-pointer ${
              selectedCategory === tab.id
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Top 10 Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-5 sm:p-6 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-amber-500" />
            <h3 className="font-black text-lg text-slate-900">Top 10 Ứng Viên / Dự Án Được Bỏ Phiếu Nhiều Nhất</h3>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleExportAllToExcel}
              className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 shadow-2xs cursor-pointer"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>Xuất Báo Cáo Excel (.xlsx)</span>
            </button>
            <span className="text-xs text-slate-400 font-semibold hidden sm:inline">
              Cập nhật tức thời
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-bold border-b border-slate-200">
              <tr>
                <th className="py-3.5 px-4 sm:px-6">Hạng</th>
                <th className="py-3.5 px-4">Ứng viên / Dự án</th>
                <th className="py-3.5 px-4 hidden md:table-cell">Cuộc bình chọn</th>
                <th className="py-3.5 px-4 text-right">Số phiếu bầu</th>
                <th className="py-3.5 px-4 sm:px-6 text-right">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {top10.map((cand, index) => {
                const percentageOfPoll = ((cand.votesCount / (cand.pollTotalVotes || 1)) * 100).toFixed(1);
                return (
                  <tr key={cand.id} className="hover:bg-slate-50/80 transition-colors">
                    {/* Rank */}
                    <td className="py-4 px-4 sm:px-6">
                      <span
                        className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black ${
                          index === 0
                            ? 'bg-amber-400 text-slate-950 shadow-xs'
                            : index === 1
                            ? 'bg-slate-300 text-slate-950'
                            : index === 2
                            ? 'bg-amber-700 text-amber-100'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {index + 1}
                      </span>
                    </td>

                    {/* Candidate */}
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={cand.avatar}
                          alt={cand.name}
                          className="w-11 h-11 rounded-xl object-cover ring-1 ring-slate-200"
                        />
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-[10px] font-black px-1.5 py-0.5 rounded bg-amber-100 text-amber-800">
                              {cand.code}
                            </span>
                            <span className="font-bold text-slate-900">{cand.name}</span>
                          </div>
                          <div className="text-xs text-slate-500 truncate max-w-xs">{cand.title}</div>
                        </div>
                      </div>
                    </td>

                    {/* Poll */}
                    <td className="py-4 px-4 hidden md:table-cell">
                      <span className="text-xs font-semibold text-slate-700 line-clamp-1">
                        {cand.pollTitle}
                      </span>
                    </td>

                    {/* Votes Count */}
                    <td className="py-4 px-4 text-right">
                      <div className="font-black text-indigo-600 sm:text-base">
                        {cand.votesCount.toLocaleString('vi-VN')}
                      </div>
                      <div className="text-[11px] text-slate-400 font-semibold">{percentageOfPoll}% phiếu của bảng</div>
                    </td>

                    {/* Action */}
                    <td className="py-4 px-4 sm:px-6 text-right">
                      <button
                        onClick={() => onSelectPoll(cand.parentPoll)}
                        className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-xl text-xs font-bold transition-colors inline-flex items-center gap-1 cursor-pointer"
                      >
                        <span>Bình chọn</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
