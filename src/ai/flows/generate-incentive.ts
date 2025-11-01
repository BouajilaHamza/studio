// src/ai/flows/generate-incentive.ts
'use server';

/**
 * @fileOverview A flow to generate motivational messages and incentives for students based on their past performance.
 *
 * - generateIncentive - A function that generates motivational messages and incentives.
 * - GenerateIncentiveInput - The input type for the generateIncentive function.
 * - GenerateIncentiveOutput - The return type for the generateIncentive function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateIncentiveInputSchema = z.object({
  studentId: z.string().describe('The ID of the student.'),
  pastPerformance: z.array(z.number()).describe('Array of past scores of the student.'),
  expectedScore: z.number().describe('The expected score for the current session.'),
  currentScore: z.number().describe('The actual score achieved in the current session.'),
});
export type GenerateIncentiveInput = z.infer<typeof GenerateIncentiveInputSchema>;

const GenerateIncentiveOutputSchema = z.object({
  incentiveMessage: z.string().describe('A motivational message for the student.'),
  pointsAwarded: z.number().describe('The number of points awarded to the student.'),
});
export type GenerateIncentiveOutput = z.infer<typeof GenerateIncentiveOutputSchema>;

export async function generateIncentive(input: GenerateIncentiveInput): Promise<GenerateIncentiveOutput> {
  return generateIncentiveFlow(input);
}

const generateIncentivePrompt = ai.definePrompt({
  name: 'generateIncentivePrompt',
  input: {schema: GenerateIncentiveInputSchema},
  output: {schema: GenerateIncentiveOutputSchema},
  prompt: `You are an AI assistant that generates motivational messages and incentives for students based on their past performance.

  Student ID: {{{studentId}}}
  Past Performance: {{{pastPerformance}}}
  Expected Score: {{{expectedScore}}}
  Current Score: {{{currentScore}}}

  Analyze the student's performance and generate a motivational message and the number of points to award.
  Consider the student's progress, expected score, and current score to determine the incentive.
  Reward performance increases and reaching benchmarks.
  Incentive message should be encouraging and relevant to the student's achievements.
  Points awarded should be proportional to the student's effort and progress.
  Do not include any negative comments or feedback.
`,
});

const generateIncentiveFlow = ai.defineFlow(
  {
    name: 'generateIncentiveFlow',
    inputSchema: GenerateIncentiveInputSchema,
    outputSchema: GenerateIncentiveOutputSchema,
  },
  async input => {
    const {output} = await generateIncentivePrompt(input);
    return output!;
  }
);
