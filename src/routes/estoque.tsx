import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle, Package } from "lucide-react";
import { estoque } from "@/lib/petiq-data";

export const Route = createFileRoute("/estoque")({
  component: EstoquePage,
  head: () => ({ meta: [{ title: "Estoque — PetIQ" }] }),
});

const statusLabel = {
  ok: { label: "Saudável", cls: "bg-[oklch(0.55_0.14_155)]/10 text-[oklch(0.45_0.14_155)]" },
  baixo: { label: "Atenção", cls: "bg-accent/15 text-[oklch(0.45_0.14_80)]" },
  critico: { label: "Crítico", cls: "bg-destructive/10 text-destructive" },
};

function EstoquePage() {
  const criticos = estoque.filter((e) => e.status === "critico").length;
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-semibold text-foreground">Estoque</h1>
        <p className="text-muted-foreground mt-1">Acompanhe o que está acabando antes que falte.</p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-card border border-border rounded-xl p-5">
          <div className="text-sm text-muted-foreground">Itens cadastrados</div>
          <div className="text-3xl font-semibold mt-2">{estoque.length}</div>
        </div>
        <div className="bg-card border border-border rounded-xl p-5">
          <div className="text-sm text-muted-foreground">Em estoque saudável</div>
          <div className="text-3xl font-semibold mt-2 text-[oklch(0.55_0.14_155)]">{estoque.filter(e => e.status === "ok").length}</div>
        </div>
        <div className="bg-card border border-border rounded-xl p-5">
          <div className="text-sm text-muted-foreground inline-flex items-center gap-1">
            <AlertTriangle className="w-3.5 h-3.5 text-destructive" /> Críticos
          </div>
          <div className="text-3xl font-semibold mt-2 text-destructive">{criticos}</div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 text-muted-foreground text-left">
            <tr>
              <th className="px-5 py-3 font-medium">Item</th>
              <th className="px-5 py-3 font-medium">Categoria</th>
              <th className="px-5 py-3 font-medium text-right">Quantidade</th>
              <th className="px-5 py-3 font-medium text-right">Mínimo</th>
              <th className="px-5 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {estoque.map((e) => (
              <tr key={e.item} className="border-t border-border">
                <td className="px-5 py-3 flex items-center gap-2"><Package className="w-4 h-4 text-muted-foreground" />{e.item}</td>
                <td className="px-5 py-3 text-muted-foreground">{e.categoria}</td>
                <td className="px-5 py-3 text-right font-medium">{e.qtd}</td>
                <td className="px-5 py-3 text-right text-muted-foreground">{e.minimo}</td>
                <td className="px-5 py-3">
                  <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${statusLabel[e.status].cls}`}>
                    {statusLabel[e.status].label}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}