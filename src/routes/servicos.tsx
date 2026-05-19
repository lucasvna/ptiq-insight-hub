import { createFileRoute } from "@tanstack/react-router";
import { servicosMargem, formatBRL } from "@/lib/petiq-data";

export const Route = createFileRoute("/servicos")({
  component: ServicosPage,
  head: () => ({ meta: [{ title: "Serviços — PetIQ" }] }),
});

function ServicosPage() {
  const maxMargem = Math.max(...servicosMargem.map((s) => s.margem));
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-semibold text-foreground">Serviços</h1>
        <p className="text-muted-foreground mt-1">O que sua clínica oferece, ordenado pelo que realmente dá lucro.</p>
      </header>

      <div className="bg-primary text-primary-foreground rounded-xl p-6">
        <div className="text-sm text-primary-foreground/70">Serviço mais lucrativo</div>
        <div className="text-3xl font-semibold mt-1">Banho e Tosa</div>
        <div className="text-accent text-lg font-medium mt-1">58% de margem</div>
        <p className="text-sm text-primary-foreground/60 mt-2">É o serviço onde cada real faturado retorna mais lucro para a clínica.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {servicosMargem.map((s) => (
          <div key={s.servico} className="bg-card border border-border rounded-xl p-5">
            <div className="flex items-baseline justify-between">
              <div className="font-semibold text-foreground">{s.servico}</div>
              <div className="text-2xl font-semibold text-accent">{s.margem}%</div>
            </div>
            <div className="text-sm text-muted-foreground mt-1">Receita: {formatBRL(s.receita)}</div>
            <div className="mt-3 h-1.5 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-accent rounded-full" style={{ width: `${(s.margem / maxMargem) * 100}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}