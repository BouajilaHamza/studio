import { SessionControl } from '@/components/teacher/SessionControl';
import { StudentSubmissions } from '@/components/teacher/StudentSubmissions';

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Session Dashboard</h1>
        <p className="text-muted-foreground">
          Manage your live session and review student answers in real-time.
        </p>
      </div>
      <SessionControl />
      <StudentSubmissions />
    </div>
  );
}
