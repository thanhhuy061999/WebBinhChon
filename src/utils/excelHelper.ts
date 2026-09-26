import * as XLSX from 'xlsx';
import { Employee, Poll } from '../types/vote';

/**
 * Đọc và trích xuất danh sách nhân viên từ file Excel (.xlsx, .xls, .csv)
 */
export async function parseEmployeesFromExcel(file: File): Promise<Employee[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = e.target?.result;
        const workbook = XLSX.read(data, { type: 'binary' });

        // Lấy sheet đầu tiên
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];

        // Chuyển thành dạng mảng JSON
        const rawJson: any[] = XLSX.utils.sheet_to_json(worksheet, { defval: '' });

        const employees: Employee[] = rawJson.map((row, index) => {
          // Linh hoạt nhận diện các tên cột tiếng Việt hoặc tiếng Anh
          const empCode =
            row['Mã NV'] ||
            row['Mã Nhân Viên'] ||
            row['MaNV'] ||
            row['Code'] ||
            row['SBD'] ||
            `NV${String(index + 1).padStart(3, '0')}`;

          const fullName =
            row['Họ và Tên'] ||
            row['Họ Tên'] ||
            row['Họ tên'] ||
            row['Tên'] ||
            row['FullName'] ||
            row['Name'] ||
            `Nhân viên ${index + 1}`;

          const department =
            row['Phòng Ban'] ||
            row['Phòng ban'] ||
            row['Bộ phận'] ||
            row['Department'] ||
            'Khối Văn Phòng';

          const position =
            row['Chức vụ'] ||
            row['Vị trí'] ||
            row['Position'] ||
            'Chuyên viên';

          const email =
            row['Email'] ||
            row['Thư điện tử'] ||
            `${String(empCode).toLowerCase()}@company.vn`;

          const phone = row['Số điện thoại'] || row['SĐT'] || row['Phone'] || '';

          return {
            id: `emp-${Date.now()}-${index}`,
            empCode: String(empCode).trim(),
            fullName: String(fullName).trim(),
            department: String(department).trim(),
            position: String(position).trim(),
            email: String(email).trim(),
            phone: String(phone).trim(),
            avatar: `https://images.unsplash.com/photo-${1534528741775 + (index % 10) * 100}?auto=format&fit=crop&w=300&q=80`,
          };
        });

        resolve(employees);
      } catch (err) {
        reject(err);
      }
    };

    reader.onerror = (error) => reject(error);
    reader.readAsBinaryString(file);
  });
}

/**
 * Xuất file Excel (.xlsx) kết quả bình chọn chi tiết
 */
export function exportPollResultsToExcel(poll: Poll) {
  // Sắp xếp ứng viên theo số phiếu từ cao xuống thấp
  const sorted = [...poll.candidates].sort((a, b) => b.votesCount - a.votesCount);

  // Tạo Sheet 1: Kết quả xếp hạng
  const resultsData = sorted.map((cand, index) => ({
    'Thứ Hạng': index + 1,
    'Mã NV / SBD': cand.code,
    'Họ và Tên': cand.name,
    'Chức Danh / Vị Trí': cand.title,
    'Phòng Ban / Đơn Vị': cand.organization || 'N/A',
    'Số Phiếu Bình Chọn': cand.votesCount,
    'Tỷ Lệ %': `${((cand.votesCount / (poll.totalVotes || 1)) * 100).toFixed(1)}%`,
  }));

  // Tạo Sheet 2: Thông tin cuộc bình chọn
  const infoData = [
    { 'Thông Tin': 'Tên Cuộc Bình Chọn', 'Chi Tiết': poll.title },
    { 'Thông Tin': 'Đơn Vị Tổ Chức', 'Chi Tiết': poll.organizer.name },
    { 'Thông Tin': 'Tổng Lượt Cử Tri Bỏ Phiếu', 'Chi Tiết': poll.totalVoters },
    { 'Thông Tin': 'Tổng Số Phiếu Bầu Hợp Lệ', 'Chi Tiết': poll.totalVotes },
    { 'Thông Tin': 'Thời Gian Bắt Đầu', 'Chi Tiết': new Date(poll.startDate).toLocaleString('vi-VN') },
    { 'Thông Tin': 'Thời Gian Kết Thúc', 'Chi Tiết': new Date(poll.endDate).toLocaleString('vi-VN') },
    { 'Thông Tin': 'Quy Chế', 'Chi Tiết': poll.rules.join(' | ') },
  ];

  const workbook = XLSX.utils.book_new();

  const wsResults = XLSX.utils.json_to_sheet(resultsData);
  const wsInfo = XLSX.utils.json_to_sheet(infoData);

  // Tinh chỉnh độ rộng cột
  wsResults['!cols'] = [
    { wch: 10 }, // Hạng
    { wch: 15 }, // SBD
    { wch: 25 }, // Họ tên
    { wch: 30 }, // Chức danh
    { wch: 25 }, // Phòng ban
    { wch: 20 }, // Số phiếu
    { wch: 12 }, // Tỷ lệ
  ];

  wsInfo['!cols'] = [{ wch: 25 }, { wch: 60 }];

  XLSX.utils.book_append_sheet(workbook, wsResults, 'Bảng Xếp Hạng Kết Quả');
  XLSX.utils.book_append_sheet(workbook, wsInfo, 'Thông Tin Cuộc Bình Chọn');

  // Ghi và tải file
  const fileName = `Ket_Qua_Binh_Chon_${poll.id}_${new Date().toISOString().slice(0, 10)}.xlsx`;
  XLSX.writeFile(workbook, fileName);
}

/**
 * Tải file Excel mẫu danh sách nhân viên để người dùng điền và import
 */
export function downloadSampleEmployeeExcel() {
  const sampleData = [
    {
      'Mã NV': 'NV001',
      'Họ và Tên': 'Nguyễn Văn An',
      'Phòng Ban': 'Phòng Kinh Doanh',
      'Chức vụ': 'Trưởng nhóm kinh doanh',
      'Email': 'an.nguyen@company.vn',
      'Số điện thoại': '0901234567',
    },
    {
      'Mã NV': 'NV002',
      'Họ và Tên': 'Trần Thị Bích Ngọc',
      'Phòng Ban': 'Khối Công Nghệ',
      'Chức vụ': 'Kỹ sư phần mềm cao cấp',
      'Email': 'ngoc.tran@company.vn',
      'Số điện thoại': '0912345678',
    },
    {
      'Mã NV': 'NV003',
      'Họ và Tên': 'Lê Hoàng Nam',
      'Phòng Ban': 'Phòng Marketing',
      'Chức vụ': 'Chuyên viên truyền thông',
      'Email': 'nam.le@company.vn',
      'Số điện thoại': '0923456789',
    },
    {
      'Mã NV': 'NV004',
      'Họ và Tên': 'Phạm Thu Thảo',
      'Phòng Ban': 'Phòng Nhân Sự',
      'Chức vụ': 'Chuyên viên đào tạo',
      'Email': 'thao.pham@company.vn',
      'Số điện thoại': '0934567890',
    },
    {
      'Mã NV': 'NV005',
      'Họ và Tên': 'Đỗ Quốc Hưng',
      'Phòng Ban': 'Phòng Kế Toán',
      'Chức vụ': 'Kế toán trưởng',
      'Email': 'hung.do@company.vn',
      'Số điện thoại': '0945678901',
    },
  ];

  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(sampleData);

  worksheet['!cols'] = [
    { wch: 12 },
    { wch: 25 },
    { wch: 22 },
    { wch: 28 },
    { wch: 25 },
    { wch: 16 },
  ];

  XLSX.utils.book_append_sheet(workbook, worksheet, 'Danh Sách Nhân Viên Mẫu');
  XLSX.writeFile(workbook, 'Mau_Danh_Sach_Nhan_Vien_Binh_Chon.xlsx');
}
