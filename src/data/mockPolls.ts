import { Poll } from '../types/vote';

export const INITIAL_POLLS: Poll[] = [
  {
    id: 'poll-1',
    slug: 'guong-mat-tre-tieu-bieu-2026',
    title: 'Gương Mặt Trẻ & Lãnh Đạo Tương Lai 2026',
    shortDescription: 'Tôn vinh các tài năng trẻ có cống hiến vượt bậc trong khoa học công nghệ, khởi nghiệp đổi mới sáng tạo và hoạt động cộng đồng.',
    description: 'Chương trình bình chọn thường niên nhằm tìm kiếm và vinh danh 10 gương mặt trẻ tiêu biểu có thành tích xuất sắc, truyền cảm hứng mạnh mẽ đến thế hệ trẻ Việt Nam. Kết quả bình chọn từ cộng đồng chiếm 50% tổng điểm cùng Hội đồng Chuyên môn.',
    bannerUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1400&q=80',
    category: 'awards',
    status: 'active',
    startDate: '2026-09-01T08:00:00Z',
    endDate: '2026-10-15T23:59:59Z',
    maxChoices: 1,
    minChoices: 1,
    totalVotes: 32418,
    totalVoters: 32418,
    isFeatured: true,
    accessType: 'public',
    showRealtimeResults: true,
    allowComments: true,
    rules: [
      'Mỗi tài khoản hoặc thiết bị chỉ được bình chọn 01 lần cho 01 ứng viên duy nhất.',
      'Hệ thống ứng dụng công nghệ giám sát chống gian lận IP và thiết bị.',
      'Thời gian mở cổng bình chọn kết thúc vào 23:59 ngày 15/10/2026.',
      'Quyết định của Ban Tổ Chức là quyết định cuối cùng.'
    ],
    organizer: {
      name: 'Trung Ương Đoàn TNCS & Quỹ Đổi Mới Sáng Tạo',
      verified: true,
      contact: 'banbientap@guongmattrevn.org'
    },
    candidates: [
      {
        id: 'c-101',
        code: 'SBD-01',
        name: 'TS. Nguyễn Hoàng Anh',
        title: 'Nhà nghiên cứu Y sinh học & Trí tuệ nhân tạo',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
        bio: 'Tác giả của 12 bài báo khoa học chuẩn Q1 về ứng dụng AI trong chẩn đoán sớm ung thư đường tiêu hoá. Sáng lập phòng lab mở phục vụ sinh viên y khoa.',
        organization: 'Viện Hàn lâm KH&CN & ĐH Quốc Gia',
        votesCount: 11420,
        featured: true,
        highlightAchievements: [
          'Giải thưởng Quả Cầu Vàng KHCN 2025',
          'Sở hữu 2 bằng sáng chế quốc tế về thuật toán xử lý ảnh tế bào',
          'Gây quỹ 2 tỷ VNĐ hỗ trợ bệnh nhi nghèo'
        ]
      },
      {
        id: 'c-102',
        code: 'SBD-02',
        name: 'Trần Minh Quang',
        title: 'CEO & Founder Nền tảng Nông nghiệp Xanh AgriTech',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
        bio: 'Tiên phong kết nối hơn 15.000 hộ nông dân Tây Nguyên với chuỗi cung ứng trực tiếp, giảm 35% chi phí logistics và tăng thu nhập ổn định cho bà con.',
        organization: 'AgriTech Vietnam',
        votesCount: 9845,
        featured: true,
        highlightAchievements: [
          'Forbes 30 Under 30 Châu Á năm 2025',
          'Đạt giải Nhất Khởi nghiệp Sáng tạo Quốc gia Techfest',
          'Tạo việc làm cho hơn 300 lao động địa phương'
        ]
      },
      {
        id: 'c-103',
        code: 'SBD-03',
        name: 'Lê Thảo My',
        title: 'Kiện tướng Cờ vua Quốc tế & Tác giả sách',
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80',
        bio: 'Huy chương Vàng giải vô địch Cờ vua trẻ thế giới lứa tuổi U20. Chủ nhiệm dự án "Cờ vua vùng cao" mang môn thể thao trí tuệ đến 20 điểm trường biên giới.',
        organization: 'Liên đoàn Cờ Việt Nam',
        votesCount: 6512,
        highlightAchievements: [
          'Huy chương Vàng Cờ vua Trẻ Thế Giới',
          'Huân chương Lao động hạng Ba',
          'Quyên góp hơn 5.000 bộ cờ vua cho trường tiểu học vùng khó khăn'
        ]
      },
      {
        id: 'c-104',
        code: 'SBD-04',
        name: 'Phạm Đăng Khoa',
        title: 'Kỹ sư Robot & Trưởng nhóm Xe tự hành SV-Autonomous',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
        bio: 'Chủ nhiệm dự án robot dọn rác bãi biển tự động ứng dụng năng lượng mặt trời, đã triển khai thử nghiệm hiệu quả tại Đà Nẵng và Nha Trang.',
        organization: 'Đại học Bách Khoa',
        votesCount: 4641,
        highlightAchievements: [
          'Giải Vô địch Robocon Châu Á - TBD',
          'Hơn 100 tấn rác ven biển được thu gom tự động',
          'Giải Nhất Sáng tạo Trẻ Toàn quốc'
        ]
      }
    ],
    comments: [
      {
        id: 'cm-1',
        pollId: 'poll-1',
        candidateId: 'c-101',
        candidateName: 'TS. Nguyễn Hoàng Anh',
        author: 'Nguyễn Văn Thành',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
        content: 'Ủng hộ TS Hoàng Anh hết mình! Dự án AI chẩn đoán ung thư có giá trị nhân văn và thực tiễn rất lớn cho nền y tế nước nhà.',
        timestamp: '15 phút trước',
        likes: 42
      },
      {
        id: 'cm-2',
        pollId: 'poll-1',
        candidateId: 'c-102',
        candidateName: 'Trần Minh Quang',
        author: 'Phạm Thị Lan (Đắk Lắk)',
        avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80',
        content: 'Bà con nông dân chúng tôi rất biết ơn mô hình của anh Quang. Một phiếu xứng đáng cho nông nghiệp sạch!',
        timestamp: '1 giờ trước',
        likes: 28
      }
    ]
  },
  {
    id: 'poll-2',
    slug: 'du-an-cong-nghe-khoi-nghiep-2026',
    title: 'Top Dự Án Công Nghệ & Khởi Nghiệp Đột Phá 2026',
    shortDescription: 'Bình chọn sản phẩm và giải pháp công nghệ mang lại tác động xã hội lớn nhất trong năm.',
    description: 'Bình chọn các sản phẩm công nghệ Make-in-Vietnam tiên phong trong AI, Fintech, Năng lượng tái tạo và Chuyển đổi số. Bạn có thể chọn tối đa 2 dự án yêu thích nhất.',
    bannerUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1400&q=80',
    category: 'tech',
    status: 'active',
    startDate: '2026-08-15T00:00:00Z',
    endDate: '2026-10-30T18:00:00Z',
    maxChoices: 2,
    minChoices: 1,
    totalVotes: 18560,
    totalVoters: 11200,
    isFeatured: true,
    accessType: 'public',
    showRealtimeResults: true,
    allowComments: true,
    rules: [
      'Được chọn tối đa 2 dự án trong mỗi lượt bình chọn.',
      'Cổng bình chọn mở tự do cho mọi thành viên cộng đồng công nghệ.',
      'Dự án đạt số phiếu cao nhất sẽ nhận gói bảo trợ 500 triệu VNĐ ươm tạo doanh nghiệp.'
    ],
    organizer: {
      name: 'Liên minh Công nghệ Số & TechFest',
      verified: true,
      contact: 'awards@techvietnam.org'
    },
    candidates: [
      {
        id: 'c-201',
        code: 'SP-01',
        name: 'VietGen AI - Nền tảng LLM Tiếng Việt',
        title: 'Mô hình ngôn ngữ lớn chuyên sâu tiếng Việt & văn hóa bản địa',
        avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
        bio: 'Hỗ trợ dịch thuật văn bản cổ, hỗ trợ pháp lý và tài chính với độ chính xác trên 96% theo ngữ cảnh pháp luật Việt Nam.',
        organization: 'VietGen Labs',
        votesCount: 7120,
        featured: true,
        highlightAchievements: ['Xử lý 10 triệu truy vấn hàng ngày', 'Ứng dụng tại 12 cơ quan hành chính']
      },
      {
        id: 'c-202',
        code: 'SP-02',
        name: 'EcoBattery - Pin Cát Thân Thiện Môi Trường',
        title: 'Công nghệ tích trữ năng lượng nhiệt từ cát silica tái sinh',
        avatar: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=600&q=80',
        bio: 'Giải pháp lưu trữ điện gió và mặt trời với giá thành chỉ bằng 1/4 pin lithium-ion truyền thống, tuổi thọ lên tới 30 năm.',
        organization: 'Green Energy Solutions',
        votesCount: 5410,
        highlightAchievements: ['Bằng độc quyền sáng chế quốc gia', 'Thử nghiệm tại 3 trang trại điện gió Bình Thuận']
      },
      {
        id: 'c-203',
        code: 'SP-03',
        name: 'EduMind - Gia Sư Cá Nhân Hóa Dành Cho Trẻ Khuyết Tật',
        title: 'Ứng dụng trợ lý học tập chuyển đổi giọng nói & ngôn ngữ ký hiệu',
        avatar: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=600&q=80',
        bio: 'Cung cấp phương pháp tiếp cận học tập hòa nhập bình đẳng cho hơn 50.000 học sinh khiếm thính và khiếm thị trên cả nước.',
        organization: 'EdTech For Good Foundation',
        votesCount: 6030,
        highlightAchievements: ['Giải thưởng Đổi mới Xã hội ASEAN', 'Miễn phí 100% cho mọi trường chuyên biệt']
      }
    ],
    comments: [
      {
        id: 'cm-3',
        pollId: 'poll-2',
        candidateId: 'c-203',
        candidateName: 'EduMind - Gia Sư Cá Nhân Hóa Dành Cho Trẻ Khuyết Tật',
        author: 'Cô giáo Hoàng Mai',
        content: 'EduMind đã giúp các bé lớp em tiếp thu bài học dễ dàng hơn rất nhiều. Chúc dự án nhận được sự lan tỏa rộng rãi!',
        timestamp: '30 phút trước',
        likes: 19
      }
    ]
  },
  {
    id: 'poll-3',
    slug: 'am-thuc-duong-pho-viet-nam-2026',
    title: 'Món Ăn Biểu Tượng Ẩm Thực Đường Phố Việt Nam',
    shortDescription: 'Cùng du khách và người dân bình chọn món ăn xứng đáng là "Đại sứ ẩm thực đường phố" quảng bá toàn cầu.',
    description: 'Ẩm thực Việt Nam luôn làm say đắm hàng triệu du khách quốc tế. Hãy cùng chọn ra món ăn đường phố mà bạn tự hào nhất khi giới thiệu với bạn bè năm châu!',
    bannerUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1400&q=80',
    category: 'culture',
    status: 'active',
    startDate: '2026-09-10T00:00:00Z',
    endDate: '2026-11-20T23:59:59Z',
    maxChoices: 1,
    minChoices: 1,
    totalVotes: 48920,
    totalVoters: 48920,
    isFeatured: false,
    accessType: 'public',
    showRealtimeResults: true,
    allowComments: true,
    rules: [
      'Bình chọn tự do, mỗi người một phiếu duy nhất.',
      'Món ăn thắng cuộc sẽ được đưa vào cẩm nang du lịch ẩm thực chính thức năm 2027.'
    ],
    organizer: {
      name: 'Hiệp hội Văn hóa Ẩm thực Việt Nam (VCCA)',
      verified: true,
      contact: 'contact@amthucviet.vn'
    },
    candidates: [
      {
        id: 'c-301',
        code: 'AT-01',
        name: 'Phở Bò Hà Nội',
        title: 'Hương vị truyền thống nước dùng thanh ngọt thảo mộc',
        avatar: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&w=600&q=80',
        bio: 'Món ăn quốc hồn quốc túy với sợi bánh mềm mượt, nước dùng ninh từ xương bò cùng hồi, quế, thảo quả nồng nàn.',
        organization: 'Ẩm thực miền Bắc',
        votesCount: 19840,
        highlightAchievements: ['Top 10 món nước ngon nhất thế giới', 'Di sản văn hóa phi vật thể quốc gia']
      },
      {
        id: 'c-302',
        code: 'AT-02',
        name: 'Bánh Mì Sài Gòn',
        title: 'Chiếc bánh kẹp giòn tan bùng nổ hương vị pate và rau thơm',
        avatar: 'https://images.unsplash.com/photo-1626804475297-41608ea09aeb?auto=format&fit=crop&w=600&q=80',
        bio: 'Sự kết hợp hoàn hảo giữa vỏ bánh mì giòn rụm, pate béo ngậy, thịt chả đậm đà cùng dưa chua và ớt tươi giòn sần sật.',
        organization: 'Ẩm thực phương Nam',
        votesCount: 18230,
        highlightAchievements: ['Từ vựng "Banh Mi" chính thức trong từ điển Oxford', 'Món sandwich được yêu thích nhất châu Á']
      },
      {
        id: 'c-303',
        code: 'AT-03',
        name: 'Bún Bò Huế',
        title: 'Đậm đà phong vị cố đô với sả ớt và mắm ruốc',
        avatar: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80',
        bio: 'Tô bún đỏ rực màu ớt chưng, hương sả quyện cùng mắm ruốc thơm lừng, thịt bắp hoa giòn sần sật và chả cua béo bùi.',
        organization: 'Ẩm thực miền Trung',
        votesCount: 10850,
        highlightAchievements: ['Được đầu bếp huyền thoại Anthony Bourdain ca ngợi là một trong những món súp ngon nhất thế giới']
      }
    ],
    comments: [
      {
        id: 'cm-4',
        pollId: 'poll-3',
        candidateId: 'c-302',
        candidateName: 'Bánh Mì Sài Gòn',
        author: 'Đức Huy',
        content: 'Bánh mì là món ăn tiện lợi, vừa nhanh vừa ngon đỉnh cao, xứng đáng đại diện đường phố nhất!',
        timestamp: '2 giờ trước',
        likes: 15
      }
    ]
  },
  {
    id: 'poll-4',
    slug: 'dai-su-van-hoa-doanh-nghiep-2026',
    title: 'Bầu Chọn Đại Sứ Văn Hóa & Gương Mặt Thân Thiện 2026',
    shortDescription: 'Cuộc thi nội bộ vinh danh các cá nhân luôn lan tỏa tinh thần tích cực và tận tâm vì đồng nghiệp.',
    description: 'Chương trình thường niên bình chọn cá nhân tiêu biểu đại diện cho giá trị cốt lõi: Chân thành - Sáng tạo - Đồng đội. Yêu cầu mã PIN nội bộ để tham gia.',
    bannerUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1400&q=80',
    category: 'contest',
    status: 'active',
    startDate: '2026-09-15T00:00:00Z',
    endDate: '2026-10-05T17:00:00Z',
    maxChoices: 1,
    minChoices: 1,
    totalVotes: 1420,
    totalVoters: 1420,
    isFeatured: false,
    accessType: 'pin_protected',
    pinCode: 'VOTE2026',
    showRealtimeResults: true,
    allowComments: true,
    rules: [
      'Cuộc bình chọn yêu cầu nhập mã PIN bảo mật: VOTE2026',
      'Mỗi nhân viên chỉ được bỏ phiếu 01 lần.',
      'Giải thưởng được công bố tại Đêm Hội Văn Hóa Doanh Nghiệp ngày 10/10.'
    ],
    organizer: {
      name: 'Ban Nhân Sự & Văn Hóa Doanh Nghiệp',
      verified: true,
      contact: 'hr-internal@company.vn'
    },
    candidates: [
      {
        id: 'c-401',
        code: 'NV-01',
        name: 'Hoàng Bích Thủy',
        title: 'Chuyên viên Chăm sóc Khách hàng (Customer Support)',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
        bio: 'Luôn giữ nụ cười và năng lượng tích cực, chỉ số hài lòng khách hàng đạt 99.4% trong suốt 4 quý liên tiếp.',
        organization: 'Phòng CSKH',
        votesCount: 680,
        highlightAchievements: ['Nhân viên xuất sắc Quý 1, Quý 2', 'Tổ chức các buổi yoga giải tỏa căng thẳng cho văn phòng']
      },
      {
        id: 'c-402',
        code: 'NV-02',
        name: 'Vũ Đức Nam',
        title: 'Kỹ sư Phần mềm Trưởng (Tech Lead)',
        avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=600&q=80',
        bio: 'Nhiệt tình hướng dẫn và kèm cặp hơn 20 bạn thực tập sinh và junior, luôn sẵn sàng hỗ trợ đồng đội giải quyết sự cố bất kể ngày đêm.',
        organization: 'Khối Công Nghệ',
        votesCount: 740,
        highlightAchievements: ['Người truyền cảm hứng công nghệ', 'Mentor được yêu thích nhất 2 năm liền']
      }
    ],
    comments: []
  }
];
