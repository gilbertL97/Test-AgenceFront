export const formatBRL = (value: number | string): { text: string; color: string } => {
  const num = typeof value === 'string' ? parseFloat(value) : value;
  const cleanNum = isNaN(num) ? 0 : num;
  const absValue = Math.abs(cleanNum).toFixed(2).replace('.', ',');
  const displayText = cleanNum < 0 ? `-R$ ${absValue}` : `R$ ${absValue}`;
  return {
    text: displayText,
    color: cleanNum < 0 ? 'red' : 'inherit',
  };
};

const monthNames = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

export const getMonthName = (month: number): string => {
  return month ? monthNames[month - 1] : '';
}



export const Constants = {
  RELATORIO: 'relatorio',
  GRAFICO: 'grafico',
  PIZZA: 'pizza'
}
