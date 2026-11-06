"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ROLE_LABEL, type Role } from "@/auth/roles";
import { StopControl } from "./StopControl";
import { ThemeToggle } from "./ThemeToggle";

// Icons are 24x24 stroke paths, decorative only: the visible label is each link's accessible name.
const ICONS: Record<string, string> = {
  "/": "M4 6h16M4 12h10M4 18h7M17 15l2 2 4-4",
  "/compare": "M7 4v16M17 4v16M3 8l4-4 4 4M13 16l4 4 4-4",
  "/backtest": "M3 12a9 9 0 1 0 3-6.7M3 4v5h5M12 7v5l3 2",
  "/data": "M4 6c0-1.7 3.6-3 8-3s8 1.3 8 3-3.6 3-8 3-8-1.3-8-3zM4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3",
  "/zoho": "M4 7h16v13H4zM8 7V4h8v3M9 13h6",
  "/outcomes": "M4 20V10M10 20V4M16 20v-7M22 20H2",
  "/health": "M3 12h4l3-8 4 16 3-8h4",
  "/settings": "M4 7h10M18 7h2M16 5v4M4 17h4M12 17h8M10 15v4",
};

const GROUPS: { title: string; links: { href: string; label: string }[] }[] = [
  { title: "Plan", links: [{ href: "/", label: "Review" }, { href: "/compare", label: "Compare" }, { href: "/backtest", label: "Backtest" }] },
  { title: "Data", links: [{ href: "/data", label: "Data" }, { href: "/zoho", label: "Zoho" }, { href: "/outcomes", label: "Outcomes" }] },
  { title: "Control", links: [{ href: "/health", label: "Health" }, { href: "/settings", label: "Settings" }] },
];

export function Nav({ userName, role, killed, guest = false }: { userName: string; role: Role | null; killed: boolean; guest?: boolean }) {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  }

  const who = guest ? "Guest · open access" : role ? `${userName} · ${ROLE_LABEL[role]}` : "Viewing only";

  return (
    <header className="side">
      <Link href="/" className="brand">
        <span className="brand-mark" aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
            <path d="M12 21v-9" /><path d="M12 12c0-4 3-7 8-7 0 5-3 8-8 7z" /><path d="M12 15c0-3-2-5-6-5 0 4 2 6 6 5z" />
          </svg>
        </span>
        <span className="brand-text">Freshroots<small>Demand planner</small></span>
      </Link>

      <nav className="nav" aria-label="Main">
        {GROUPS.map((g) => (
          <div className="nav-group" key={g.title}>
            <span className="nav-title" aria-hidden="true">{g.title}</span>
            {g.links.map((l) => {
              const active = l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);
              return (
                <Link key={l.href} href={l.href} aria-current={active ? "page" : undefined}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d={ICONS[l.href]} />
                  </svg>
                  {l.label}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      <div className="side-foot">
        {killed ? <span className="chip chip-stockout" data-testid="killed-chip">STOPPED</span> : role ? <StopControl /> : null}
        <div className="side-user">
          <span className="avatar" aria-hidden="true">{(guest ? "G" : userName.trim()[0] ?? "?").toUpperCase()}</span>
          <span className="user-chip" data-testid="user-chip">{who}</span>
          <ThemeToggle />
        </div>
        {role && !guest ? (
          <button type="button" className="btn btn-ghost btn-sm side-signout" onClick={logout}>Sign out</button>
        ) : (
          <Link href="/login" className="btn btn-sm side-signin" data-testid="nav-signin">Sign in</Link>
        )}
      </div>
    </header>
  );
}
