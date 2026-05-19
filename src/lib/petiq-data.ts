// Mock data for PetIQ executive dashboard
export const kpis = {
  receitaMes: 184500,
  receitaVar: 12.4,
  clientesAtivos: 1247,
  clientesVar: 4.8,
  ticketMedio: 248,
  ticketVar: -2.1,
  servicosMes: 743,
  servicosVar: 8.6,
};

export const insights = [
  {
    pergunta: "Qual serviço mais lucra?",
    resposta: "Banho e Tosa",
    detalhe: "58% de margem — líder absoluto em rentabilidade",
    tipo: "positivo" as const,
  },
  {
    pergunta: "Qual cliente mais consome?",
    resposta: "Família Oliveira (Thor)",
    detalhe: "R$ 4.820 em 12 meses · 14 visitas",
    tipo: "info" as const,
  },
  {
    pergunta: "Qual horário tem mais movimento?",
    resposta: "Sábados, 10h às 13h",
    detalhe: "32% do faturamento semanal concentrado",
    tipo: "info" as const,
  },
  {
    pergunta: "Qual produto gira mais rápido?",
    resposta: "Ração Premium Cães Adultos 15kg",
    detalhe: "Vende em média a cada 1,8 dias",
    tipo: "positivo" as const,
  },
  {
    pergunta: "Onde estamos perdendo dinheiro?",
    resposta: "Consultas avulsas sem retorno",
    detalhe: "37% dos clientes novos não retornam em 90 dias",
    tipo: "alerta" as const,
  },
  {
    pergunta: "Qual serviço cresce mais?",
    resposta: "Vacinação Antirrábica",
    detalhe: "+24% no trimestre vs. ano anterior",
    tipo: "positivo" as const,
  },
];

export const alertas = [
  {
    titulo: "Estoque crítico: Vermífugo Drontal",
    descricao: "Restam apenas 4 unidades. Média de consumo: 12/semana.",
    severidade: "alta" as const,
  },
  {
    titulo: "12 clientes sem retornar há 6+ meses",
    descricao: "Potencial de R$ 8.400 em receita recorrente. Sugerimos campanha de reativação.",
    severidade: "media" as const,
  },
  {
    titulo: "Margem da venda de acessórios caiu 9%",
    descricao: "Custo do fornecedor PetMix subiu 14% no último mês.",
    severidade: "media" as const,
  },
  {
    titulo: "32 vacinas vencem nos próximos 60 dias",
    descricao: "Enviar lembretes automáticos aos tutores cadastrados.",
    severidade: "baixa" as const,
  },
];

export const receitaPorMes = [
  { mes: "Jan", valor: 142000 },
  { mes: "Fev", valor: 138500 },
  { mes: "Mar", valor: 156200 },
  { mes: "Abr", valor: 161800 },
  { mes: "Mai", valor: 172400 },
  { mes: "Jun", valor: 168900 },
  { mes: "Jul", valor: 184500 },
];

export const servicosMargem = [
  { servico: "Banho e Tosa", margem: 58, receita: 48200 },
  { servico: "Vacinação", margem: 47, receita: 32100 },
  { servico: "Consultas", margem: 41, receita: 41800 },
  { servico: "Cirurgias", margem: 38, receita: 28400 },
  { servico: "Exames Laboratoriais", margem: 35, receita: 19600 },
  { servico: "Internação", margem: 29, receita: 14400 },
];

export const estoque = [
  { item: "Ração Premium Cães 15kg", categoria: "Alimentação", qtd: 28, minimo: 10, status: "ok" as const },
  { item: "Vermífugo Drontal", categoria: "Medicamento", qtd: 4, minimo: 15, status: "critico" as const },
  { item: "Vacina V10", categoria: "Vacina", qtd: 22, minimo: 12, status: "ok" as const },
  { item: "Shampoo Antipulgas", categoria: "Higiene", qtd: 9, minimo: 10, status: "baixo" as const },
  { item: "Antibiótico Amoxicilina", categoria: "Medicamento", qtd: 18, minimo: 8, status: "ok" as const },
  { item: "Coleira Antipulgas Seresto", categoria: "Acessório", qtd: 6, minimo: 10, status: "baixo" as const },
  { item: "Ração Filhotes Gatos 3kg", categoria: "Alimentação", qtd: 31, minimo: 12, status: "ok" as const },
  { item: "Seringa Descartável 5ml", categoria: "Insumo", qtd: 2, minimo: 50, status: "critico" as const },
];

export const clientes = [
  { tutor: "Marina Oliveira", pet: "Thor (Golden)", visitas: 14, gasto: 4820, ultima: "há 5 dias" },
  { tutor: "Carlos Mendes", pet: "Luna (Siamês)", visitas: 11, gasto: 3940, ultima: "há 12 dias" },
  { tutor: "Júlia Ferreira", pet: "Bento (SRD)", visitas: 9, gasto: 3210, ultima: "há 3 dias" },
  { tutor: "Roberto Lima", pet: "Mel (Poodle)", visitas: 8, gasto: 2780, ultima: "há 28 dias" },
  { tutor: "Ana Paula Souza", pet: "Nina (Yorkshire)", visitas: 7, gasto: 2410, ultima: "há 9 dias" },
  { tutor: "Felipe Castro", pet: "Rex (Labrador)", visitas: 6, gasto: 2090, ultima: "há 41 dias" },
];

export const formatBRL = (n: number) =>
  n.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });