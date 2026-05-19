import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { ArrowDownRight, ArrowUpRight, Lightbulb, AlertTriangle, Info, CheckCircle2, Calendar } from "lucide-react";
import { kpis, insights, alertas, receitaPorMes, servicosMargem, formatBRL } from "@/lib/petiq-data";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Dashboard Executivo — PetIQ" },
      { name: "description", content: "KPIs, insights e alertas em tempo real para sua clínica veterinária." },
    ],
  }),
});

function KPICard({ titulo, valor, variacao, sufixo }: { titulo: string; valor: string; variacao: number; sufixo?: string }) {
  const positivo = variacao >= 0;
  return (
    <div className="bg-card border border-border rounded-xl p-5">
      <div className="text-sm text-muted-foreground">{titulo}</div>
      <div className="mt-2 flex items-baseline gap-2">
        <div className="text-3xl font-semibold text-foreground">{valor}</div>
        {sufixo && <div className="text-sm text-muted-foreground">{sufixo}</div>}
      </div>
      <div className={`mt-3 inline-flex items-center gap-1 text-xs font-medium ${positivo ? "text-[oklch(0.55_0.14_155)]" : "text-destructive"}`}>
        {positivo ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
        {positivo ? "+" : ""}{variacao}% vs. mês anterior
      </div>
    </div>
  );
}

function InsightCard({ pergunta, resposta, detalhe, tipo }: { pergunta: string; resposta: string; detalhe: string; tipo: "positivo" | "info" | "alerta" }) {
  const icon = tipo === "positivo" ? CheckCircle2 : tipo === "alerta" ? AlertTriangle : Lightbulb;
  const Icon = icon;
  const cor = tipo === "positivo" ? "text-[oklch(0.55_0.14_155)]" : tipo === "alerta" ? "text-destructive" : "text-accent";
  return (
    <div className="bg-card border border-border rounded-xl p-5 hover:border-accent/40 transition-colors">
      <div className="flex items-start gap-3">
        <div className={`mt-0.5 ${cor}`}><Icon className="w-5 h-5" /></div>
        <div className="flex-1 min-w-0">
          <div className="text-xs uppercase tracking-wide text-muted-foreground">{pergunta}</div>
          <div className="mt-1 text-base font-semibold text-foreground">{resposta}</div>
          <div className="mt-1 text-sm text-muted-foreground leading-relaxed">{detalhe}</div>
        </div>
      </div>
    </div>
  );
}

function Index() {
  const [mesFiltro, setMesFiltro] = useState<string>("todos");

  const meses = receitaPorMes.map((m) => m.mes);
  const dadosFiltrados = useMemo(
    () => (mesFiltro === "todos" ? receitaPorMes : receitaPorMes.filter((m) => m.mes === mesFiltro)),
    [mesFiltro]
  );
  const maxReceita = Math.max(...dadosFiltrados.map((m) => m.valor));
  const maxServico = Math.max(...servicosMargem.map((s) => s.receita));

  const mesAtual = mesFiltro === "todos" ? receitaPorMes[receitaPorMes.length - 1] : dadosFiltrados[0];
  const idxAtual = receitaPorMes.findIndex((m) => m.mes === mesAtual.mes);
  const mesAnterior = idxAtual > 0 ? receitaPorMes[idxAtual - 1] : null;
  const variacao = mesAnterior
    ? Number((((mesAtual.valor - mesAnterior.valor) / mesAnterior.valor) * 100).toFixed(1))
    : kpis.receitaVar;

  const fator = mesAtual.valor / kpis.receitaMes;
  const servicosCalc = Math.round(kpis.servicosMes * fator);
  const clientesCalc = Math.round(kpis.clientesAtivos * (0.85 + fator * 0.15));

  return (
    <div className="space-y-8">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="text-sm text-muted-foreground">Bom dia, Dra. Helena</div>
          <h1 className="text-3xl font-semibold text-foreground mt-1">Visão Executiva</h1>
          <p className="text-muted-foreground mt-1">Resumo da sua clínica em tempo real. Tudo que importa, em linguagem simples.</p>
        </div>
        <div className="flex items-center gap-2 bg-card border border-border rounded-lg px-3 py-2">
          <Calendar className="w-4 h-4 text-accent" />
          <label htmlFor="mes-filtro" className="text-xs text-muted-foreground">Mês:</label>
          <select
            id="mes-filtro"
            value={mesFiltro}
            onChange={(e) => setMesFiltro(e.target.value)}
            className="bg-transparent text-sm font-medium text-foreground focus:outline-none cursor-pointer"
          >
            <option value="todos">Todos os meses</option>
            {meses.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard titulo={mesFiltro === "todos" ? "Receita do mês" : `Receita de ${mesAtual.mes}`} valor={formatBRL(mesAtual.valor)} variacao={variacao} />
        <KPICard titulo="Clientes ativos" valor={clientesCalc.toLocaleString("pt-BR")} variacao={kpis.clientesVar} />
        <KPICard titulo="Ticket médio" valor={formatBRL(Math.round(kpis.ticketMedio * (0.9 + fator * 0.1)))} variacao={kpis.ticketVar} />
        <KPICard titulo="Serviços realizados" valor={String(servicosCalc)} variacao={kpis.servicosVar} sufixo={mesFiltro === "todos" ? "no mês" : `em ${mesAtual.mes}`} />
      </section>

      <section>
        <div className="flex items-center gap-2 mb-4">
          <Lightbulb className="w-5 h-5 text-accent" />
          <h2 className="text-xl font-semibold text-foreground">Insights Inteligentes</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {insights.map((i) => <InsightCard key={i.pergunta} {...i} />)}
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-card border border-border rounded-xl p-6">
          <div className="flex items-baseline justify-between mb-6">
            <div>
              <h3 className="font-semibold text-foreground">Receita mensal</h3>
              <p className="text-sm text-muted-foreground">
                {mesFiltro === "todos" ? "Últimos 7 meses" : `Mês selecionado: ${mesAtual.mes}`}
              </p>
            </div>
            <div className="text-2xl font-semibold text-foreground">{formatBRL(mesAtual.valor)}</div>
          </div>
          <div className="flex items-end gap-3 h-48">
            {dadosFiltrados.map((m) => (
              <div key={m.mes} className="flex-1 flex flex-col items-center gap-2">
                <div className="text-xs text-muted-foreground">{formatBRL(m.valor / 1000)}k</div>
                <div
                  className="w-full bg-accent rounded-t-md transition-all"
                  style={{ height: `${(m.valor / maxReceita) * 100}%`, minHeight: "8px" }}
                />
                <div className="text-xs text-muted-foreground">{m.mes}</div>
              </div>
            ))}
          </div>
        </div>


        <div className="bg-primary text-primary-foreground rounded-xl p-6">
          <div className="flex items-center gap-2 mb-1">
            <AlertTriangle className="w-4 h-4 text-accent" />
            <h3 className="font-semibold">Alertas ativos</h3>
          </div>
          <p className="text-sm text-primary-foreground/60 mb-4">Coisas que precisam da sua atenção</p>
          <div className="space-y-3">
            {alertas.map((a) => (
              <div key={a.titulo} className="border-l-2 pl-3 py-1 border-accent">
                <div className="text-sm font-medium">{a.titulo}</div>
                <div className="text-xs text-primary-foreground/60 mt-0.5">{a.descricao}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-card border border-border rounded-xl p-6">
        <div className="flex items-baseline justify-between mb-5">
          <div>
            <h3 className="font-semibold text-foreground">Margem por serviço</h3>
            <p className="text-sm text-muted-foreground">Quanto cada serviço efetivamente lucra</p>
          </div>
          <div className="text-xs text-muted-foreground inline-flex items-center gap-1">
            <Info className="w-3.5 h-3.5" /> Maior margem = maior lucro real
          </div>
        </div>
        <div className="space-y-3">
          {servicosMargem.map((s) => (
            <div key={s.servico}>
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="text-foreground font-medium">{s.servico}</span>
                <span className="text-muted-foreground">
                  {formatBRL(s.receita)} · <span className="text-accent font-semibold">{s.margem}%</span> margem
                </span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-accent rounded-full" style={{ width: `${(s.receita / maxServico) * 100}%` }} />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
