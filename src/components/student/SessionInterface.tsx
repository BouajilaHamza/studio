"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Loader2, Send, Languages, BookOpen, Volume2 } from "lucide-react";
import type { Phrase, Student } from "@/lib/types";
import { IncentiveModal } from "./IncentiveModal";
import { generateIncentive } from "@/ai/flows/generate-incentive";
import type { GenerateIncentiveOutput } from "@/ai/flows/generate-incentive";

type SessionState = 'answering' | 'waiting' | 'feedback';

export function SessionInterface({ student, phrases }: { student: Student, phrases: Phrase[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [sessionState, setSessionState] = useState<SessionState>('answering');
  const [incentive, setIncentive] = useState<GenerateIncentiveOutput | null>(null);

  const currentPhrase = phrases[currentIndex];
  const progress = ((currentIndex + 1) / phrases.length) * 100;

  const handleSubmit = async () => {
    setSessionState('waiting');
    
    // Simulate teacher review and scoring
    await new Promise(resolve => setTimeout(resolve, 1500));
    const isCorrect = Math.random() > 0.3; // 70% chance of being correct
    const currentScore = isCorrect ? Math.floor(80 + Math.random() * 21) : Math.floor(50 + Math.random() * 21);
    
    // GenAI call
    const incentiveResult = await generateIncentive({
      studentId: student.id,
      pastPerformance: student.pastPerformance,
      expectedScore: 85,
      currentScore: currentScore,
    });
    setIncentive(incentiveResult);

    setSessionState('feedback');
  };

  const handleNext = () => {
    if (currentIndex < phrases.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setAnswer("");
      setSessionState('answering');
      setIncentive(null);
    } else {
      // End of session - maybe navigate to leaderboard or a summary screen
      alert("Session complete!");
    }
  };

  return (
    <>
      <div className="w-full max-w-2xl space-y-4">
        <Progress value={progress} className="w-full" />
        <Card className="shadow-xl">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardDescription>Translate this phrase into Tunisian Arabic:</CardDescription>
                <CardTitle className="text-2xl md:text-3xl font-headline mt-2">{currentPhrase.english}</CardTitle>
              </div>
              <div className="flex gap-1">
                <Button variant="ghost" size="icon"><Volume2 className="w-5 h-5"/></Button>
                <Button variant="ghost" size="icon"><BookOpen className="w-5 h-5"/></Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Type your translation here..."
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="min-h-[120px] text-lg"
              disabled={sessionState !== 'answering'}
            />
            <div className="text-sm text-muted-foreground mt-4 flex items-center gap-2">
              <Languages className="w-4 h-4"/>
              <div>
                <p><strong>French:</strong> {currentPhrase.french}</p>
                <p><strong>MSA:</strong> {currentPhrase.msa}</p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              size="lg" 
              className="w-full" 
              onClick={handleSubmit} 
              disabled={sessionState !== 'answering' || !answer}
            >
              {sessionState === 'waiting' ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Send className="mr-2 h-4 w-4" />
              )}
              {sessionState === 'waiting' ? 'Waiting for review...' : 'Submit Answer'}
            </Button>
          </CardFooter>
        </Card>
      </div>

      <IncentiveModal
        isOpen={sessionState === 'feedback' && !!incentive}
        onClose={handleNext}
        incentive={incentive}
      />
    </>
  );
}
