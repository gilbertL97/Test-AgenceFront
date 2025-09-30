export const formatBRL = (value: number | string): { text: string; color: string } => {
  const num = typeof value === 'string' ? parseFloat(value) : value;
  const cleanNum = isNaN(num) ? 0 : num;

  // Formatear con separadores de miles y decimales
  const absValue = Math.abs(cleanNum);
  const formattedValue = absValue.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

  const displayText = cleanNum < 0 ? `-R$ ${formattedValue}` : `R$ ${formattedValue}`;

  return {
    text: displayText,
    color: cleanNum < 0 ? 'red' : 'inherit',
  };
}

const monthNames = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

const monthAbNames = [
  'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
export const getMonthName = (month: number, abv = false): string => {
  if (abv) {
    return month ? monthAbNames[month - 1] : '';
  }
  return month ? monthNames[month - 1] : '';
}



export const Constants = {
  RELATORIO: 'relatorio',
  GRAFICO: 'grafico',
  PIZZA: 'pizza'
}
