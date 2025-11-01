export type Student = {
  id: string;
  name: string;
  avatarUrl: string;
  avatarHint: string;
  score: number;
  pastPerformance: number[];
  badges: { icon: React.ElementType; label: string }[];
};

export type Phrase = {
  id: string;
  english: string;
  french: string;
  tunisian: string;
  msa: string;
};

export type Submission = {
  id: string;
  studentId: string;
  studentName: string;
  studentAvatarUrl: string;
  phrase: Phrase;
  answer: string;
  status: 'pending' | 'correct' | 'incorrect';
};

export type SessionHistory = {
  id: string;
  date: string;
  participants: number;
  topStudent: string;
  averageScore: number;
};

export type AnalyticsData = {
  month: string;
  sessions: number;
  avgScore: number;
};
