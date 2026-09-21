import { LucideIcon, Inbox } from "lucide-react";
import { ReactNode } from "react";

export function EmptyState({
  icon: Icon = Inbox,
  title,
  description,
  action,
}: {
  icon?: LucideIcon;
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-card border border-dashed border-border-subtle bg-surface-card px-6 py-16 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-surface-subtle text-text-secondary">
        <Icon className="h-6 w-6" aria-hidden="true" />
      </div>
      <h2 className="text-title-card text-text-primary">{title}</h2>
      <p className="max-w-md text-metadata text-text-secondary">
        {description}
      </p>
      {action}
    </div>
  );
}
