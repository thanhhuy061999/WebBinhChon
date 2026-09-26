import { Poll } from '../types';

export const INITIAL_POLLS: Poll[] = [
  {
    id: 'poll-young-leaders-2026',
    title: 'Gương Mặt Trẻ Tài Năng & Khởi Nghiệp Đổi Mới Sáng Tạo 2026',
    slug: 'guong-mat-tre-tai-nang-2026',
    category: 'contest',
    banner: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80',
    organizer: 'Hội Liên hiệp Thanh niên & Mạng lưới Khởi nghiệp Đổi mới Sáng tạo Quốc gia',
    description: 'Chương trình thường niên nhằm tôn vinh những gương mặt trẻ dưới 35 tuổi có đóng góp xuất sắc trong lĩnh vực công nghệ, khởi nghiệp, giáo dục và chuyển đổi xanh tại Việt Nam.',
    rules: 'Mỗi tài khoản/thiết bị được bình chọn tối đa 1 lần cho mỗi ứng viên. Hệ thống tự động kiểm tra tính hợp lệ qua OTP/mã định danh để đảm bảo tính khách quan và minh bạch 100%.',
    startDate: '2026-09-01T00:00:00Z',
    endDate: '2026-10-15T23:59:59Z',
    status: 'active',
    votingType: 'single',
    totalVotes: 18450,
    verifiedOnly: true,
    tags: ['Khởi Nghiệp', 'Công Nghệ', 'Thanh Niên Tiêu Biểu', 'Top 10'],
    views: 42300,
    isFeatured: true,
    candidates: [
      {
        id: 'cand-01',
        code: 'GMT-01',
        name: 'Nguyễn Hoàng Minh',
        organization: 'CEO & Đồng sáng lập AgriAI Vietnam',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
        coverImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80',
        bio: 'Nhà tiên phong áp dụng Trí tuệ Nhân tạo vào tối ưu hóa chuỗi cung ứng nông sản xuất khẩu, hỗ trợ hơn 15.000 hộ nông dân ĐBSCL tăng 30% thu nhập.',
        highlights: [
          'Giải Nhất Sáng tạo Khoa học Kỹ thuật 2025',
          'Gọi vốn thành công 2.5M USD vòng Hạt giống',
          'Tác giả 3 bằng sáng chế giải pháp IoT nông nghiệp'
        ],
        votes: 6240,
      },
      {
        id: 'cand-02',
        code: 'GMT-02',
        name: 'Trần Thị Thu Hà',
        organization: 'Nhà nghiên cứu Y sinh - Viện Công nghệ Sinh học',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
        coverImage: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1000&q=80',
        bio: 'Tiến sĩ trẻ 28 tuổi với công trình nghiên cứu vi hạt nano nhắm trúng đích trong điều trị ung thư gan, đã công bố 8 bài báo trên tạp chí Q1 quốc tế.',
        highlights: [
          'Forbes 30 Under 30 Vietnam danh sách ứng viên tiêu biểu',
          'Học bổng tiến sĩ danh dự từ Viện Max Planck',
          'Gương mặt khoa học trẻ cống hiến vì sức khỏe cộng đồng'
        ],
        votes: 5410,
      },
      {
        id: 'cand-03',
        code: 'GMT-03',
        name: 'Lê Quang Huy',
        organization: 'Kiến trúc sư Trưởng - Nền tảng EdTech MathFun',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
        coverImage: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1000&q=80',
        bio: 'Xây dựng nền tảng học Toán tư duy và STEM tương tác trực quan miễn phí cho trẻ em vùng cao, tiếp cận hơn 100.000 học sinh tại 24 tỉnh thành.',
        highlights: [
          'Giải thưởng Chuyển đổi số Quốc gia 2025',
          'Dự án cộng đồng tiêu biểu của năm',
          'Đạt mốc 500.000 giờ học tương tác trực tuyến'
        ],
        votes: 3820,
      },
      {
        id: 'cand-04',
        code: 'GMT-04',
        name: 'Phạm Đăng Khoa',
        organization: 'Sáng lập viên BioPlastic GreenEarth',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
        coverImage: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=1000&q=80',
        bio: 'Nghiên cứu và sản xuất vật liệu tự phân hủy sinh học từ bã mía và xơ dừa, thay thế hơn 50 tấn nhựa dùng một lần trong năm vừa qua.',
        highlights: [
          'Top 3 Giải thưởng Doanh nhân Xanh ASEAN',
          'Sản phẩm đạt chứng nhận phân hủy sinh học TUV Austria',
          'Hợp tác cung cấp bao bì cho 3 chuỗi siêu thị lớn'
        ],
        votes: 2980,
      }
    ],
    comments: [
      {
        id: 'cmt-1',
        author: 'ThS. Đỗ Tuấn Kiệt',
        candidateId: 'cand-01',
        candidateName: 'Nguyễn Hoàng Minh',
        content: 'Rất ấn tượng với tầm nhìn công nghệ nông nghiệp của Minh. Đã bình chọn và chúc dự án ngày càng vươn xa hơn nữa!',
        timestamp: '15 phút trước',
        likes: 24,
        badge: 'Cố vấn chuyên môn'
      },
      {
        id: 'cmt-2',
        author: 'Phương Uyên',
        candidateId: 'cand-02',
        candidateName: 'Trần Thị Thu Hà',
        content: 'Chị Hà là tấm gương sáng cho các bạn nữ theo đuổi nghiên cứu khoa học công nghệ. Tự hào và luôn ủng hộ chị!',
        timestamp: '1 giờ trước',
        likes: 42,
        badge: 'Cổ động viên nhiệt tình'
      },
      {
        id: 'cmt-3',
        author: 'Hoàng Bách',
        candidateId: 'cand-03',
        candidateName: 'Lê Quang Huy',
        content: 'Các bé ở trường mình rất thích học trên MathFun. Dự án rất nhân văn và thiết thực. Ủng hộ 1 phiếu cho anh Huy!',
        timestamp: '3 giờ trước',
        likes: 19
      }
    ]
  },
  {
    id: 'poll-green-community-2026',
    title: 'Giải Thưởng Dự Án Sáng Tạo Vì Cộng Đồng Xanh 2026',
    slug: 'giai-thuong-cong-dong-xanh-2026',
    category: 'award',
    banner: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=1200&q=80',
    organizer: 'Quỹ Môi trường Xanh Việt Nam & Mạng lưới Bền vững',
    description: 'Bình chọn dự án môi trường có tác động tích cực nhất tới việc giảm phát thải rác thải nhựa, bảo vệ nguồn nước và phát triển kinh tế tuần hoàn.',
    rules: 'Người tham gia có thể bình chọn theo thang điểm từ 1 đến 5 sao cho từng dự án. Điểm số trung bình kết hợp số lượt bình chọn sẽ quyết định kết quả.',
    startDate: '2026-09-10T00:00:00Z',
    endDate: '2026-10-30T18:00:00Z',
    status: 'active',
    votingType: 'score',
    totalVotes: 9420,
    verifiedOnly: false,
    tags: ['Môi Trường', 'Kinh Tế Tuần Hoàn', 'Xanh', 'Cộng Đồng'],
    views: 18900,
    isFeatured: true,
    candidates: [
      {
        id: 'cand-green-1',
        code: 'DX-01',
        name: 'Dự án "Đổi Rác Lấy Cây Xanh & Nông Sản Sạch"',
        organization: 'CLB Tình nguyện Mầm Xanh',
        avatar: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=600&q=80',
        bio: 'Hơn 12 điểm tiếp nhận rác tái chế tại Hà Nội & TP.HCM, thu gom hơn 80 tấn phế liệu và trao tặng 15.000 chậu cây xanh trong năm 2025-2026.',
        highlights: ['Lan tỏa tới 45 trường đại học', 'Tiết kiệm 120 tấn khí thải CO2 quy đổi', 'Tạo thói quen phân loại rác cho hơn 30.000 bạn trẻ'],
        votes: 3890,
        ratingTotal: 18672,
        ratingCount: 3890,
      },
      {
        id: 'cand-green-2',
        code: 'DX-02',
        name: 'Hệ Thống Trạm Nước Uống Tự Động Refill Hub',
        organization: 'Liên minh Giảm Nhựa Sinh Viên',
        avatar: 'https://images.unsplash.com/photo-1527525443983-6e60c75fff46?auto=format&fit=crop&w=600&q=80',
        bio: 'Lắp đặt các trạm lọc nước uống tinh khiết miễn phí tại các trường học công lập, khuyến khích học sinh dùng bình cá nhân thay chai nhựa 1 lần.',
        highlights: ['Giảm thiểu 400.000 chai nhựa/năm', 'Chất lượng nước đạt tiêu chuẩn QCVN 6-1:2010/BYT', 'Hệ thống năng lượng mặt trời tự cấp nguồn'],
        votes: 3210,
        ratingTotal: 15408,
        ratingCount: 3210,
      },
      {
        id: 'cand-green-3',
        code: 'DX-03',
        name: 'Nông Trại San Hô & Phục Hồi Đa Dạng Biển Cù Lao Chàm',
        organization: 'Viện Sinh thái Biển Miền Trung',
        avatar: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80',
        bio: 'Cấy ghép thành công hơn 5.000 mảnh san hô cứng trên nền rạn nhân tạo thân thiện môi trường, tái sinh hệ sinh thái vùng bờ.',
        highlights: ['Tỷ lệ sống đạt 88.5%', 'Thu hút sự trở lại của 40 loài sinh vật biển', 'Tổ chức các tour lặn biển dọn rác thiện nguyện'],
        votes: 2320,
        ratingTotal: 11368,
        ratingCount: 2320,
      }
    ],
    comments: [
      {
        id: 'cmt-g1',
        author: 'Nguyễn Văn Thái',
        candidateId: 'cand-green-3',
        candidateName: 'Dự án Nông Trại San Hô',
        content: 'Biển đảo Việt Nam rất cần những dự án tâm huyết thế này. Chấm 5 sao cho đội ngũ bảo tồn!',
        timestamp: '4 giờ trước',
        likes: 31
      }
    ]
  },
  {
    id: 'poll-ai-trends-vietnam',
    title: 'Khảo Sát: Lĩnh Vực Ứng Dụng AI Đột Phá Nhất Năm 2026',
    slug: 'khao-sat-ai-2026',
    category: 'poll',
    banner: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    organizer: 'Hiệp hội Trí tuệ Nhân tạo & Chuyển đổi Số',
    description: 'Thăm dò ý kiến cộng đồng công nghệ và người dùng Việt Nam về lĩnh vực sẽ hưởng lợi và bứt phá mạnh mẽ nhất nhờ Generative AI và Tự động hóa thông minh.',
    rules: 'Mỗi người dùng có thể chọn tối đa 2 lĩnh vực quan trọng nhất theo đánh giá cá nhân.',
    startDate: '2026-09-15T00:00:00Z',
    endDate: '2026-11-01T23:59:59Z',
    status: 'active',
    votingType: 'multi',
    maxSelections: 2,
    totalVotes: 12500,
    verifiedOnly: false,
    tags: ['Công Nghệ', 'AI', 'Thảo Luận', 'Khảo Sát'],
    views: 29400,
    candidates: [
      {
        id: 'opt-ai-1',
        code: 'AI-01',
        name: 'Y tế & Chẩn Đoán Sớm',
        organization: 'Trợ lý ảo bác sĩ, phân tích hình ảnh X-quang/MRI',
        avatar: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80',
        bio: 'Hỗ trợ bác sĩ tuyến cơ sở chẩn đoán sớm bệnh lý nan y, cá nhân hóa phác đồ điều trị và giảm tải bệnh viện tuyến trên.',
        highlights: ['Độ chính xác tương đương 94%', 'Rút ngắn thời gian đọc phim còn 30 giây'],
        votes: 4890,
      },
      {
        id: 'opt-ai-2',
        code: 'AI-02',
        name: 'Giáo Dục & Trợ Lý Học Tập Thông Minh',
        organization: 'Cá nhân hóa bài giảng theo năng lực từng học sinh',
        avatar: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=600&q=80',
        bio: 'Gia sư AI 24/7 đồng hành cùng học sinh, giải thích cặn kẽ và thiết kế bài học phù hợp với tốc độ tiếp thu của từng em.',
        highlights: ['Hỗ trợ học ngoại ngữ và lập trình', 'Tự động chấm và nhận xét chi tiết'],
        votes: 4320,
      },
      {
        id: 'opt-ai-3',
        code: 'AI-03',
        name: 'Nông Nghiệp Công Nghệ Cao & Khí Hậu',
        organization: 'Dự báo sâu bệnh, tối ưu tưới tiêu và phân bón',
        avatar: 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=600&q=80',
        bio: 'Tự động hóa toàn diện từ ảnh vệ tinh và camera cảm biến để cảnh báo sâu bệnh sớm và tiết kiệm 40% lượng nước ngọt.',
        highlights: ['Bảo vệ năng suất cây trồng', 'Cảnh báo thời tiết cực đoan'],
        votes: 2150,
      },
      {
        id: 'opt-ai-4',
        code: 'AI-04',
        name: 'Thương Mại Điện Tử & Chăm Sóc Khách Hàng',
        organization: 'Agentic AI tự động hóa vận hành và tư vấn bán hàng',
        avatar: 'https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=600&q=80',
        bio: 'Tăng tốc phản hồi khách hàng tức thời, gợi ý sản phẩm siêu cá nhân hóa và quản trị tồn kho thông minh.',
        highlights: ['Xử lý 90% khiếu nại thường gặp trong 1 phút', 'Tăng tỷ lệ chuyển đổi đơn hàng'],
        votes: 1140,
      }
    ],
    comments: [
      {
        id: 'cmt-ai-1',
        author: 'Lâm IT',
        content: 'Y tế và Giáo dục là 2 lĩnh vực tạo ra giá trị nhân văn lớn nhất khi ứng dụng AI đúng đắn!',
        timestamp: '2 giờ trước',
        likes: 15
      }
    ]
  },
  {
    id: 'poll-hackathon-2026',
    title: 'Bình Chọn Đội Thi Được Yêu Thích Nhất - AI Hackathon Vietnam',
    slug: 'ai-hackathon-vietnam-2026',
    category: 'event',
    banner: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80',
    organizer: 'Ban Tổ Chức National AI Hackathon 2026',
    description: 'Bình chọn khán giả dành cho top 5 đội tuyển lọt vào vòng Chung kết Quốc gia sau 48 giờ lập trình không ngủ.',
    rules: 'Thời gian bình chọn mở trong suốt thời gian diễn ra đêm Chung kết. Khán giả bình chọn trực tiếp và theo dõi bảng điểm nhảy theo thời gian thực.',
    startDate: '2026-09-20T08:00:00Z',
    endDate: '2026-10-05T21:00:00Z',
    status: 'active',
    votingType: 'single',
    totalVotes: 7350,
    verifiedOnly: false,
    tags: ['Hackathon', 'Lập Trình', 'Sinh Viên', 'Chung Kết'],
    views: 15200,
    candidates: [
      {
        id: 'cand-hack-1',
        code: 'HK-01',
        name: 'Đội tuyển "VocalLens" (ĐH Bách Khoa)',
        organization: 'Dự án kính thông minh chuyển ngữ điệu cử chỉ cho người khiếm thính',
        avatar: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80',
        bio: 'Sử dụng mô hình thị giác máy tính siêu nhẹ chạy trên thiết bị biên để dịch ngôn ngữ ký hiệu thành giọng nói thời gian thực với độ trễ dưới 80ms.',
        highlights: ['Nguyên mẫu phần cứng hoàn thiện', 'Được ban giám khảo đánh giá cao tính khả thi'],
        votes: 3100,
      },
      {
        id: 'cand-hack-2',
        code: 'HK-02',
        name: 'Đội tuyển "NeuroCode" (ĐH Công Nghệ - ĐHQGHN)',
        organization: 'Trợ lý lập trình viên tối ưu hiệu năng và phát hiện lỗ hổng zero-day',
        avatar: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=600&q=80',
        bio: 'Hệ thống tự động phân tích tĩnh mã nguồn và tái cấu trúc thuật toán nhằm giảm thiểu tiêu thụ năng lượng của máy chủ đám mây.',
        highlights: ['Tiết kiệm 22% CPU cycle trong bài kiểm tra chuẩn', 'Tích hợp extension VS Code'],
        votes: 2450,
      },
      {
        id: 'cand-hack-3',
        code: 'HK-03',
        name: 'Đội tuyển "AquaGuard" (ĐH Khoa Học Tự Nhiên)',
        organization: 'Phao quan trắc thông minh cảnh báo sớm xâm nhập mặn Đồng bằng Sông Cửu Long',
        avatar: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=600&q=80',
        bio: 'Thiết bị phao nổi tự sạc bằng sóng và năng lượng mặt trời gửi dữ liệu độ mặn theo thời gian thực tới Zalo của bà con nhà nông.',
        highlights: ['Chi phí sản xuất dưới 500.000 VNĐ/phao', 'Thử nghiệm thực tế tại Bến Tre'],
        votes: 1800,
      }
    ],
    comments: []
  },
  {
    id: 'poll-brand-design-2025',
    title: 'Giải Thưởng Thiết Kế Nhận Diện Thương Hiệu Việt Ấn Tượng 2025',
    slug: 'giai-thuong-thiet-ke-thuong-hieu-2025',
    category: 'award',
    banner: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
    organizer: 'Hiệp hội Thiết kế Sáng tạo Vietnam Design Association',
    description: 'Vinh danh các bộ nhận diện thương hiệu đậm chất bản sắc văn hóa Việt Nam kết hợp phong cách hiện đại tối giản.',
    rules: 'Bình chọn đã hoàn tất và kết quả chính thức được lưu trữ vĩnh viễn trên hệ thống.',
    startDate: '2025-11-01T00:00:00Z',
    endDate: '2025-12-15T23:59:59Z',
    status: 'closed',
    votingType: 'single',
    totalVotes: 21300,
    verifiedOnly: true,
    tags: ['Thiết Kế', 'Branding', 'Nghệ Thuật', 'Đã Kết Thúc'],
    views: 38700,
    candidates: [
      {
        id: 'cand-des-1',
        code: 'TK-01',
        name: 'Bộ nhận diện "Gốm Mộc Việt"',
        organization: 'Studio Thiết kế Đương đại Hà Nội',
        avatar: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=600&q=80',
        bio: 'Lấy cảm hứng từ họa tiết hoa sen men lam thời Lý Trần, tôn vinh nghệ nhân làng gốm Bát Tràng.',
        highlights: ['Huy chương Vàng Thiết kế 2025', 'Xuất hiện trên tạp chí BrandNew Toàn cầu'],
        votes: 11400,
      },
      {
        id: 'cand-des-2',
        code: 'TK-02',
        name: 'Hệ thống hình ảnh "Cà Phê Di Sản"',
        organization: 'Creative Agency Sài Gòn',
        avatar: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=600&q=80',
        bio: 'Kể câu chuyện giọt cà phê phin qua lăng kính đồ họa vector hiện đại và sắc màu đất đỏ bazan Tây Nguyên.',
        highlights: ['Giải Nhì Khán giả Bình chọn', 'Ứng dụng trên hơn 60 cửa hàng trên toàn quốc'],
        votes: 9900,
      }
    ],
    comments: []
  }
];

const STORAGE_KEY_POLLS = 'web_binh_chon_polls_v1';
const STORAGE_KEY_USER_VOTES = 'web_binh_chon_user_votes_v1';

export function getStoredPolls(): Poll[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY_POLLS);
    if (data) {
      return JSON.parse(data);
    }
  } catch (e) {
    console.error('Failed to parse polls from localStorage:', e);
  }
  return INITIAL_POLLS;
}

export function saveStoredPolls(polls: Poll[]): void {
  try {
    localStorage.setItem(STORAGE_KEY_POLLS, JSON.stringify(polls));
  } catch (e) {
    console.error('Failed to save polls to localStorage:', e);
  }
}

export function getStoredUserVotes(): Record<string, string[]> {
  try {
    const data = localStorage.getItem(STORAGE_KEY_USER_VOTES);
    if (data) {
      return JSON.parse(data);
    }
  } catch (e) {
    console.error('Failed to parse user votes:', e);
  }
  return {};
}

export function saveStoredUserVote(pollId: string, candidateId: string): void {
  try {
    const votes = getStoredUserVotes();
    if (!votes[pollId]) {
      votes[pollId] = [];
    }
    if (!votes[pollId].includes(candidateId)) {
      votes[pollId].push(candidateId);
    }
    localStorage.setItem(STORAGE_KEY_USER_VOTES, JSON.stringify(votes));
  } catch (e) {
    console.error('Failed to save user vote:', e);
  }
}
