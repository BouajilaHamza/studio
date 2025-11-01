"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PartyPopper, Star } from "lucide-react";
import type { GenerateIncentiveOutput } from "@/ai/flows/generate-incentive";

interface IncentiveModalProps {
  isOpen: boolean;
  onClose: () => void;
  incentive: GenerateIncentiveOutput | null;
}

export function IncentiveModal({ isOpen, onClose, incentive }: IncentiveModalProps) {
  if (!incentive) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="items-center text-center">
          <div className="bg-accent/20 p-3 rounded-full mb-4">
            <PartyPopper className="w-10 h-10 text-accent" />
          </div>
          <DialogTitle className="text-2xl font-headline">Great Job!</DialogTitle>
          <DialogDescription className="text-base">{incentive.incentiveMessage}</DialogDescription>
        </DialogHeader>
        <div className="my-6 flex flex-col items-center justify-center gap-2">
          <p className="text-lg text-muted-foreground">You earned</p>
          <div className="flex items-center gap-2">
            <Star className="w-8 h-8 text-yellow-400 fill-yellow-400" />
            <p className="text-5xl font-bold text-primary">{incentive.pointsAwarded}</p>
          </div>
          <p className="text-lg text-muted-foreground">points!</p>
        </div>
        <DialogFooter>
          <Button onClick={onClose} className="w-full" size="lg">Continue</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
