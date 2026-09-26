import React from 'react';
import { Vote, ShieldCheck, Heart, Award } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-16 bg-slate-900 text-slate-400 text-sm border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5 text-white">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold">
                <Vote className="w-5 h-5" />
              </div>
              <span className="font-black text-xl tracking-tight">
                Web<span className="text-indigo-400">BìnhChọn</span>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 max-w-md leading-relaxed">
              Nền tảng bình chọn trực tuyến hàng đầu, cung cấp giải pháp tổ chức giải thưởng, cuộc thi sắc đẹp, tài năng trẻ, bầu cử đại biểu và thăm dò ý kiến cộng đồng minh bạch và bảo mật cao.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold pt-1">
              <ShieldCheck className="w-4 h-4" />
              <span>Chứng chỉ kiểm toán kết quả độc lập & chống gian lận tự động</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-2.5">
            <h4 className="text-white text-xs font-bold uppercase tracking-wider">Chuyên mục bình chọn</h4>
            <ul className="space-y-1.5 text-xs">
              <li className="hover:text-white transition-colors cursor-pointer">Giải thưởng & Gương mặt trẻ</li>
              <li className="hover:text-white transition-colors cursor-pointer">Công nghệ & Startup đột phá</li>
              <li className="hover:text-white transition-colors cursor-pointer">Văn hóa & Ẩm thực Việt Nam</li>
              <li className="hover:text-white transition-colors cursor-pointer">Bầu cử nội bộ doanh nghiệp & trường học</li>
            </ul>
          </div>

          {/* Legal / Trust */}
          <div className="space-y-2.5">
            <h4 className="text-white text-xs font-bold uppercase tracking-wider">Hỗ trợ & Thể lệ</h4>
            <ul className="space-y-1.5 text-xs">
              <li className="hover:text-white transition-colors cursor-pointer">Chính sách bảo mật phiếu bầu</li>
              <li className="hover:text-white transition-colors cursor-pointer">Quy chế chống gian lận & Spam</li>
              <li className="hover:text-white transition-colors cursor-pointer">Hướng dẫn đăng ký tổ chức bình chọn</li>
              <li className="hover:text-white transition-colors cursor-pointer">Liên hệ Ban Quản Trị</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 text-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 WebBinhChon Platform. Bản quyền thuộc về Hệ thống Bình chọn Trực tuyến.</p>
          <p className="flex items-center gap-1 text-slate-500">
            <span>Phát triển vì một cộng đồng bình chọn minh bạch</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          </p>
        </div>
      </div>
    </footer>
  );
};
