import { Logo } from "@/components/shared/Logo";
import { LanguageSwitcher } from "@/components/shared/LanguageSwitcher";
import { SessionHeader } from "@/components/student/SessionHeader";

export default function SessionLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { pin: string };
}) {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <SessionHeader pin={params.pin} />
      <main className="flex-grow flex flex-col items-center justify-center p-4">
        {children}
      </main>
    </div>
  );
}
