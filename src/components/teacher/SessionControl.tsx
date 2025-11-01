'use client';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Square, Clipboard, Check, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function SessionControl() {
  const [sessionActive, setSessionActive] = useState(false);
  const [pin, setPin] = useState('');
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const startSession = () => {
    const newPin = Math.floor(100000 + Math.random() * 900000).toString();
    setPin(newPin);
    setSessionActive(true);
  };

  const endSession = () => {
    setSessionActive(false);
    setPin('');
  };

  const copyPin = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(pin);
      } else {
        // Fallback for insecure contexts
        const textArea = document.createElement("textarea");
        textArea.value = pin;
        textArea.style.position = "absolute";
        textArea.style.left = "-9999px";
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }
      
      setCopied(true);
      toast({
        title: "Copied!",
        description: "The session PIN has been copied to your clipboard.",
      });
      setTimeout(() => setCopied(false), 2000);

    } catch (err) {
      console.error("Failed to copy PIN: ", err);
      toast({
        variant: "destructive",
        title: "Copy Failed",
        description: "Could not copy the PIN. Please try again.",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Session Control</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col sm:flex-row items-center gap-4">
        {!sessionActive ? (
          <Button onClick={startSession} size="lg">
            <Play className="mr-2 h-4 w-4" /> Start New Session
          </Button>
        ) : (
          <>
            <Button onClick={endSession} variant="destructive" size="lg">
              <Square className="mr-2 h-4 w-4" /> End Session
            </Button>
            <div className="flex items-center gap-2 rounded-lg border bg-muted p-3">
              <span className="text-sm font-medium text-muted-foreground">Session PIN:</span>
              <span className="text-2xl font-bold tracking-widest text-primary">{pin}</span>
              <Button onClick={copyPin} variant="ghost" size="icon" className="w-8 h-8">
                {copied ? <Check className="h-4 w-4 text-green-500" /> : <Clipboard className="h-4 w-4" />}
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
