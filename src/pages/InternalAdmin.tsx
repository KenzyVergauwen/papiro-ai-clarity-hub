import { useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { AppChrome } from "@/components/workflow/AppChrome";
import {
  LayoutDashboard,
  Building2,
  KeyRound,
  Hash,
  Users,
  Megaphone,
  LifeBuoy,
  Activity,
  ScrollText,
  ShieldCheck,
  Heart,
  Bell,
  Search,
  Plus,
  Filter,
  Download,
  Upload,
  ChevronRight,
  AlertTriangle,
  CircleCheck,
  CircleAlert,
  CircleDot,
  Mail,
  UserPlus,
  Eye,
  MoreHorizontal,
  TrendingUp,
  TrendingDown,
  Clock,
  Sparkles,
  FileText,
  ListChecks,
  GraduationCap,
  School,
  Pencil,
  Send,
  PauseCircle,
  PlayCircle,
  ArrowUpRight,
  CheckCircle2,
  CalendarDays,
  Server,
  Database,
  MessagesSquare,
  Inbox,
  RefreshCw,
} from "lucide-react";

type SectionId =
  | "dashboard"
  | "clients"
  | "licences"
  | "codes"
  | "users"
  | "banners"
  | "support"
  | "analytics"
  | "audit"
  | "permissions"
  | "health";

type ClientId = "kuleuven" | "ugent" | "vives" | "hogent" | "ehb";

const NAV: { id: SectionId; label: string; icon: typeof LayoutDashboard; group: string; badge?: number }[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, group: "Overview" },
  { id: "clients", label: "Clients", icon: Building2, group: "Customers" },
  { id: "licences", label: "Licences", icon: KeyRound, group: "Customers", badge: 3 },
  { id: "codes", label: "Course codes", icon: Hash, group: "Customers" },
  { id: "users", label: "User accounts", icon: Users, group: "People" },
  { id: "banners", label: "Banners", icon: Megaphone, group: "Communication" },
  { id: "support", label: "Support inbox", icon: LifeBuoy, group: "Operations", badge: 5 },
  { id: "analytics", label: "Usage analytics", icon: Activity, group: "Operations" },
  { id: "audit", label: "Audit log", icon: ScrollText, group: "Trust" },
  { id: "permissions", label: "Admin roles", icon: ShieldCheck, group: "Trust" },
  { id: "health", label: "System health", icon: Heart, group: "Trust" },
];

const CLIENTS: {
  id: ClientId;
  name: string;
  short: string;
  type: string;
  status: "active" | "trial" | "expiring" | "expired";
  licences: number;
  users: number;
  teachers: number;
  students: number;
  facultyAdmins: number;
  courses: number;
  codes: number;
  tasks: number;
  activity: number;
  renewal: string;
  contact: string;
  onboarding: number;
}[] = [
  {
    id: "kuleuven",
    name: "KU Leuven",
    short: "KUL",
    type: "University · Institution licence",
    status: "active",
    licences: 4,
    users: 1842,
    teachers: 64,
    students: 1742,
    facultyAdmins: 6,
    courses: 38,
    codes: 52,
    tasks: 9421,
    activity: 87,
    renewal: "12 Sep 2026",
    contact: "Prof. Margot Devlieger",
    onboarding: 100,
  },
  {
    id: "ugent",
    name: "UGent — Faculty of Arts",
    short: "UGA",
    type: "Faculty · Yearly licence",
    status: "expiring",
    licences: 1,
    users: 612,
    teachers: 28,
    students: 578,
    facultyAdmins: 2,
    courses: 14,
    codes: 18,
    tasks: 3104,
    activity: 71,
    renewal: "30 May 2026",
    contact: "Jeroen Verhaeghe",
    onboarding: 100,
  },
  {
    id: "vives",
    name: "VIVES Hogeschool",
    short: "VIV",
    type: "Hogeschool · Pilot",
    status: "trial",
    licences: 1,
    users: 184,
    teachers: 9,
    students: 170,
    facultyAdmins: 1,
    courses: 4,
    codes: 6,
    tasks: 412,
    activity: 44,
    renewal: "14 Jun 2026",
    contact: "Lieselot Vermeulen",
    onboarding: 60,
  },
  {
    id: "hogent",
    name: "HOGENT",
    short: "HOG",
    type: "Hogeschool · Limited student",
    status: "active",
    licences: 2,
    users: 728,
    teachers: 22,
    students: 690,
    facultyAdmins: 2,
    courses: 12,
    codes: 19,
    tasks: 2840,
    activity: 78,
    renewal: "01 Oct 2026",
    contact: "Tom De Backer",
    onboarding: 100,
  },
  {
    id: "ehb",
    name: "Erasmushogeschool Brussel",
    short: "EHB",
    type: "Hogeschool · Yearly licence",
    status: "expired",
    licences: 1,
    users: 0,
    teachers: 0,
    students: 0,
    facultyAdmins: 1,
    courses: 8,
    codes: 11,
    tasks: 1980,
    activity: 0,
    renewal: "Expired 18 Apr 2026",
    contact: "An Vanderbeek",
    onboarding: 100,
  },
];

const StatusPill = ({ status }: { status: string }) => {
  const map: Record<string, string> = {
    active: "bg-[hsl(var(--emerald-soft))] text-[hsl(var(--emerald-deep))]",
    trial: "bg-[hsl(var(--sky-soft))] text-[hsl(var(--sky-ink))]",
    expiring: "bg-[hsl(var(--amber-soft))] text-[hsl(var(--amber-ink))]",
    expired: "bg-[hsl(var(--peach))] text-[hsl(var(--peach-ink))]",
  };
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider ${map[status] ?? "bg-muted text-muted-foreground"}`}>
      <span className="size-1.5 rounded-full bg-current" /> {status}
    </span>
  );
};

const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`rounded-xl border border-border bg-card ${className}`}>{children}</div>
);

const SectionTitle = ({ icon: Icon, title, subtitle, action }: { icon: typeof LayoutDashboard; title: string; subtitle?: string; action?: React.ReactNode }) => (
  <div className="flex items-end justify-between gap-4 mb-4">
    <div>
      <div className="flex items-center gap-2 text-foreground">
        <Icon className="size-4 text-[hsl(var(--emerald))]" />
        <h2 className="text-base font-semibold">{title}</h2>
      </div>
      {subtitle && <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>}
    </div>
    {action}
  </div>
);

const InternalAdmin = () => {
  const [section, setSection] = useState<SectionId>("dashboard");
  const [openClient, setOpenClient] = useState<ClientId | null>(null);

  const groups = Array.from(new Set(NAV.map((n) => n.group)));

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="container-page py-12 lg:py-16">
        <div className="max-w-3xl mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
            <Sparkles className="size-3 text-[hsl(var(--emerald))]" /> Concept · Internal admin platform
          </div>
          <h1 className="mt-4 text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
            One workspace to run Papiro.
          </h1>
          <p className="mt-3 text-base text-muted-foreground leading-relaxed">
            A central console for our team to manage clients, licences, course codes, accounts,
            announcements and support — without jumping between tools. This is an interactive
            mockup of how the back-office could feel.
          </p>
        </div>

        <AppChrome
          role="internal"
          userName="Anouk · Super admin"
          userEmail="anouk@papiro.io"
          activeTab={NAV.find((n) => n.id === section)?.label ?? ""}
          tabs={["Dashboard", "Clients", "Licences", "Banners"]}
        >
          <div className="grid grid-cols-12 min-h-[640px]">
            {/* Sidebar */}
            <aside className="col-span-3 border-r border-border bg-paper-warm/30 p-3">
              <div className="px-2 py-2 mb-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
                  <input
                    placeholder="Search clients, users, codes…"
                    className="w-full rounded-lg border border-border bg-card pl-8 pr-2 py-1.5 text-xs placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))]/30"
                  />
                </div>
              </div>
              {groups.map((g) => (
                <div key={g} className="mb-3">
                  <div className="px-2 mb-1 text-[9px] font-mono uppercase tracking-widest text-muted-foreground/70">{g}</div>
                  <ul className="space-y-0.5">
                    {NAV.filter((n) => n.group === g).map((n) => {
                      const Icon = n.icon;
                      const active = section === n.id;
                      return (
                        <li key={n.id}>
                          <button
                            onClick={() => {
                              setSection(n.id);
                              setOpenClient(null);
                            }}
                            className={`w-full flex items-center gap-2 rounded-lg px-2 py-1.5 text-xs transition-colors ${
                              active
                                ? "bg-card text-foreground shadow-soft"
                                : "text-foreground/70 hover:bg-card/60"
                            }`}
                          >
                            <Icon className={`size-3.5 ${active ? "text-[hsl(var(--emerald))]" : ""}`} />
                            <span className="flex-1 text-left">{n.label}</span>
                            {n.badge !== undefined && (
                              <span className="rounded-full bg-[hsl(var(--peach))] text-[hsl(var(--peach-ink))] px-1.5 py-0.5 text-[9px] font-semibold">
                                {n.badge}
                              </span>
                            )}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
              <div className="mt-4 mx-2 rounded-lg border border-dashed border-border p-3">
                <div className="flex items-center gap-1.5 text-[10px] font-medium text-foreground/80">
                  <Eye className="size-3" /> Impersonation off
                </div>
                <p className="mt-1 text-[10px] text-muted-foreground leading-snug">
                  View-as-user is disabled. Every session is logged.
                </p>
              </div>
            </aside>

            {/* Main */}
            <section className="col-span-9 bg-background/50 p-5 overflow-hidden">
              {section === "dashboard" && <DashboardView />}
              {section === "clients" && (
                openClient ? (
                  <ClientDetail clientId={openClient} onBack={() => setOpenClient(null)} />
                ) : (
                  <ClientsView onOpen={(id) => setOpenClient(id)} />
                )
              )}
              {section === "licences" && <LicencesView />}
              {section === "codes" && <CodesView />}
              {section === "users" && <UsersView />}
              {section === "banners" && <BannersView />}
              {section === "support" && <SupportView />}
              {section === "analytics" && <AnalyticsView />}
              {section === "audit" && <AuditView />}
              {section === "permissions" && <PermissionsView />}
              {section === "health" && <HealthView />}
            </section>
          </div>
        </AppChrome>

        <div className="mt-10 grid md:grid-cols-3 gap-4">
          {[
            { icon: ShieldCheck, t: "Built around accountability", d: "Audit log, scoped admin roles and tracked impersonation are first-class — not afterthoughts." },
            { icon: Sparkles, t: "Made for client success", d: "Renewal alerts, adoption analytics and onboarding checklists keep clients ahead of friction." },
            { icon: Activity, t: "Operational visibility", d: "Banners, support inbox and system health give the team one place to act fast." },
          ].map((b) => {
            const I = b.icon;
            return (
              <div key={b.t} className="rounded-xl border border-border bg-card p-5">
                <I className="size-4 text-[hsl(var(--emerald))]" />
                <h3 className="mt-3 text-sm font-semibold text-foreground">{b.t}</h3>
                <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">{b.d}</p>
              </div>
            );
          })}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
};

/* ============== Dashboard ============== */
const DashboardView = () => (
  <div className="space-y-5">
    <SectionTitle
      icon={LayoutDashboard}
      title="Today across Papiro"
      subtitle="A live read on customers, accounts and platform usage."
      action={
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-2.5 py-1.5 text-[11px]">
            <CalendarDays className="size-3" /> Last 7 days
          </button>
          <button className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-2.5 py-1.5 text-[11px]">
            <Download className="size-3" /> Export
          </button>
        </div>
      }
    />

    {/* Alerts strip */}
    <Card className="p-3 bg-[hsl(var(--amber-soft))]/40 border-[hsl(var(--amber-ink))]/20">
      <div className="flex items-center gap-3">
        <AlertTriangle className="size-4 text-[hsl(var(--amber-ink))]" />
        <div className="flex-1 text-xs text-foreground/80">
          <span className="font-semibold">3 licences expire within 30 days.</span>{" "}
          UGent — Faculty of Arts (30 May), VIVES pilot (14 Jun) and 1 more need follow-up.
        </div>
        <button className="text-[11px] font-medium text-[hsl(var(--amber-ink))] inline-flex items-center gap-1">
          Review <ArrowUpRight className="size-3" />
        </button>
      </div>
    </Card>

    {/* KPI grid */}
    <div className="grid grid-cols-4 gap-3">
      {[
        { label: "Active users (7d)", v: "4,128", trend: "+12%", up: true },
        { label: "Tasks submitted", v: "18,402", trend: "+8%", up: true },
        { label: "Chats extracted", v: "31,917", trend: "+21%", up: true },
        { label: "Active licences", v: "23", trend: "−1", up: false },
        { label: "Clients", v: "17", trend: "+2 this q", up: true },
        { label: "Courses", v: "118", trend: "+5", up: true },
        { label: "Teachers", v: "284", trend: "+9", up: true },
        { label: "Students", v: "9,612", trend: "+312", up: true },
      ].map((k) => (
        <Card key={k.label} className="p-3">
          <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">{k.label}</div>
          <div className="mt-1 text-xl font-semibold text-foreground">{k.v}</div>
          <div className={`mt-0.5 inline-flex items-center gap-1 text-[10px] ${k.up ? "text-[hsl(var(--emerald-deep))]" : "text-[hsl(var(--peach-ink))]"}`}>
            {k.up ? <TrendingUp className="size-3" /> : <TrendingDown className="size-3" />} {k.trend}
          </div>
        </Card>
      ))}
    </div>

    <div className="grid grid-cols-3 gap-3">
      <Card className="col-span-2 p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold">Activity by client (7d)</h3>
          <span className="text-[10px] text-muted-foreground">Active users · normalized</span>
        </div>
        <div className="space-y-2.5">
          {CLIENTS.slice(0, 5).map((c) => (
            <div key={c.id}>
              <div className="flex items-center justify-between text-[11px] mb-1">
                <span className="text-foreground/80">{c.name}</span>
                <span className="font-mono text-muted-foreground">{c.activity}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full bg-[hsl(var(--emerald))]"
                  style={{ width: `${c.activity}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>
      <Card className="p-4">
        <h3 className="text-sm font-semibold mb-3">What needs you</h3>
        <ul className="space-y-2.5 text-xs">
          {[
            { i: AlertTriangle, c: "amber", t: "UGent licence — 36 days left" },
            { i: CircleAlert, c: "peach", t: "EHB licence expired 6d ago" },
            { i: Inbox, c: "sky", t: "5 open support tickets" },
            { i: UserPlus, c: "emerald", t: "VIVES onboarding 60% complete" },
            { i: Hash, c: "amber", t: "2 inactive course codes at HOGENT" },
          ].map((a, i) => {
            const Icon = a.i;
            return (
              <li key={i} className="flex items-start gap-2">
                <Icon className={`size-3.5 mt-0.5 text-[hsl(var(--${a.c}-ink))]`} />
                <span className="text-foreground/80">{a.t}</span>
              </li>
            );
          })}
        </ul>
      </Card>
    </div>
  </div>
);

/* ============== Clients ============== */
const ClientsView = ({ onOpen }: { onOpen: (id: ClientId) => void }) => (
  <div className="space-y-4">
    <SectionTitle
      icon={Building2}
      title="Clients"
      subtitle="Open one client to see everything connected — licences, courses, codes, users, activity."
      action={
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-2.5 py-1.5 text-[11px]">
            <Filter className="size-3" /> Filter
          </button>
          <button className="inline-flex items-center gap-1.5 rounded-lg bg-foreground text-background px-2.5 py-1.5 text-[11px]">
            <Plus className="size-3" /> New client
          </button>
        </div>
      }
    />
    <Card>
      <div className="grid grid-cols-12 px-4 py-2.5 border-b border-border text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
        <div className="col-span-4">Client</div>
        <div className="col-span-2">Status</div>
        <div className="col-span-1 text-right">Licences</div>
        <div className="col-span-1 text-right">Users</div>
        <div className="col-span-2 text-right">Activity (7d)</div>
        <div className="col-span-2 text-right">Renewal</div>
      </div>
      {CLIENTS.map((c) => (
        <button
          key={c.id}
          onClick={() => onOpen(c.id)}
          className="w-full grid grid-cols-12 items-center px-4 py-3 border-b border-border last:border-0 hover:bg-paper-warm/40 transition-colors text-left"
        >
          <div className="col-span-4 flex items-center gap-2.5">
            <div className="size-8 rounded-lg bg-[hsl(var(--emerald-soft))] text-[hsl(var(--emerald-deep))] grid place-items-center text-[10px] font-semibold">
              {c.short}
            </div>
            <div>
              <div className="text-xs font-semibold text-foreground">{c.name}</div>
              <div className="text-[10px] text-muted-foreground">{c.type}</div>
            </div>
          </div>
          <div className="col-span-2"><StatusPill status={c.status} /></div>
          <div className="col-span-1 text-right text-xs font-mono">{c.licences}</div>
          <div className="col-span-1 text-right text-xs font-mono">{c.users.toLocaleString()}</div>
          <div className="col-span-2 flex items-center justify-end gap-2">
            <div className="h-1 w-16 rounded-full bg-muted overflow-hidden">
              <div className="h-full bg-[hsl(var(--emerald))]" style={{ width: `${c.activity}%` }} />
            </div>
            <span className="text-[10px] font-mono text-muted-foreground">{c.activity}%</span>
          </div>
          <div className="col-span-2 text-right text-[11px] text-foreground/80 inline-flex items-center justify-end gap-1">
            {c.renewal}
            <ChevronRight className="size-3 text-muted-foreground" />
          </div>
        </button>
      ))}
    </Card>
  </div>
);

/* ============== Client detail ============== */
const ClientDetail = ({ clientId, onBack }: { clientId: ClientId; onBack: () => void }) => {
  const c = CLIENTS.find((x) => x.id === clientId)!;
  const [tab, setTab] = useState<"overview" | "licences" | "courses" | "users" | "activity" | "notes">("overview");
  return (
    <div className="space-y-4">
      <button onClick={onBack} className="text-[11px] text-muted-foreground hover:text-foreground inline-flex items-center gap-1">
        <ChevronRight className="size-3 rotate-180" /> All clients
      </button>
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="size-12 rounded-xl bg-[hsl(var(--emerald-soft))] text-[hsl(var(--emerald-deep))] grid place-items-center text-sm font-semibold">
            {c.short}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-semibold text-foreground">{c.name}</h2>
              <StatusPill status={c.status} />
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">{c.type} · Renewal {c.renewal} · Contact {c.contact}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-2.5 py-1.5 text-[11px]"><Eye className="size-3" /> View as client admin</button>
          <button className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-2.5 py-1.5 text-[11px]"><Mail className="size-3" /> Send invite</button>
          <button className="inline-flex items-center gap-1.5 rounded-lg bg-foreground text-background px-2.5 py-1.5 text-[11px]"><Pencil className="size-3" /> Edit client</button>
        </div>
      </div>

      {/* Onboarding checklist */}
      <Card className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xs font-semibold inline-flex items-center gap-1.5"><ListChecks className="size-3.5 text-[hsl(var(--emerald))]" /> Onboarding checklist</h3>
          <span className="text-[10px] font-mono text-muted-foreground">{c.onboarding}% complete</span>
        </div>
        <div className="h-1.5 rounded-full bg-muted overflow-hidden mb-3">
          <div className="h-full bg-[hsl(var(--emerald))]" style={{ width: `${c.onboarding}%` }} />
        </div>
        <div className="grid grid-cols-4 gap-2 text-[11px]">
          {[
            ["Licence created", true],
            ["Faculty admin added", true],
            ["Teachers invited", c.onboarding >= 75],
            ["Course codes created", c.onboarding >= 75],
            ["Students imported", c.onboarding >= 100],
            ["First course active", c.onboarding >= 100],
            ["First task submitted", c.onboarding >= 100],
            ["Announcement configured", false],
          ].map(([label, done]) => (
            <div key={label as string} className="flex items-center gap-1.5">
              {done ? (
                <CheckCircle2 className="size-3.5 text-[hsl(var(--emerald))]" />
              ) : (
                <CircleDot className="size-3.5 text-muted-foreground/60" />
              )}
              <span className={done ? "text-foreground/80" : "text-muted-foreground"}>{label}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Tabs */}
      <div className="flex items-center gap-1 border-b border-border">
        {(["overview", "licences", "courses", "users", "activity", "notes"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-3 py-1.5 text-[11px] capitalize border-b-2 -mb-px ${
              tab === t ? "border-[hsl(var(--emerald))] text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "overview" && (
        <div className="grid grid-cols-4 gap-3">
          {[
            { l: "Active licences", v: c.licences, i: KeyRound },
            { l: "Total users", v: c.users.toLocaleString(), i: Users },
            { l: "Courses", v: c.courses, i: GraduationCap },
            { l: "Course codes", v: c.codes, i: Hash },
            { l: "Teachers", v: c.teachers, i: School },
            { l: "Students", v: c.students.toLocaleString(), i: Users },
            { l: "Faculty admins", v: c.facultyAdmins, i: ShieldCheck },
            { l: "Tasks submitted", v: c.tasks.toLocaleString(), i: FileText },
          ].map((s) => {
            const I = s.i;
            return (
              <Card key={s.l} className="p-3">
                <I className="size-3.5 text-[hsl(var(--emerald))]" />
                <div className="mt-2 text-[10px] font-mono uppercase tracking-wider text-muted-foreground">{s.l}</div>
                <div className="text-lg font-semibold">{s.v}</div>
              </Card>
            );
          })}
        </div>
      )}

      {tab === "licences" && (
        <Card className="overflow-hidden">
          {[
            { name: "Yearly institution", type: "Unlimited", start: "12 Sep 2025", end: "12 Sep 2026", users: "1,520 / ∞", status: "active" },
            { name: "Faculty pilot", type: "200 students", start: "01 Feb 2026", end: "30 Jun 2026", users: "184 / 200", status: "expiring" },
            { name: "Trial — Law", type: "50 students", start: "10 Mar 2026", end: "10 May 2026", users: "32 / 50", status: "active" },
          ].map((l, i) => (
            <div key={i} className="flex items-center justify-between px-4 py-3 border-b border-border last:border-0">
              <div>
                <div className="text-xs font-semibold">{l.name}</div>
                <div className="text-[10px] text-muted-foreground">{l.type} · {l.start} → {l.end}</div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[11px] font-mono">{l.users}</span>
                <StatusPill status={l.status} />
                <button className="text-[10px] text-muted-foreground hover:text-foreground"><MoreHorizontal className="size-3.5" /></button>
              </div>
            </div>
          ))}
        </Card>
      )}

      {tab === "courses" && (
        <Card className="p-4 text-xs text-muted-foreground">
          <div className="grid grid-cols-3 gap-3">
            {["Academic writing 101", "Critical thinking", "Bachelor thesis seminar", "Methodology", "Ethics of AI", "Master's seminar"].map((co, i) => (
              <div key={co} className="rounded-lg border border-border p-3">
                <div className="text-xs font-semibold text-foreground">{co}</div>
                <div className="mt-1 text-[10px]">Code: PAP-{1000 + i} · 32 students · 1 teacher</div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {tab === "users" && (
        <Card>
          <div className="grid grid-cols-12 px-4 py-2 border-b border-border text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
            <div className="col-span-4">User</div>
            <div className="col-span-3">Role</div>
            <div className="col-span-3">Linked to</div>
            <div className="col-span-2">Status</div>
          </div>
          {[
            { n: "Margot Devlieger", e: "margot@kuleuven.be", r: "Faculty admin", l: "All faculties", s: "active" },
            { n: "Jan Peeters", e: "jan.peeters@kuleuven.be", r: "Teacher", l: "Academic writing 101", s: "active" },
            { n: "Sara Aerts", e: "sara.aerts@student.kuleuven.be", r: "Student", l: "PAP-1003", s: "active" },
            { n: "Tom Janssens", e: "tom.j@kuleuven.be", r: "Teacher", l: "Methodology", s: "trial" },
          ].map((u, i) => (
            <div key={i} className="grid grid-cols-12 items-center px-4 py-2.5 border-b border-border last:border-0 text-xs">
              <div className="col-span-4">
                <div className="font-medium">{u.n}</div>
                <div className="text-[10px] text-muted-foreground">{u.e}</div>
              </div>
              <div className="col-span-3 text-foreground/80">{u.r}</div>
              <div className="col-span-3 text-muted-foreground">{u.l}</div>
              <div className="col-span-2"><StatusPill status={u.s} /></div>
            </div>
          ))}
        </Card>
      )}

      {tab === "activity" && (
        <Card className="p-4 space-y-2">
          {[
            { w: "This week", v: 87, t: "1,420 active users · 312 tasks · 940 chats" },
            { w: "Last week", v: 82, t: "1,360 active users · 298 tasks · 892 chats" },
            { w: "2 weeks ago", v: 74, t: "1,210 active users · 250 tasks · 740 chats" },
            { w: "3 weeks ago", v: 69, t: "1,140 active users · 220 tasks · 680 chats" },
          ].map((a) => (
            <div key={a.w}>
              <div className="flex items-center justify-between text-[11px] mb-1">
                <span className="text-foreground/80">{a.w}</span>
                <span className="text-muted-foreground">{a.t}</span>
              </div>
              <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                <div className="h-full bg-[hsl(var(--emerald))]" style={{ width: `${a.v}%` }} />
              </div>
            </div>
          ))}
        </Card>
      )}

      {tab === "notes" && (
        <Card className="p-4 space-y-3">
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">Renewal date</div>
              <div className="font-medium">{c.renewal}</div>
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">Contract contact</div>
              <div className="font-medium">{c.contact}</div>
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">Pricing tier</div>
              <div className="font-medium">Institutional · negotiated</div>
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">Onboarding owner</div>
              <div className="font-medium">Anouk · Papiro</div>
            </div>
          </div>
          <div className="rounded-lg border border-border bg-paper-warm/40 p-3 text-xs text-foreground/80 leading-relaxed">
            <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground block mb-1">Internal note · 18 Apr</span>
            Renewal call planned 12 May with Margot. They want a usage report for the philosophy faculty + a quick demo of the new form builder for the dean. Special agreement: faculty admins can self-serve up to 5 extra course codes per term.
          </div>
        </Card>
      )}
    </div>
  );
};

/* ============== Licences ============== */
const LicencesView = () => (
  <div className="space-y-4">
    <SectionTitle
      icon={KeyRound}
      title="Licences"
      subtitle="Create from a template, monitor validity, extend or deactivate."
      action={
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-2.5 py-1.5 text-[11px]"><FileText className="size-3" /> Templates</button>
          <button className="inline-flex items-center gap-1.5 rounded-lg bg-foreground text-background px-2.5 py-1.5 text-[11px]"><Plus className="size-3" /> New licence</button>
        </div>
      }
    />

    <div className="grid grid-cols-3 gap-3">
      {[
        { t: "Trial", d: "30 days · 50 students · 2 teachers", c: "sky" },
        { t: "Semester", d: "5 months · scoped to one course", c: "emerald" },
        { t: "Yearly institution", d: "12 months · unlimited users", c: "amber" },
        { t: "Limited student", d: "Capped seats · per faculty", c: "peach" },
        { t: "Unlimited faculty", d: "All courses inside a faculty", c: "emerald" },
        { t: "Pilot project", d: "90 days · 200 students · evaluation", c: "sky" },
      ].map((tpl) => (
        <Card key={tpl.t} className="p-3">
          <div className={`inline-flex items-center gap-1 rounded-full bg-[hsl(var(--${tpl.c}-soft))] text-[hsl(var(--${tpl.c}-ink))] px-2 py-0.5 text-[10px] font-medium`}>Template</div>
          <div className="mt-2 text-sm font-semibold">{tpl.t}</div>
          <div className="text-[11px] text-muted-foreground">{tpl.d}</div>
        </Card>
      ))}
    </div>

    <Card>
      <div className="grid grid-cols-12 px-4 py-2.5 border-b border-border text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
        <div className="col-span-3">Client</div>
        <div className="col-span-2">Type</div>
        <div className="col-span-2">Period</div>
        <div className="col-span-2">Users</div>
        <div className="col-span-2">Status</div>
        <div className="col-span-1 text-right">Actions</div>
      </div>
      {[
        { c: "KU Leuven", t: "Yearly institution", p: "12 Sep 25 → 12 Sep 26", u: "1,520 / ∞", s: "active" },
        { c: "UGent — Arts", t: "Yearly faculty", p: "30 May 25 → 30 May 26", u: "612 / 800", s: "expiring" },
        { c: "VIVES", t: "Pilot project", p: "14 Mar 26 → 14 Jun 26", u: "184 / 200", s: "trial" },
        { c: "HOGENT", t: "Semester", p: "01 Feb 26 → 30 Jun 26", u: "640 / 800", s: "active" },
        { c: "EHB", t: "Yearly institution", p: "18 Apr 25 → 18 Apr 26", u: "0 / 1,200", s: "expired" },
      ].map((l, i) => (
        <div key={i} className="grid grid-cols-12 items-center px-4 py-3 border-b border-border last:border-0 text-xs">
          <div className="col-span-3 font-semibold">{l.c}</div>
          <div className="col-span-2 text-foreground/80">{l.t}</div>
          <div className="col-span-2 text-muted-foreground">{l.p}</div>
          <div className="col-span-2 font-mono">{l.u}</div>
          <div className="col-span-2"><StatusPill status={l.s} /></div>
          <div className="col-span-1 flex justify-end gap-1.5">
            <button title="Extend" className="rounded p-1 hover:bg-muted"><RefreshCw className="size-3.5" /></button>
            <button title="Deactivate" className="rounded p-1 hover:bg-muted"><PauseCircle className="size-3.5" /></button>
          </div>
        </div>
      ))}
    </Card>
  </div>
);

/* ============== Course codes ============== */
const CodesView = () => (
  <div className="space-y-4">
    <SectionTitle
      icon={Hash}
      title="Course codes"
      subtitle="Each code links a licence, course, teacher and a student group."
      action={<button className="inline-flex items-center gap-1.5 rounded-lg bg-foreground text-background px-2.5 py-1.5 text-[11px]"><Plus className="size-3" /> New code</button>}
    />
    <Card>
      <div className="grid grid-cols-12 px-4 py-2.5 border-b border-border text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
        <div className="col-span-2">Code</div>
        <div className="col-span-3">Course</div>
        <div className="col-span-2">Client</div>
        <div className="col-span-2">Teacher</div>
        <div className="col-span-1 text-right">Users</div>
        <div className="col-span-2">Status</div>
      </div>
      {[
        { code: "PAP-1001", co: "Academic writing 101", cl: "KU Leuven", te: "Jan Peeters", u: 142, s: "active" },
        { code: "PAP-1002", co: "Bachelor thesis seminar", cl: "KU Leuven", te: "Margot Devlieger", u: 38, s: "active" },
        { code: "PAP-2014", co: "Critical thinking", cl: "UGent — Arts", te: "Jeroen Verhaeghe", u: 88, s: "active" },
        { code: "PAP-2050", co: "Methodology", cl: "HOGENT", te: "—", u: 0, s: "expired" },
        { code: "PAP-3007", co: "Ethics of AI", cl: "VIVES", te: "Lieselot V.", u: 24, s: "trial" },
      ].map((c, i) => (
        <div key={i} className="grid grid-cols-12 items-center px-4 py-3 border-b border-border last:border-0 text-xs">
          <div className="col-span-2 font-mono font-semibold">{c.code}</div>
          <div className="col-span-3">{c.co}</div>
          <div className="col-span-2 text-foreground/80">{c.cl}</div>
          <div className="col-span-2 text-muted-foreground">{c.te}</div>
          <div className="col-span-1 text-right font-mono">{c.u}</div>
          <div className="col-span-2"><StatusPill status={c.s} /></div>
        </div>
      ))}
    </Card>
  </div>
);

/* ============== Users ============== */
const UsersView = () => (
  <div className="space-y-4">
    <SectionTitle
      icon={Users}
      title="User accounts"
      subtitle="Manage individuals or run bulk actions for entire cohorts."
      action={
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-2.5 py-1.5 text-[11px]"><Upload className="size-3" /> CSV import</button>
          <button className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-2.5 py-1.5 text-[11px]"><Mail className="size-3" /> Invite link</button>
          <button className="inline-flex items-center gap-1.5 rounded-lg bg-foreground text-background px-2.5 py-1.5 text-[11px]"><UserPlus className="size-3" /> New account</button>
        </div>
      }
    />

    <Card className="p-3">
      <div className="flex items-center gap-2 text-[11px]">
        <span className="text-muted-foreground">Bulk actions:</span>
        {["Assign to course", "Link to licence", "Change role", "Deactivate", "Resend invite"].map((b) => (
          <button key={b} className="rounded-full border border-border px-2.5 py-1 hover:bg-muted">{b}</button>
        ))}
      </div>
    </Card>

    <Card>
      <div className="grid grid-cols-12 px-4 py-2.5 border-b border-border text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
        <div className="col-span-1"><input type="checkbox" /></div>
        <div className="col-span-3">Name</div>
        <div className="col-span-2">Role</div>
        <div className="col-span-2">Client</div>
        <div className="col-span-2">Course</div>
        <div className="col-span-2">Status</div>
      </div>
      {[
        { n: "Margot Devlieger", r: "Faculty admin", c: "KU Leuven", co: "—", s: "active" },
        { n: "Jan Peeters", r: "Teacher", c: "KU Leuven", co: "PAP-1001", s: "active" },
        { n: "Sara Aerts", r: "Student", c: "KU Leuven", co: "PAP-1003", s: "active" },
        { n: "Lieselot Vermeulen", r: "Faculty admin", c: "VIVES", co: "—", s: "trial" },
        { n: "Tom De Backer", r: "Client admin", c: "HOGENT", co: "—", s: "active" },
        { n: "An Vanderbeek", r: "Faculty admin", c: "EHB", co: "—", s: "expired" },
      ].map((u, i) => (
        <div key={i} className="grid grid-cols-12 items-center px-4 py-2.5 border-b border-border last:border-0 text-xs">
          <div className="col-span-1"><input type="checkbox" /></div>
          <div className="col-span-3 font-medium">{u.n}</div>
          <div className="col-span-2 text-foreground/80">{u.r}</div>
          <div className="col-span-2 text-foreground/80">{u.c}</div>
          <div className="col-span-2 font-mono text-muted-foreground">{u.co}</div>
          <div className="col-span-2"><StatusPill status={u.s} /></div>
        </div>
      ))}
    </Card>
  </div>
);

/* ============== Banners ============== */
const BannersView = () => {
  const [active, setActive] = useState(true);
  const [audience, setAudience] = useState<string>("All users");
  const [message, setMessage] = useState("Scheduled maintenance on Sunday 28 Apr, 22:00–23:00 CET. Submissions paused for 1 hour.");
  return (
    <div className="space-y-4">
      <SectionTitle
        icon={Megaphone}
        title="Platform banners"
        subtitle="Send a focused message to everyone or a specific audience."
      />
      <div className="grid grid-cols-2 gap-4">
        <Card className="p-4 space-y-3">
          <div>
            <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground mb-1">Message</div>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs resize-none focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))]/30"
            />
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground mb-1">Start</div>
              <input className="w-full rounded-lg border border-border bg-background px-2 py-1.5 text-xs" defaultValue="28 Apr 2026 · 18:00" />
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground mb-1">End</div>
              <input className="w-full rounded-lg border border-border bg-background px-2 py-1.5 text-xs" defaultValue="29 Apr 2026 · 00:00" />
            </div>
          </div>
          <div>
            <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground mb-1">Audience</div>
            <div className="flex flex-wrap gap-1.5">
              {["All users", "KU Leuven", "UGent — Arts", "Only teachers", "Only students", "Faculty admins", "Pilot licence"].map((a) => (
                <button
                  key={a}
                  onClick={() => setAudience(a)}
                  className={`rounded-full px-2.5 py-1 text-[10px] border ${
                    audience === a
                      ? "bg-foreground text-background border-foreground"
                      : "border-border text-foreground/70 hover:bg-muted"
                  }`}
                >
                  {a}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between pt-1">
            <label className="inline-flex items-center gap-2 text-xs">
              <button
                onClick={() => setActive(!active)}
                className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-[10px] font-medium ${active ? "bg-[hsl(var(--emerald-soft))] text-[hsl(var(--emerald-deep))]" : "bg-muted text-muted-foreground"}`}
              >
                {active ? <PlayCircle className="size-3" /> : <PauseCircle className="size-3" />}
                {active ? "Active" : "Paused"}
              </button>
            </label>
            <button className="inline-flex items-center gap-1.5 rounded-lg bg-foreground text-background px-2.5 py-1.5 text-[11px]"><Send className="size-3" /> Save & publish</button>
          </div>
        </Card>

        <Card className="p-4">
          <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground mb-2">Live preview · {audience}</div>
          <div className="rounded-lg border border-border overflow-hidden">
            {active && (
              <div className="bg-[hsl(var(--amber-soft))] text-[hsl(var(--amber-ink))] px-3 py-2 text-[11px] flex items-center gap-2">
                <Megaphone className="size-3.5" /> {message}
              </div>
            )}
            <div className="p-4 bg-background">
              <div className="h-2 w-24 rounded bg-muted mb-2" />
              <div className="h-2 w-40 rounded bg-muted mb-4" />
              <div className="grid grid-cols-3 gap-2">
                <div className="h-12 rounded bg-muted/60" />
                <div className="h-12 rounded bg-muted/60" />
                <div className="h-12 rounded bg-muted/60" />
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

/* ============== Support ============== */
const SupportView = () => (
  <div className="space-y-4">
    <SectionTitle icon={LifeBuoy} title="Support inbox" subtitle="Reported issues, access problems and questions from clients." />
    <div className="grid grid-cols-3 gap-3">
      {[
        { l: "Open", v: 5, c: "amber" },
        { l: "Waiting on client", v: 3, c: "sky" },
        { l: "Resolved (7d)", v: 12, c: "emerald" },
      ].map((k) => (
        <Card key={k.l} className="p-3">
          <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">{k.l}</div>
          <div className="text-2xl font-semibold mt-1">{k.v}</div>
        </Card>
      ))}
    </div>
    <Card>
      {[
        { c: "KU Leuven", t: "Student can't access PAP-1003", p: "high", a: "Anouk", age: "14m ago" },
        { c: "UGent — Arts", t: "Chat extraction failing on long Claude logs", p: "medium", a: "Tom", age: "1h ago" },
        { c: "VIVES", t: "Bulk invite mail bounced for 12 students", p: "high", a: "Anouk", age: "3h ago" },
        { c: "HOGENT", t: "Faculty admin requests CSV export by course", p: "low", a: "—", age: "Yesterday" },
        { c: "EHB", t: "Renewal question — pricing for 25/26", p: "medium", a: "Sales", age: "Yesterday" },
      ].map((t, i) => (
        <div key={i} className="grid grid-cols-12 items-center px-4 py-3 border-b border-border last:border-0 text-xs gap-2">
          <div className="col-span-3 font-semibold">{t.c}</div>
          <div className="col-span-5 text-foreground/80">{t.t}</div>
          <div className="col-span-2">
            <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
              t.p === "high" ? "bg-[hsl(var(--peach))] text-[hsl(var(--peach-ink))]" :
              t.p === "medium" ? "bg-[hsl(var(--amber-soft))] text-[hsl(var(--amber-ink))]" :
              "bg-muted text-muted-foreground"
            }`}>{t.p}</span>
          </div>
          <div className="col-span-1 text-muted-foreground">{t.a}</div>
          <div className="col-span-1 text-right text-[10px] text-muted-foreground inline-flex items-center justify-end gap-1"><Clock className="size-3" /> {t.age}</div>
        </div>
      ))}
    </Card>
  </div>
);

/* ============== Analytics ============== */
const AnalyticsView = () => (
  <div className="space-y-4">
    <SectionTitle
      icon={Activity}
      title="Usage analytics"
      subtitle="Spot adoption issues early and prove value at renewal time."
      action={<button className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-2.5 py-1.5 text-[11px]"><Download className="size-3" /> Export report</button>}
    />
    <div className="grid grid-cols-2 gap-3">
      <Card className="p-4">
        <h3 className="text-sm font-semibold mb-3">Adoption rate per course (KU Leuven)</h3>
        {[
          { n: "Academic writing 101", v: 92 },
          { n: "Bachelor thesis seminar", v: 81 },
          { n: "Critical thinking", v: 67 },
          { n: "Ethics of AI", v: 54 },
          { n: "Methodology", v: 38 },
        ].map((r) => (
          <div key={r.n} className="mb-2">
            <div className="flex items-center justify-between text-[11px] mb-1">
              <span className="text-foreground/80">{r.n}</span>
              <span className="font-mono text-muted-foreground">{r.v}%</span>
            </div>
            <div className="h-1.5 rounded-full bg-muted overflow-hidden">
              <div className="h-full bg-[hsl(var(--emerald))]" style={{ width: `${r.v}%` }} />
            </div>
          </div>
        ))}
      </Card>
      <Card className="p-4">
        <h3 className="text-sm font-semibold mb-3">Inactive users · last 14 days</h3>
        <ul className="text-xs space-y-2">
          {[
            { c: "EHB", v: 412 },
            { c: "VIVES", v: 64 },
            { c: "HOGENT", v: 58 },
            { c: "UGent — Arts", v: 24 },
            { c: "KU Leuven", v: 81 },
          ].map((r) => (
            <li key={r.c} className="flex items-center justify-between">
              <span className="text-foreground/80">{r.c}</span>
              <span className="font-mono text-muted-foreground">{r.v} users</span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  </div>
);

/* ============== Audit ============== */
const AuditView = () => (
  <div className="space-y-4">
    <SectionTitle icon={ScrollText} title="Audit log" subtitle="Every meaningful action is recorded — including impersonation." />
    <Card>
      {[
        { who: "Anouk", a: "extended licence", o: "KU Leuven · Yearly institution → 12 Sep 2027", t: "2m ago" },
        { who: "Tom", a: "impersonated", o: "Student · sara.aerts@student.kuleuven.be · 8 min", t: "12m ago" },
        { who: "Sales", a: "created licence", o: "VIVES · Pilot 200 students", t: "1h ago" },
        { who: "Anouk", a: "deactivated banner", o: "Maintenance 21 Apr", t: "Yesterday" },
        { who: "Tom", a: "edited course code", o: "PAP-2014 · linked to Jeroen Verhaeghe", t: "Yesterday" },
        { who: "System", a: "auto-suspended licence", o: "EHB · expired", t: "6 days ago" },
      ].map((e, i) => (
        <div key={i} className="grid grid-cols-12 items-center px-4 py-2.5 border-b border-border last:border-0 text-xs">
          <div className="col-span-2 font-semibold">{e.who}</div>
          <div className="col-span-2 text-[hsl(var(--emerald-deep))]">{e.a}</div>
          <div className="col-span-6 text-foreground/80">{e.o}</div>
          <div className="col-span-2 text-right text-[10px] text-muted-foreground">{e.t}</div>
        </div>
      ))}
    </Card>
  </div>
);

/* ============== Permissions ============== */
const PermissionsView = () => (
  <div className="space-y-4">
    <SectionTitle icon={ShieldCheck} title="Internal admin roles" subtitle="Scope what each teammate can see and do." />
    <div className="grid grid-cols-5 gap-3">
      {[
        { r: "Super admin", who: "Anouk", scope: "Everything" },
        { r: "Support admin", who: "Tom", scope: "Users, support, impersonate" },
        { r: "Sales / Account", who: "Eva", scope: "Clients, licences, notes" },
        { r: "Technical admin", who: "Wout", scope: "System health, audit, banners" },
        { r: "Read-only", who: "Investor view", scope: "Dashboard & analytics" },
      ].map((p) => (
        <Card key={p.r} className="p-3">
          <div className="text-xs font-semibold">{p.r}</div>
          <div className="mt-1 text-[11px] text-muted-foreground">{p.who}</div>
          <div className="mt-2 text-[11px] text-foreground/80">{p.scope}</div>
        </Card>
      ))}
    </div>
    <Card className="p-4">
      <h3 className="text-sm font-semibold mb-3">Permission matrix</h3>
      <div className="overflow-hidden rounded-lg border border-border">
        <div className="grid grid-cols-6 px-3 py-2 bg-paper-warm/40 text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
          <div className="col-span-2">Capability</div>
          <div>Super</div>
          <div>Support</div>
          <div>Sales</div>
          <div>Tech</div>
        </div>
        {[
          ["Create licence", "✓", "—", "✓", "—"],
          ["Edit user account", "✓", "✓", "—", "—"],
          ["Impersonate user", "✓", "✓", "—", "—"],
          ["Publish banner", "✓", "—", "—", "✓"],
          ["View audit log", "✓", "✓", "—", "✓"],
          ["Manage admin roles", "✓", "—", "—", "—"],
        ].map((row, i) => (
          <div key={i} className="grid grid-cols-6 items-center px-3 py-2 border-t border-border text-xs">
            <div className="col-span-2 text-foreground/80">{row[0]}</div>
            {row.slice(1).map((c, j) => (
              <div key={j} className={c === "✓" ? "text-[hsl(var(--emerald-deep))] font-semibold" : "text-muted-foreground"}>{c}</div>
            ))}
          </div>
        ))}
      </div>
    </Card>
  </div>
);

/* ============== Health ============== */
const HealthView = () => (
  <div className="space-y-4">
    <SectionTitle icon={Heart} title="System health" subtitle="A quick read on the services that keep Papiro running." />
    <div className="grid grid-cols-3 gap-3">
      {[
        { i: Server, n: "Website", s: "ok", d: "All regions · 142ms p95" },
        { i: Database, n: "Database", s: "ok", d: "Primary + replica healthy" },
        { i: MessagesSquare, n: "Chat extraction", s: "warn", d: "Claude long-log job slow · investigating" },
        { i: FileText, n: "Task submission", s: "ok", d: "0 errors in 24h" },
        { i: Mail, n: "Email invitations", s: "ok", d: "98.7% delivered today" },
        { i: ShieldCheck, n: "Login & SSO", s: "ok", d: "Microsoft + Google OK" },
      ].map((s) => {
        const I = s.i;
        const ok = s.s === "ok";
        return (
          <Card key={s.n} className="p-3">
            <div className="flex items-center justify-between">
              <I className="size-4 text-foreground/70" />
              <span className={`inline-flex items-center gap-1 text-[10px] font-medium ${ok ? "text-[hsl(var(--emerald-deep))]" : "text-[hsl(var(--amber-ink))]"}`}>
                {ok ? <CircleCheck className="size-3" /> : <CircleAlert className="size-3" />} {ok ? "Operational" : "Degraded"}
              </span>
            </div>
            <div className="mt-2 text-sm font-semibold">{s.n}</div>
            <div className="text-[11px] text-muted-foreground">{s.d}</div>
          </Card>
        );
      })}
    </div>
    <Card className="p-4">
      <h3 className="text-sm font-semibold mb-2 inline-flex items-center gap-1.5"><Bell className="size-3.5 text-[hsl(var(--emerald))]" /> Recent errors</h3>
      <ul className="text-xs space-y-1.5 font-mono text-muted-foreground">
        <li>14:32 · chat-extract · timeout on 4MB transcript · auto-retried (success)</li>
        <li>11:08 · email · soft bounce x12 (vives.be) · queued</li>
        <li>09:47 · auth · MS Entra slow response 2.1s · resolved</li>
      </ul>
    </Card>
  </div>
);

export default InternalAdmin;
