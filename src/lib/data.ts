import type { Student, Phrase, Submission, SessionHistory, AnalyticsData } from './types';
import { Trophy, Medal, Award } from 'lucide-react';

export const students: Student[] = [
  {
    id: 'student-1',
    name: 'Yasmine',
    avatarUrl: 'https://picsum.photos/seed/avatar1/100/100',
    avatarHint: 'child smiling',
    score: 1250,
    pastPerformance: [80, 85, 90, 88],
    badges: [
      { icon: Trophy, label: 'Top Scorer' },
      { icon: Medal, label: '5-Day Streak' },
    ],
  },
  {
    id: 'student-2',
    name: 'Karim',
    avatarUrl: 'https://picsum.photos/seed/avatar2/100/100',
    avatarHint: 'child glasses',
    score: 1100,
    pastPerformance: [75, 78, 82, 80],
    badges: [{ icon: Award, label: 'Perfect Round' }],
  },
  {
    id: 'student-3',
    name: 'Layla',
    avatarUrl: 'https://picsum.photos/seed/avatar3/100/100',
    avatarHint: 'child laughing',
    score: 950,
    pastPerformance: [88, 82, 85, 90],
    badges: [],
  },
  {
    id: 'student-4',
    name: 'Omar',
    avatarUrl: 'https://picsum.photos/seed/avatar4/100/100',
    avatarHint: 'child hat',
    score: 870,
    pastPerformance: [92, 90, 88, 91],
    badges: [{ icon: Medal, label: '3-Day Streak' }],
  },
  {
    id: 'student-5',
    name: 'Fatima',
    avatarUrl: 'https://picsum.photos/seed/avatar5/100/100',
    avatarHint: 'child thinking',
    score: 720,
    pastPerformance: [70, 72, 68, 75],
    badges: [],
  },
];

export const phrases: Phrase[] = [
  {
    id: 'phrase-1',
    english: 'Hello, how are you?',
    french: 'Bonjour, comment ça va ?',
    tunisian: 'Ahla, shnahwalek?',
    msa: 'Marhaban, kayfa haluk?',
  },
  {
    id: 'phrase-2',
    english: 'My name is...',
    french: 'Je m\'appelle...',
    tunisian: 'Ismi...',
    msa: 'Ismi...',
  },
  {
    id: 'phrase-3',
    english: 'Thank you very much.',
    french: 'Merci beaucoup.',
    tunisian: 'Yaaychek.',
    msa: 'Shukran jazilan.',
  },
  {
    id: 'phrase-4',
    english: 'Where is the market?',
    french: 'Où est le marché ?',
    tunisian: 'Win el marshee?',
    msa: 'Ayna al-suq?',
  },
];

export const submissions: Submission[] = [
  {
    id: 'sub-1',
    studentId: 'student-1',
    studentName: 'Yasmine',
    studentAvatarUrl: 'https://picsum.photos/seed/avatar1/100/100',
    phrase: phrases[0],
    answer: 'Ahla, shnahwalek?',
    status: 'pending',
  },
  {
    id: 'sub-2',
    studentId: 'student-2',
    studentName: 'Karim',
    studentAvatarUrl: 'https://picsum.photos/seed/avatar2/100/100',
    phrase: phrases[0],
    answer: 'Ahla, shnahwelek?',
    status: 'pending',
  },
  {
    id: 'sub-3',
    studentId: 'student-3',
    studentName: 'Layla',
    studentAvatarUrl: 'https://picsum.photos/seed/avatar3/100/100',
    phrase: phrases[1],
    answer: 'Ismi Layla',
    status: 'correct',
  },
  {
    id: 'sub-4',
    studentId: 'student-4',
    studentName: 'Omar',
    studentAvatarUrl: 'https://picsum.photos/seed/avatar4/100/100',
    phrase: phrases[2],
    answer: 'Shukran',
    status: 'incorrect',
  },
];

export const sessionHistory: SessionHistory[] = [
  { id: 'sess-1', date: '2024-07-20', participants: 15, topStudent: 'Yasmine', averageScore: 88 },
  { id: 'sess-2', date: '2024-07-19', participants: 12, topStudent: 'Omar', averageScore: 91 },
  { id: 'sess-3', date: '2024-07-18', participants: 14, topStudent: 'Yasmine', averageScore: 85 },
  { id: 'sess-4', date: '2024-07-17', participants: 16, topStudent: 'Karim', averageScore: 82 },
];

export const analyticsData: AnalyticsData[] = [
  { month: 'Jan', sessions: 20, avgScore: 82 },
  { month: 'Feb', sessions: 22, avgScore: 85 },
  { month: 'Mar', sessions: 25, avgScore: 86 },
  { month: 'Apr', sessions: 23, avgScore: 88 },
  { month: 'May', sessions: 28, avgScore: 89 },
  { month: 'Jun', sessions: 30, avgScore: 91 },
];
