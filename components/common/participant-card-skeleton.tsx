import { Skeleton } from "@/components/ui/skeleton";

export function ParticipantCardSkeleton() {
  return (
    <div className="flex items-center gap-3 p-3 rounded-lg border bg-card">
      <Skeleton className="h-10 w-10 rounded-full shrink-0" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-3 w-1/4" />
      </div>
    </div>
  );
}
