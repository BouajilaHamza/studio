import { Header } from "@/components/shared/Header";
import { JoinSessionForm } from "@/components/student/JoinSessionForm";
import { Sparkles } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="text-center max-w-md w-full">
          <div className="inline-block bg-primary/10 p-4 rounded-full mb-6">
            <Sparkles className="w-12 h-12 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4 text-foreground">
            Welcome to Ahlan Arabic!
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Enter the session PIN from your teacher to get started.
          </p>
          <JoinSessionForm />
        </div>
      </main>
    </div>
  );
}
