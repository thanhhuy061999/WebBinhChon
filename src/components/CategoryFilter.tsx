import React from 'react';
import { Sparkles, Trophy, BarChart3, Calendar, Filter, Flame, Clock, Users } from 'lucide-react';
import { PollCategory, PollStatus } from '../types';

interface CategoryFilterProps {
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  selectedStatus: string;
  onSelectStatus: (status: string) => void;
  sortBy: 'popular' | 'votes' | 'newest' | 'endingSoon';
  onSelectSort: (sort: 'popular' | 'votes' | 'newest' | 'endingSoon') => void;
  lang: 'vi' | 'en';
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onSelectCategory,
  selectedStatus,
  onSelectStatus,
  sortBy,
  onSelectSort,
  lang,
}) => {
  const t = {
    vi: {
      allCategories: 'Tất Cả Thể Loại',
      contest: 'Cuộc Thi & Tài Năng',
      award: 'Giải Thưởng Danh Dự',
      poll: 'Khảo Sát & Ý Kiến',
      event: 'Sự Kiện & Chung Kết',
      statusAll: 'Tất cả trạng thái',
      statusActive: 'Đang diễn ra',
      statusClosed: 'Đã kết thúc',
      sortPopular: 'Nổi bật nhất',
      sortVotes: 'Nhiều phiếu nhất',
      sortNewest: 'Mới nhất',
      sortEndingSoon: 'Sắp đóng bình chọn',
    },
    en: {
      allCategories: 'All Categories',
      contest: 'Contests & Talents',
      award: 'Honorary Awards',
      poll: 'Polls & Surveys',
      event: 'Events & Finals',
      statusAll: 'All Statuses',
      statusActive: 'Active Now',
      statusClosed: 'Closed',
      sortPopular: 'Most Popular',
      sortVotes: 'Most Votes',
      sortNewest: 'Newest',
      sortEndingSoon: 'Ending Soon',
    },
  }[lang];

  const categories = [
    { id: 'all', label: t.allCategories, icon: Sparkles },
    { id: 'contest', label: t.contest, icon: Trophy },
    { id: 'award', label: t.award, icon: Flame },
    { id: 'poll', label: t.poll, icon: BarChart3 },
    { id: 'event', label: t.event, icon: Calendar },
  ];

  return (
    <div className="space-y-4">
      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all select-none ${
                isSelected
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25 scale-[1.02]'
                  : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200/80 shadow-2xs'
              }`}
            >
              <Icon className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-slate-500'}`} />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Sub filters & Sorting row */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
        {/* Status Pill filters */}
        <div className="flex items-center gap-1.5 bg-slate-100/90 p-1 rounded-xl border border-slate-200/70 text-xs font-semibold">
          {[
            { id: 'all', label: t.statusAll },
            { id: 'active', label: t.statusActive },
            { id: 'closed', label: t.statusClosed },
          ].map((st) => (
            <button
              key={st.id}
              onClick={() => onSelectStatus(st.id)}
              className={`px-3 py-1.5 rounded-lg transition ${
                selectedStatus === st.id
                  ? 'bg-white text-indigo-700 font-bold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {st.label}
            </button>
          ))}
        </div>

        {/* Sorting Dropdown */}
        <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <span>Sắp xếp:</span>
          <select
            value={sortBy}
            onChange={(e) => onSelectSort(e.target.value as any)}
            className="bg-white border border-slate-200 text-slate-800 text-xs font-semibold rounded-lg px-2.5 py-1.5 outline-none focus:border-indigo-500 shadow-2xs"
          >
            <option value="popular">{t.sortPopular}</option>
            <option value="votes">{t.sortVotes}</option>
            <option value="newest">{t.sortNewest}</option>
            <option value="endingSoon">{t.sortEndingSoon}</option>
          </select>
        </div>
      </div>
    </div>
  );
};
