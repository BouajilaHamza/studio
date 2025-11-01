"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

export function JoinSessionForm() {
  const [pin, setPin] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (pin.trim()) {
      router.push(`/session/${pin.trim()}`);
    }
  };

  return (
    <Card className="max-w-sm mx-auto shadow-lg">
      <form onSubmit={handleSubmit}>
        <CardContent className="p-6">
          <Input
            type="text"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            placeholder="Enter your 6-digit PIN"
            className="text-center text-lg h-12"
            maxLength={6}
            aria-label="Session PIN"
          />
        </CardContent>
        <CardFooter className="p-6 pt-0">
          <Button type="submit" className="w-full" size="lg" disabled={!pin}>
            Join Session
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
