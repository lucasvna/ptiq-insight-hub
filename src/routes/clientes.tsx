import { createFileRoute } from "@tanstack/react-router";
import { clientes, formatBRL } from "@/lib/petiq-data";

export const Route = createFileRoute("/clientes")({
  component: ClientesPage,
  head: () => ({ meta: [{ title: "Clientes — PetIQ" }] }),
});

function ClientesPage() {
  const total = clientes.reduce((s, c) => s + c.gasto, 0);
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-semibold text-foreground">Clientes</h1>
        <p className="text-muted-foreground mt-1">Quem mais visita, quem mais gasta e quem precisa de atenção.</p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-card border border-border rounded-xl p-5">
          <div className="text-sm text-muted-foreground">Top clientes (12 meses)</div>
          <div className="text-3xl font-semibold mt-2">{clientes.length}</div>
        </div>
        <div className="bg-card border border-border rounded-xl p-5">
          <div className="text-sm text-muted-foreground">Receita gerada</div>
          <div className="text-3xl font-semibold mt-2">{formatBRL(total)}</div>
        </div>
        <div className="bg-card border border-border rounded-xl p-5">
          <div className="text-sm text-muted-foreground">Gasto médio</div>
          <div className="text-3xl font-semibold mt-2 text-accent">{formatBRL(Math.round(total / clientes.length))}</div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 text-muted-foreground text-left">
            <tr>
              <th className="px-5 py-3 font-medium">Tutor</th>
              <th className="px-5 py-3 font-medium">Pet</th>
              <th className="px-5 py-3 font-medium text-right">Visitas</th>
              <th className="px-5 py-3 font-medium text-right">Gasto total</th>
              <th className="px-5 py-3 font-medium">Última visita</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((c) => (
              <tr key={c.tutor} className="border-t border-border">
                <td className="px-5 py-3 font-medium">{c.tutor}</td>
                <td className="px-5 py-3 text-muted-foreground">{c.pet}</td>
                <td className="px-5 py-3 text-right">{c.visitas}</td>
                <td className="px-5 py-3 text-right font-semibold text-accent">{formatBRL(c.gasto)}</td>
                <td className="px-5 py-3 text-muted-foreground">{c.ultima}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}