import Link from "next/link";
import { Button } from "@/components/ui/button";

type EmptyStateProps = {
  icon?: React.ElementType;
  title: string;
  description?: string;
  action?: { label: string; href: string };
};

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-4 text-center">
      {Icon && <Icon className="w-12 h-12 text-muted-foreground" />}
      <div className="space-y-1">
        <p className="font-semibold text-base">{title}</p>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      {action && (
        <Button asChild>
          <Link href={action.href}>{action.label}</Link>
        </Button>
      )}
    </div>
  );
}
