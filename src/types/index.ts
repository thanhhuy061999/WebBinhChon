export interface Candidate {
  id: string;
  code: string; // e.g. "BC-01"
  name: string;
  organization: string;
  avatar: string;
  coverImage?: string;
  bio: string;
  highlights: string[];
  votes: number;
  ratingTotal?: number;
  ratingCount?: number;
}

export interface Comment {
  id: string;
  author: string;
  content: string;
  candidateId?: string;
  candidateName?: string;
  timestamp: string;
  likes: number;
  badge?: string;
}

export type PollCategory = 'contest' | 'award' | 'poll' | 'event';
export type PollStatus = 'active' | 'upcoming' | 'closed';
export type VotingType = 'single' | 'multi' | 'score';

export interface Poll {
  id: string;
  title: string;
  slug: string;
  category: PollCategory;
  banner: string;
  organizer: string;
  description: string;
  rules: string;
  startDate: string;
  endDate: string;
  status: PollStatus;
  votingType: VotingType;
  maxSelections?: number;
  totalVotes: number;
  verifiedOnly: boolean;
  candidates: Candidate[];
  comments: Comment[];
  tags: string[];
  views: number;
  isFeatured?: boolean;
}

export interface VoteRecord {
  id: string;
  pollId: string;
  pollTitle: string;
  candidateId: string;
  candidateName: string;
  candidateCode: string;
  timestamp: string;
  rating?: number;
  verificationCode: string;
  voterInfo?: {
    name?: string;
    phoneOrEmail?: string;
  };
}
