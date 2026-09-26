import React, { useState, useRef } from 'react';
import { Employee, Poll } from '../types/vote';
import { parseEmployeesFromExcel, downloadSampleEmployeeExcel } from '../utils/excelHelper';
import {
  X,
  FileSpreadsheet,
  UploadCloud,
  Download,
  CheckCircle,
  AlertCircle,
  Users,
  Building,
  ArrowRight,
  Sparkles
} from 'lucide-react';

interface ImportExcelModalProps {
  onClose: () => void;
  onImportSuccess: (employees: Employee[], autoCreatePoll: boolean) => void;
}

export const ImportExcelModal: React.FC<ImportExcelModalProps> = ({ onClose, onImportSuccess }) => {
  const [file, setFile] = useState<File | null>(null);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (selectedFile: File) => {
    setErrorMsg(null);
    setFile(selectedFile);
    setIsLoading(true);

    try {
      const data = await parseEmployeesFromExcel(selectedFile);
      if (data.length === 0) {
        setErrorMsg('File Excel không có dữ liệu hoặc tiêu đề cột không đúng định dạng.');
        setEmployees([]);
      } else {
        setEmployees(data);
      }
    } catch (err: any) {
      console.error(err);
      setErrorMsg('Không thể đọc file Excel. Vui lòng kiểm tra file định dạng .xlsx, .xls hoặc .csv.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleApply = (autoCreate: boolean) => {
    if (employees.length === 0) return;
    onImportSuccess(employees, autoCreate);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto animate-fadeIn">
      <div className="relative bg-white rounded-3xl max-w-3xl w-full shadow-2xl overflow-hidden border border-slate-200 my-4 sm:my-8 flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md shadow-emerald-500/20">
              <FileSpreadsheet className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-900">Import Dữ Liệu Nhân Viên từ Excel</h2>
              <p className="text-xs text-slate-500">Tải file danh sách nhân sự để bình chọn hoặc lập danh sách cử tri</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-200 text-slate-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-7 space-y-6 overflow-y-auto flex-1">
          {/* Drag & Drop Upload Zone */}
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-emerald-300 hover:border-emerald-500 bg-emerald-50/40 hover:bg-emerald-50/80 rounded-3xl p-6 sm:p-8 text-center cursor-pointer transition-all duration-200 group"
          >
            <input
              type="file"
              ref={fileInputRef}
              accept=".xlsx, .xls, .csv"
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  handleFileChange(e.target.files[0]);
                }
              }}
              className="hidden"
            />
            <div className="w-14 h-14 rounded-2xl bg-white border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto mb-3 shadow-xs group-hover:scale-110 transition-transform">
              <UploadCloud className="w-7 h-7" />
            </div>
            <h3 className="text-sm sm:text-base font-bold text-slate-900">
              {file ? file.name : 'Kéo thả file Excel (.xlsx, .xls, .csv) vào đây'}
            </h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              Hỗ trợ tự động nhận diện các cột: <span className="font-semibold text-slate-700">Mã NV, Họ và Tên, Phòng Ban, Chức vụ, Email</span>
            </p>
          </div>

          {/* Sample Download button */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
              <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
              <span>Chưa có file đúng mẫu? Tải file Excel mẫu để điền thông tin:</span>
            </div>
            <button
              type="button"
              onClick={downloadSampleEmployeeExcel}
              className="px-3 py-1.5 bg-white hover:bg-slate-100 text-emerald-700 border border-emerald-300 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 shadow-2xs cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Tải file mẫu .XLSX</span>
            </button>
          </div>

          {/* Error Message */}
          {errorMsg && (
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Loading Indicator */}
          {isLoading && (
            <div className="text-center py-6 space-y-2">
              <div className="w-8 h-8 border-3 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-xs text-slate-500">Đang đọc và phân tích cấu trúc dữ liệu file Excel...</p>
            </div>
          )}

          {/* Preview Table */}
          {employees.length > 0 && !isLoading && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span className="text-sm font-bold text-slate-900">
                    Đã đọc thành công {employees.length} nhân viên
                  </span>
                </div>
                <span className="text-xs text-slate-500">Bản xem trước dữ liệu</span>
              </div>

              <div className="border border-slate-200 rounded-2xl overflow-hidden max-h-60 overflow-y-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 text-slate-700 font-bold sticky top-0">
                    <tr>
                      <th className="py-2.5 px-3">Mã NV</th>
                      <th className="py-2.5 px-3">Họ và Tên</th>
                      <th className="py-2.5 px-3">Phòng Ban</th>
                      <th className="py-2.5 px-3">Chức Vụ</th>
                      <th className="py-2.5 px-3">Email</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {employees.map((emp) => (
                      <tr key={emp.id} className="hover:bg-slate-50">
                        <td className="py-2 px-3 font-mono font-bold text-emerald-700">{emp.empCode}</td>
                        <td className="py-2 px-3 font-bold text-slate-900">{emp.fullName}</td>
                        <td className="py-2 px-3 text-slate-600">{emp.department}</td>
                        <td className="py-2 px-3 text-slate-500">{emp.position}</td>
                        <td className="py-2 px-3 text-slate-500">{emp.email}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-6 border-t border-slate-200 bg-slate-50 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-sm font-bold hover:bg-slate-100 transition-colors"
          >
            Đóng
          </button>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              disabled={employees.length === 0}
              onClick={() => handleApply(false)}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border border-emerald-300 text-emerald-800 bg-white hover:bg-emerald-50 text-xs sm:text-sm font-bold transition-all disabled:opacity-50"
            >
              Lưu vào danh sách
            </button>
            <button
              type="button"
              disabled={employees.length === 0}
              onClick={() => handleApply(true)}
              className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs sm:text-sm font-bold shadow-md transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Tạo Cuộc Bình Chọn Mới Ngay ({employees.length} NV)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
