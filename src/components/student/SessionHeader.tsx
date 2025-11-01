import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/shared/Logo";
import { LanguageSwitcher } from "@/components/shared/LanguageSwitcher";
import { BarChart, Trophy } from "lucide-react";

export function SessionHeader({ pin }: { pin: string }) {
  return (
    <header className="px-4 lg:px-6 h-16 flex items-center bg-card/80 backdrop-blur-sm border-b sticky top-0 z-50">
      <Logo />
      <div className="mx-auto hidden md:block">
        <div className="flex items-center gap-2 rounded-lg border bg-muted px-3 py-1">
          <span className="text-sm font-medium text-muted-foreground">SESSION PIN:</span>
          <span className="text-lg font-bold tracking-widest text-primary">{pin}</span>
        </div>
      </div>
      <nav className="ml-auto flex items-center gap-2 sm:gap-4">
        <Button asChild variant="outline">
          <Link href={`/session/${pin}/leaderboard`}>
            <Trophy className="w-4 h-4 mr-2" />
            Leaderboard
          </Link>
        </Button>
        <LanguageSwitcher />
      </nav>
    </header>
  );
}
