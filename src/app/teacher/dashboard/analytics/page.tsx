import { AnalyticsCharts } from '@/components/teacher/AnalyticsCharts';

export default function AnalyticsPage() {
  return (
    <div className="space-y-8">
       <div>
        <h1 className="text-3xl font-bold font-headline">Analytics</h1>
        <p className="text-muted-foreground">
          Track session performance and student progress over time.
        </p>
      </div>
      <AnalyticsCharts />
    </div>
  );
}
