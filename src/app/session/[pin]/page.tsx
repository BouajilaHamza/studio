import { SessionInterface } from '@/components/student/SessionInterface';
import { phrases, students } from '@/lib/data';

export default function SessionPage({ params }: { params: { pin: string } }) {
  // In a real app, you would fetch session data based on the PIN
  const currentStudent = students[0];
  
  return <SessionInterface student={currentStudent} phrases={phrases} />;
}
