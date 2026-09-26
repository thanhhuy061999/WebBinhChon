export type PollCategory = 'awards' | 'contest' | 'polls' | 'tech' | 'culture';

export type PollStatus = 'active' | 'upcoming' | 'ended';

export interface Candidate {
  id: string;
  code: string; // Số báo danh (SBD) e.g., "SBD-01"
  name: string;
  title: string;
  avatar: string;
  bio: string;
  organization?: string;
  votesCount: number;
  featured?: boolean;
  highlightAchievements?: string[];
}

export interface PollComment {
  id: string;
  pollId: string;
  candidateId?: string;
  candidateName?: string;
  author: string;
  avatar?: string;
  content: string;
  timestamp: string;
  likes: number;
}

export interface Poll {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  bannerUrl: string;
  category: PollCategory;
  status: PollStatus;
  startDate: string;
  endDate: string;
  maxChoices: number; // 1 = Single choice, 2+ = Multiple choice
  minChoices?: number;
  totalVotes: number;
  totalVoters: number;
  isFeatured?: boolean;
  accessType: 'public' | 'pin_protected';
  pinCode?: string;
  showRealtimeResults: boolean;
  allowComments: boolean;
  rules: string[];
  organizer: {
    name: string;
    verified: boolean;
    contact?: string;
  };
  candidates: Candidate[];
  comments: PollComment[];
}

export interface Employee {
  id: string;
  empCode: string; // Mã nhân viên (e.g. NV001)
  fullName: string;
  department: string; // Phòng ban
  email?: string;
  position?: string; // Chức vụ
  phone?: string;
  avatar?: string;
}

export interface VoterSession {
  voterId: string;
  name: string;
  email: string;
  votedPolls: {
    [pollId: string]: {
      candidateIds: string[];
      timestamp: string;
    };
  };
}
