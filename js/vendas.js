export function agrupar_vendas(data) {
  const vendasAgrupadas = {};
  
  // Agrupar vendas por data_da_venda
  data.forEach(venda => {
    if (!vendasAgrupadas[venda.data_da_venda]) {
      vendasAgrupadas[venda.data_da_venda] = [];
    }
    vendasAgrupadas[venda.data_da_venda].push(venda);
  });
  
  // Criar resultado final com o total de cada grupo
  let result = { data: Object.entries(vendasAgrupadas).map(([data_da_venda, vendas]) => {
    const total = vendas.reduce((sum, venda) => sum + venda.total, 0);
    return { data_da_venda, vendas, total };
  })};

  // Calcular o total geral de todas as vendas
  result.total = result.data.reduce((sum, group) => sum + group.total, 0);

  return result;
}