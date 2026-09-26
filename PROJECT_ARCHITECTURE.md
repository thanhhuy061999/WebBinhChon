# DỰ ÁN 1 THÁNG: HỆ THỐNG BÌNH CHỌN TRỰC TUYẾN (WebBinhChon)
**Chủ dự án:** thanhuy061999@gmail.com  
**Kiến trúc chuẩn:** 3-Tier Architecture (.NET 8 + SQL Server + Web Frontend)  
**Tình trạng:** Đã chốt kiến trúc - KHÔNG ĐỔI TRONG SUỐT QUÁ TRÌNH 1 THÁNG.

---

## 1. CẤU TRÚC SOLUTION TRÊN VISUAL STUDIO (BẢO LƯU 100%)

Solution: `WebBinhChon.sln`
├── 📁 1. WebBinhChon.Models (Chứa Entities dùng chung)
│   ├── Entities.cs (Poll, Candidate, VoteRecord)
│   └── Employee.cs (Id, EmpCode, FullName, Department, Position, Email)
│
├── 📁 2. WebBinhChon.DAL (Data Access Layer - Kết nối SQL Server)
│   ├── AppDbContext.cs (DbSet Polls, Candidates, VoteRecords, Employees)
│   └── VoteRepository.cs (IVoteRepository & VoteRepository)
│
├── 📁 3. WebBinhChon.BLL (Business Logic Layer - Nghiệp vụ & Excel)
│   └── VoteManager.cs (IVoteManager & VoteManager - Import ClosedXML, Xuất Excel)
│
└── 📁 4. WebBinhChon (Presentation Layer - API & Web View)
    ├── Controllers/VoteController.cs
    ├── appsettings.json (Chuỗi kết nối SQL Server)
    ├── Program.cs (Cấu hình DI & Swagger)
    └── wwwroot/ (Giao diện người dùng)

---

## 2. BẢNG CƠ SỞ DỮ LIỆU SQL SERVER (WebBinhChonDb)
- `Employees`: Id, EmpCode (Mã NV duy nhất), FullName, Department, Position, Email, CreatedAt.
- `Polls`: Id, Title, Description, EndDate, IsActive.
- `Candidates`: Id, Name, SBD, AvatarUrl, VotesCount, PollId.
- `VoteRecords`: Id, CandidateId, PollId, VoterEmailOrIp, VotedAt.

---

## 3. LỘ TRÌNH 1 THÁNG (MILESTONES)
- **Tuần 1:** Hoàn thiện Database, DAL, BLL đọc file Excel nhân viên và xuất Excel kết quả.
- **Tuần 2:** Xây dựng bảo mật chống gian lận (1 người 1 phiếu, chặn theo IP / Email nhân viên / mã OTP).
- **Tuần 3:** Ghép giao diện Web chuyên nghiệp (bảng xếp hạng realtime, podium top 3, modal chi tiết).
- **Tuần 4:** Báo cáo, thống kê, kiểm thử tải (Stress test) và xuất bản nghiệm thu.
