import { Sparkles } from 'lucide-react';
import Link from 'next/link';

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 text-xl font-bold font-headline text-primary hover:text-primary/80 transition-colors">
      <Sparkles className="w-6 h-6" />
      <span>Ahlan Arabic</span>
    </Link>
  );
}
