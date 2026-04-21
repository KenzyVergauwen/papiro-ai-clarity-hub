import { ReactNode } from "react";

interface Props {
  role: "student" | "teacher";
  userName: string;
  userEmail: string;
  activeTab: string;
  tabs: string[];
  children: ReactNode;
}

export const AppChrome = ({ role, userName, userEmail, activeTab, tabs, children }: Props) => (
  <div className="rounded-2xl border border-border bg-card shadow-card overflow-hidden">
    <div className="flex items-center justify-between px-4 py-2.5 border-b border-border bg-paper-warm/40">
      <div className="flex items-center gap-2">
        <div className="inline-flex items-center gap-1.5 text-foreground">
          <svg viewBox="0 0 52 52" aria-hidden="true" className="h-3.5 w-3.5">
            <rect x="4" y="7" width="38" height="8" rx="4" fill="currentColor" />
            <rect x="4" y="22" width="38" height="8" rx="4" fill="currentColor" />
            <rect x="4" y="37" width="20" height="8" rx="4" fill="currentColor" />
          </svg>
          <span className="text-[10px] font-medium uppercase tracking-[0.22em]">Papiro</span>
        </div>
        <span className="ml-2 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
          {role === "student" ? "Student workspace" : "Educator workspace"}
        </span>
      </div>
      <div className="flex items-center gap-1.5">
        {tabs.map((t) => (
          <span
            key={t}
            className={`text-[10px] font-medium rounded-full px-2.5 py-1 ${
              t === activeTab ? "bg-emerald-brand text-white" : "text-foreground/70"
            }`}
          >
            {t}
          </span>
        ))}
      </div>
      <div className="text-right">
        <div className="text-[10px] font-semibold leading-tight">{userName}</div>
        <div className="text-[9px] text-muted-foreground leading-tight">{userEmail}</div>
      </div>
    </div>
    {children}
  </div>
);
