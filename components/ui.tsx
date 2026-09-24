import type { LucideIcon } from "lucide-react";
import { X } from "lucide-react";

export function PageHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="font-display font-black text-2xl md:text-3xl text-ink">{title}</h1>
        {description && <p className="text-muted mt-1">{description}</p>}
      </div>
      {action}
    </div>
  );
}

export function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`bg-white rounded-2xl border border-line ${className}`}>{children}</div>
  );
}

export function CardTitle({
  icon: Icon,
  children,
  action,
}: {
  icon?: LucideIcon;
  children: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-3 mb-4">
      <h2 className="flex items-center gap-2 font-display font-bold text-lg text-ink">
        {Icon && <Icon size={18} className="text-brand" />}
        {children}
      </h2>
      {action}
    </div>
  );
}

export function Stat({
  icon: Icon,
  label,
  value,
  sub,
  accent,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  sub?: string;
  accent?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border p-5 ${
        accent ? "bg-navy border-navy text-white" : "bg-white border-line text-ink"
      }`}
    >
      <div className={`flex items-center gap-2 text-sm ${accent ? "text-brandsoft" : "text-muted"}`}>
        <Icon size={16} />
        {label}
      </div>
      <p className="font-display font-black text-2xl mt-2">{value}</p>
      {sub && (
        <p className={`text-xs mt-1 ${accent ? "text-[#B7C7D6]" : "text-muted"}`}>{sub}</p>
      )}
    </div>
  );
}

export function Pill({
  children,
  bg = "#EFF6FF",
  fg = "#2563EB",
}: {
  children: React.ReactNode;
  bg?: string;
  fg?: string;
}) {
  return (
    <span
      className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full whitespace-nowrap"
      style={{ background: bg, color: fg }}
    >
      {children}
    </span>
  );
}

export function Modal({
  title,
  onClose,
  children,
}: {
  title?: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-5">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-start justify-between gap-4 mb-4">
          {title && <h3 className="font-display font-bold text-lg text-ink">{title}</h3>}
          <button
            onClick={onClose}
            aria-label="閉じる"
            className="ml-auto -mr-2 -mt-2 p-2 rounded-lg text-muted hover:bg-paper hover:text-ink"
          >
            <X size={18} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

export const btn = {
  primary:
    "inline-flex items-center justify-center gap-2 bg-brand hover:bg-blue-700 text-white font-bold px-5 py-2.5 rounded-xl transition",
  secondary:
    "inline-flex items-center justify-center gap-2 border border-line bg-white text-ink font-bold px-5 py-2.5 rounded-xl hover:bg-paper transition",
  danger:
    "inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold px-5 py-2.5 rounded-xl transition",
};
