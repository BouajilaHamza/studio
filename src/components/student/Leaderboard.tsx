import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import type { Student } from "@/lib/types";
import { Star, Trophy } from "lucide-react";

const rankColors = [
  'bg-yellow-400 text-yellow-900', // 1st
  'bg-slate-300 text-slate-800', // 2nd
  'bg-orange-400 text-orange-900' // 3rd
];

export function Leaderboard({ students }: { students: Student[] }) {
  return (
    <Card className="shadow-xl">
      <CardHeader className="text-center">
        <div className="inline-block bg-primary/10 p-4 rounded-full mb-4 mx-auto">
            <Trophy className="w-12 h-12 text-primary" />
        </div>
        <CardTitle className="text-3xl font-headline">Leaderboard</CardTitle>
        <CardDescription>See who's at the top of the class!</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {students.map((student, index) => (
            <li
              key={student.id}
              className="flex items-center gap-4 rounded-lg border p-4 transition-all hover:bg-muted/50"
            >
              <div className={`flex h-10 w-10 items-center justify-center rounded-full font-bold text-lg ${rankColors[index] || 'bg-muted text-muted-foreground'}`}>
                {index + 1}
              </div>
              <Avatar className="h-12 w-12">
                <AvatarImage src={student.avatarUrl} alt={student.name} data-ai-hint={student.avatarHint}/>
                <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-grow">
                <p className="font-bold text-lg">{student.name}</p>
                <div className="flex items-center gap-1 text-primary font-semibold">
                  <Star className="w-4 h-4 fill-current"/>
                  <span>{student.score.toLocaleString()} points</span>
                </div>
              </div>
              {student.badges.length > 0 && (
                <div className="flex gap-2">
                  <TooltipProvider>
                    {student.badges.map((badge, i) => (
                      <Tooltip key={i}>
                        <TooltipTrigger asChild>
                           <div className="p-2 bg-accent/20 rounded-full">
                            <badge.icon className="h-5 w-5 text-accent" />
                           </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{badge.label}</p>
                        </TooltipContent>
                      </Tooltip>
                    ))}
                  </TooltipProvider>
                </div>
              )}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
