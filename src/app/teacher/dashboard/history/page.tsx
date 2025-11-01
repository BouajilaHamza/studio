import { HistoryTable } from '@/components/teacher/HistoryTable';

export default function HistoryPage() {
  return (
    <div className="space-y-8">
       <div>
        <h1 className="text-3xl font-bold font-headline">Session History</h1>
        <p className="text-muted-foreground">
          Review details from your past sessions.
        </p>
      </div>
      <HistoryTable />
    </div>
  );
}
