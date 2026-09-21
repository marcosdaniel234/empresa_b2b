"use client";
import { useEffect, useRef } from "react";
import { X } from "lucide-react";

export function Dialog({
  title,
  children,
  onClose,
  dismissible = true,
  className = "",
}: {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  dismissible?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = ref.current;
    const previous = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    dialog?.showModal();
    dialog?.querySelector<HTMLElement>("[data-dialog-heading]")?.focus();
    document.body.style.overflow = "hidden";
    return () => {
      dialog?.close();
      document.body.style.overflow = overflow;
      if (previous?.isConnected) previous.focus();
    };
  }, []);
  return (
    <dialog
      ref={ref}
      aria-label={title}
      className={`app-dialog ${className}`}
      onCancel={(e) => {
        e.preventDefault();
        if (dismissible) onClose();
      }}
      onClick={(e) => {
        if (dismissible && e.target === e.currentTarget) {
          const r = e.currentTarget.getBoundingClientRect();
          if (
            e.clientX < r.left ||
            e.clientX > r.right ||
            e.clientY < r.top ||
            e.clientY > r.bottom
          )
            onClose();
        }
      }}
    >
      <div className="mb-5 flex items-start justify-between gap-3">
        <h2
          data-dialog-heading
          tabIndex={-1}
          className="pt-2 text-title-section-mobile"
        >
          {title}
        </h2>
        {dismissible && (
          <button
            type="button"
            aria-label="Fechar janela"
            onClick={onClose}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-text-secondary hover:bg-surface-subtle"
          >
            <X size={21} aria-hidden="true" />
          </button>
        )}
      </div>
      {children}
    </dialog>
  );
}

