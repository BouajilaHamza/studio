import { Leaderboard } from "@/components/student/Leaderboard";
import { students } from "@/lib/data";

export default function LeaderboardPage({ params }: { params: { pin: string } }) {
  const sortedStudents = [...students].sort((a, b) => b.score - a.score);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Leaderboard students={sortedStudents} />
    </div>
  );
}
