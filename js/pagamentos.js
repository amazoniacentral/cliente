export function agruparPagamento(pagamentos){
  const agrupadosPorData = pagamentos.reduce((acc, pagamento) => {
    const { data_do_pagamento, valor } = pagamento;
    if (!acc[data_do_pagamento]) {
      acc[data_do_pagamento] = { valor_total: 0, valor_total_pago: 0, pagamentos: [] };
    }
    if (pagamento.pago){
      acc[data_do_pagamento].valor_total_pago += parseFloat(valor);
    }
    acc[data_do_pagamento].valor_total += parseFloat(valor);
    acc[data_do_pagamento].pagamentos.push(pagamento);
    return acc;
  }, {});
  
  const resultado = Object.keys(agrupadosPorData).map(data => ({
    data_do_pagamento: data,
    valor_total: agrupadosPorData[data].valor_total.toFixed(2),
    valor_total_pago: agrupadosPorData[data].valor_total_pago.toFixed(2),
    pagamentos: agrupadosPorData[data].pagamentos
  }));
  
  return resultado;
}