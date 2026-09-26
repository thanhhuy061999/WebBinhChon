import React, { useState } from 'react';
import { Poll, Candidate, PollCategory } from '../types/vote';
import { X, Plus, Trash2, Image, Shield, Calendar, ListPlus, Sparkles } from 'lucide-react';

interface CreatePollModalProps {
  onClose: () => void;
  onCreate: (newPoll: Poll) => void;
}

export const CreatePollModal: React.FC<CreatePollModalProps> = ({ onClose, onCreate }) => {
  const [title, setTitle] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [category, setCategory] = useState<PollCategory>('awards');
  const [bannerUrl, setBannerUrl] = useState(
    'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80'
  );
  const [maxChoices, setMaxChoices] = useState<number>(1);
  const [accessType, setAccessType] = useState<'public' | 'pin_protected'>('public');
  const [pinCode, setPinCode] = useState('');
  const [organizerName, setOrganizerName] = useState('Ban Tổ Chức');
  const [organizerContact, setOrganizerContact] = useState('');
  const [endDate, setEndDate] = useState('2026-11-30');

  // Candidate items
  const [candidates, setCandidates] = useState<Array<{ name: string; title: string; avatar: string; bio: string; code: string; organization: string }>>([
    {
      code: 'SBD-01',
      name: 'Ứng viên số 1',
      title: 'Đại diện tiêu biểu khối sáng tạo',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      bio: 'Có nhiều đóng góp nổi bật trong các hoạt động phong trào và dự án cộng đồng.',
      organization: 'Đơn vị A',
    },
    {
      code: 'SBD-02',
      name: 'Ứng viên số 2',
      title: 'Kỹ sư nghiên cứu xuất sắc',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      bio: 'Đạt thành tích giải thưởng quốc gia và sáng kiến cải tiến kỹ thuật.',
      organization: 'Đơn vị B',
    },
  ]);

  const addCandidate = () => {
    const nextIndex = candidates.length + 1;
    setCandidates([
      ...candidates,
      {
        code: `SBD-0${nextIndex}`,
        name: `Ứng viên số ${nextIndex}`,
        title: 'Chuyên gia / Dự án tiêu biểu',
        avatar: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80`,
        bio: 'Mô tả tóm tắt năng lực và thành tựu của ứng viên.',
        organization: 'Tổ chức / Đơn vị',
      },
    ]);
  };

  const removeCandidate = (idx: number) => {
    if (candidates.length <= 2) return;
    setCandidates(candidates.filter((_, i) => i !== idx));
  };

  const updateCandidate = (index: number, field: string, value: string) => {
    const updated = [...candidates];
    updated[index] = { ...updated[index], [field]: value };
    setCandidates(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const formattedCandidates: Candidate[] = candidates.map((c, i) => ({
      id: `c-custom-${Date.now()}-${i}`,
      code: c.code.trim() || `SBD-${i + 1}`,
      name: c.name.trim() || `Ứng viên ${i + 1}`,
      title: c.title.trim() || 'Ứng cử viên',
      avatar: c.avatar.trim() || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80',
      bio: c.bio.trim() || 'Tiểu sử ứng viên',
      organization: c.organization.trim(),
      votesCount: 0,
      highlightAchievements: ['Ứng viên chính thức được phê duyệt'],
    }));

    const newPoll: Poll = {
      id: `poll-${Date.now()}`,
      slug: title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, ''),
      title: title.trim(),
      shortDescription: shortDescription.trim() || title.trim(),
      description: shortDescription.trim() || title.trim(),
      bannerUrl,
      category,
      status: 'active',
      startDate: new Date().toISOString(),
      endDate: new Date(endDate).toISOString(),
      maxChoices,
      minChoices: 1,
      totalVotes: 0,
      totalVoters: 0,
      isFeatured: false,
      accessType,
      pinCode: accessType === 'pin_protected' ? pinCode.toUpperCase().trim() : undefined,
      showRealtimeResults: true,
      allowComments: true,
      rules: [
        'Mỗi cử tri được phép bỏ phiếu theo số lượng lựa chọn quy định.',
        'Hệ thống tự động xác thực và ngăn chặn phiếu trùng lặp.',
        'Kết quả hiển thị minh bạch công khai.',
      ],
      organizer: {
        name: organizerName.trim() || 'Ban Tổ Chức',
        verified: true,
        contact: organizerContact.trim() || undefined,
      },
      candidates: formattedCandidates,
      comments: [],
    };

    onCreate(newPoll);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto animate-fadeIn">
      <div className="relative bg-white rounded-3xl max-w-3xl w-full shadow-2xl overflow-hidden border border-slate-200 my-4 sm:my-8 flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-xs">
              <ListPlus className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-900">Khởi Tạo Cuộc Bình Chọn Mới</h2>
              <p className="text-xs text-slate-500">Thiết lập giải thưởng, cuộc thi hoặc thăm dò ý kiến trực tuyến</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-200 text-slate-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-7 space-y-6 overflow-y-auto flex-1">
          {/* General Information */}
          <div className="space-y-4">
            <h3 className="text-xs uppercase font-bold tracking-wider text-slate-400">1. Thông tin chung</h3>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Tiêu đề cuộc bình chọn <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="Ví dụ: Bình chọn Nhân viên Xuất Sắc Quý 4 / Giải Thưởng Nhiếp Ảnh Trẻ"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-600 focus:bg-white transition-all font-semibold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Mô tả tóm tắt</label>
              <textarea
                rows={2}
                placeholder="Mô tả mục đích, ý nghĩa và phạm vi của cuộc bình chọn..."
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
                className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-600 focus:bg-white transition-all resize-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Chuyên mục</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as PollCategory)}
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-600"
                >
                  <option value="awards">Giải Thưởng & Danh Hiệu</option>
                  <option value="tech">Công Nghệ & Khởi Nghiệp</option>
                  <option value="culture">Văn Hóa & Ẩm Thực</option>
                  <option value="contest">Cuộc Thi & Phong Trào</option>
                  <option value="polls">Khảo Sát Ý Kiến Chung</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Ngày kết thúc nhận phiếu</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Số lượt chọn tối đa cho 1 cử tri</label>
                <select
                  value={maxChoices}
                  onChange={(e) => setMaxChoices(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-600"
                >
                  <option value={1}>1 lựa chọn (Đơn tuyển)</option>
                  <option value={2}>Tối đa 2 lựa chọn</option>
                  <option value={3}>Tối đa 3 lựa chọn</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Quyền truy cập</label>
                <select
                  value={accessType}
                  onChange={(e) => setAccessType(e.target.value as 'public' | 'pin_protected')}
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-600"
                >
                  <option value="public">Công khai (Tất cả mọi người)</option>
                  <option value="pin_protected">Nội bộ (Yêu cầu mã PIN)</option>
                </select>
              </div>
            </div>

            {accessType === 'pin_protected' && (
              <div>
                <label className="block text-xs font-bold text-amber-800 mb-1">Mã PIN bảo mật cho cử tri</label>
                <input
                  type="text"
                  placeholder="Ví dụ: PIN2026"
                  value={pinCode}
                  onChange={(e) => setPinCode(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm bg-amber-50 border border-amber-300 rounded-xl font-mono uppercase font-bold outline-none"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Tên đơn vị tổ chức</label>
              <input
                type="text"
                placeholder="Ban Chấp Hành Đoàn / Công ty TNHH XYZ"
                value={organizerName}
                onChange={(e) => setOrganizerName(e.target.value)}
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-600"
              />
            </div>
          </div>

          {/* Candidate / Options List */}
          <div className="space-y-4 pt-4 border-t border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xs uppercase font-bold tracking-wider text-slate-400">
                  2. Danh sách ứng cử viên / Dự án ({candidates.length})
                </h3>
                <p className="text-xs text-slate-500">Tối thiểu 2 ứng viên cho mỗi cuộc bình chọn</p>
              </div>
              <button
                type="button"
                onClick={addCandidate}
                className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-xl text-xs font-bold flex items-center gap-1 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Thêm ứng viên</span>
              </button>
            </div>

            <div className="space-y-3">
              {candidates.map((cand, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-indigo-700">Ứng viên #{idx + 1}</span>
                    {candidates.length > 2 && (
                      <button
                        type="button"
                        onClick={() => removeCandidate(idx)}
                        className="text-xs text-rose-500 hover:text-rose-700 flex items-center gap-1 font-semibold"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Xóa</span>
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">Số báo danh (SBD)</label>
                      <input
                        type="text"
                        value={cand.code}
                        onChange={(e) => updateCandidate(idx, 'code', e.target.value)}
                        className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg outline-none focus:border-indigo-500 font-bold"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">Tên ứng viên / Dự án</label>
                      <input
                        type="text"
                        value={cand.name}
                        onChange={(e) => updateCandidate(idx, 'name', e.target.value)}
                        className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg outline-none focus:border-indigo-500 font-bold"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">Chức danh / Vị trí</label>
                      <input
                        type="text"
                        value={cand.title}
                        onChange={(e) => updateCandidate(idx, 'title', e.target.value)}
                        className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg outline-none focus:border-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">Đơn vị / Chi nhánh</label>
                      <input
                        type="text"
                        value={cand.organization}
                        onChange={(e) => updateCandidate(idx, 'organization', e.target.value)}
                        className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg outline-none focus:border-indigo-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">Tóm tắt tiểu sử</label>
                    <input
                      type="text"
                      value={cand.bio}
                      onChange={(e) => updateCandidate(idx, 'bio', e.target.value)}
                      className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Submit button */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-sm font-bold hover:bg-slate-50 transition-colors"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold shadow-md transition-all active:scale-95"
            >
              Tạo và Công Bố Bình Chọn
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
