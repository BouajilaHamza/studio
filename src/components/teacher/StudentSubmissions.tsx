'use client';
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Check, X, Clock } from 'lucide-react';
import { submissions as initialSubmissions, type Submission } from '@/lib/data';

export function StudentSubmissions() {
  const [submissions, setSubmissions] = useState<Submission[]>(initialSubmissions);

  const handleGrade = (submissionId: string, newStatus: 'correct' | 'incorrect') => {
    setSubmissions(
      submissions.map((sub) => (sub.id === submissionId ? { ...sub, status: newStatus } : sub))
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Student Submissions</CardTitle>
        <CardDescription>Review answers as they come in.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Student</TableHead>
                <TableHead>Phrase (English)</TableHead>
                <TableHead>Answer</TableHead>
                <TableHead className="w-[180px] text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {submissions.map((sub) => (
                <TableRow key={sub.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={sub.studentAvatarUrl} alt={sub.studentName} />
                        <AvatarFallback>{sub.studentName.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{sub.studentName}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{sub.phrase.english}</TableCell>
                  <TableCell className="font-medium">{sub.answer}</TableCell>
                  <TableCell className="text-right">
                    {sub.status === 'pending' ? (
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-green-600 border-green-600 hover:bg-green-50 hover:text-green-700"
                          onClick={() => handleGrade(sub.id, 'correct')}
                        >
                          <Check className="h-4 w-4 mr-1" /> Correct
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-600 border-red-600 hover:bg-red-50 hover:text-red-700"
                          onClick={() => handleGrade(sub.id, 'incorrect')}
                        >
                          <X className="h-4 w-4 mr-1" /> Incorrect
                        </Button>
                      </div>
                    ) : sub.status === 'correct' ? (
                      <div className="flex items-center justify-end text-green-600 font-semibold">
                        <Check className="h-4 w-4 mr-1" /> Correct
                      </div>
                    ) : (
                      <div className="flex items-center justify-end text-red-600 font-semibold">
                        <X className="h-4 w-4 mr-1" /> Incorrect
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
