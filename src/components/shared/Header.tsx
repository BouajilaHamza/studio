import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Logo } from "./Logo";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { User } from "lucide-react";

export function Header() {
  return (
    <header className="px-4 lg:px-6 h-16 flex items-center bg-card/80 backdrop-blur-sm border-b sticky top-0 z-50">
      <Logo />
      <nav className="ml-auto flex items-center gap-4 sm:gap-6">
        <LanguageSwitcher />
        <Button asChild variant="outline">
          <Link href="/login">
            <User className="w-4 h-4 mr-2" />
            Teacher Login
          </Link>
        </Button>
      </nav>
    </header>
  );
}
