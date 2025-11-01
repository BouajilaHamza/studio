import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { sessionHistory } from '@/lib/data';
import { Button } from '../ui/button';
import { Eye } from 'lucide-react';

export function HistoryTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Past Sessions</CardTitle>
        <CardDescription>A log of your previous teaching sessions.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Participants</TableHead>
                <TableHead>Top Student</TableHead>
                <TableHead>Average Score</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sessionHistory.map((session) => (
                <TableRow key={session.id}>
                  <TableCell className="font-medium">{session.date}</TableCell>
                  <TableCell>{session.participants}</TableCell>
                  <TableCell>{session.topStudent}</TableCell>
                  <TableCell>{session.averageScore}%</TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" /> View Details
                    </Button>
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
