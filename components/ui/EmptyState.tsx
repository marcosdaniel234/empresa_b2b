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
    <div className="flex flex-col items-center gap-2 rounded-card border border-dashed border-border-strong bg-white px-6 py-12 text-center">
      <div className="flex h-11 w-11 items-center justify-center rounded-control bg-surface-subtle text-text-secondary">
        <Icon size={20} aria-hidden="true" />
      </div>
      <h2 className="mt-1 text-title-card text-text-primary">{title}</h2>
      <p className="max-w-md text-metadata text-text-secondary">
        {description}
      </p>
      {action}
    </div>
  );
}
