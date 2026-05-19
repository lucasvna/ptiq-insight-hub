import { createFileRoute } from "@tanstack/react-router";
import { receitaPorMes, kpis, formatBRL } from "@/lib/petiq-data";
import { TrendingUp } from "lucide-react";

export const Route = createFileRoute("/receita")({
  component: ReceitaPage,
  head: () => ({ meta: [{ title: "Receita — PetIQ" }] }),
});

function ReceitaPage() {
  const total = receitaPorMes.reduce((s, m) => s + m.valor, 0);
  const media = Math.round(total / receitaPorMes.length);
  const max = Math.max(...receitaPorMes.map((m) => m.valor));

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-semibold text-foreground">Receita</h1>
        <p className="text-muted-foreground mt-1">A evolução financeira da clínica em linguagem direta.</p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-card border border-border rounded-xl p-5">
          <div className="text-sm text-muted-foreground">Acumulado no período</div>
          <div className="text-3xl font-semibold mt-2">{formatBRL(total)}</div>
        </div>
        <div className="bg-card border border-border rounded-xl p-5">
          <div className="text-sm text-muted-foreground">Média mensal</div>
          <div className="text-3xl font-semibold mt-2">{formatBRL(media)}</div>
        </div>
        <div className="bg-card border border-border rounded-xl p-5">
          <div className="text-sm text-muted-foreground inline-flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5 text-accent" /> Variação do mês
          </div>
          <div className="text-3xl font-semibold mt-2 text-[oklch(0.55_0.14_155)]">+{kpis.receitaVar}%</div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl p-6">
        <h3 className="font-semibold mb-6">Evolução mensal</h3>
        <div className="flex items-end gap-3 h-64">
          {receitaPorMes.map((m) => (
            <div key={m.mes} className="flex-1 flex flex-col items-center gap-2">
              <div className="text-xs font-medium">{formatBRL(m.valor)}</div>
              <div
                className="w-full bg-primary rounded-t-md transition-all"
                style={{ height: `${(m.valor / max) * 100}%` }}
              />
              <div className="text-xs text-muted-foreground">{m.mes}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-accent/10 border border-accent/30 rounded-xl p-5">
        <div className="text-sm font-medium text-foreground">O que isso significa?</div>
        <p className="text-sm text-muted-foreground mt-1">
          Sua receita cresceu em 5 dos 7 meses. Julho foi o melhor mês, impulsionado por banho e tosa (58% de margem) e vacinações sazonais.
        </p>
      </div>
    </div>
  );
}