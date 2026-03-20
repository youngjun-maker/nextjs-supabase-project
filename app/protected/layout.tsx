import { StarterShell } from "@/components/layout/starter-shell";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <StarterShell>{children}</StarterShell>;
}
