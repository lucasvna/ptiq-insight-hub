import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import { LayoutDashboard, Package, Users, Stethoscope, TrendingUp, PawPrint } from "lucide-react";

const nav = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/estoque", label: "Estoque", icon: Package },
  { to: "/clientes", label: "Clientes", icon: Users },
  { to: "/servicos", label: "Serviços", icon: Stethoscope },
  { to: "/receita", label: "Receita", icon: TrendingUp },
] as const;

export function PetIQLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="min-h-screen flex w-full bg-background text-foreground">
      <aside className="hidden md:flex w-64 flex-col border-r border-border bg-primary text-primary-foreground">
        <div className="px-6 py-6 flex items-center gap-2 border-b border-white/10">
          <div className="w-9 h-9 rounded-lg bg-accent flex items-center justify-center">
            <PawPrint className="w-5 h-5 text-primary" />
          </div>
          <div>
            <div className="font-bold text-lg leading-none">PetIQ</div>
            <div className="text-xs text-primary-foreground/60 mt-1">SIE Veterinário</div>
          </div>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          {nav.map(({ to, label, icon: Icon }) => {
            const active = pathname === to;
            return (
              <Link
                key={to}
                to={to}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  active
                    ? "bg-accent text-accent-foreground font-medium"
                    : "text-primary-foreground/70 hover:text-primary-foreground hover:bg-white/5"
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </Link>
            );
          })}
        </nav>
        <div className="px-6 py-4 border-t border-white/10 text-xs text-primary-foreground/50">
          Dra. Helena Costa<br />
          Clínica VetCare Centro
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="md:hidden bg-primary text-primary-foreground px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <PawPrint className="w-5 h-5 text-accent" />
            <span className="font-bold">PetIQ</span>
          </div>
        </header>
        <main className="flex-1 px-6 md:px-10 py-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}