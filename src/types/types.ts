export type Consultor = {
  co_usuario: string,
  no_usuario: string
}
type MonthlyData = {
  ano: number;
  mes: number;
  valor_total: number;
  total_imp_porciento: number;
  valor_descontado: number;
  comision: number;
  receita_liquida: number;
  salario: number;
  valor_comissao: number;
  lucro: number;
};

// Tipo para un Usuario
export type UserData = {
  name: string;
  mensual: MonthlyData[];
  total: [number, number, number, number];
};
