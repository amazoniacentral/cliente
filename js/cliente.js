import {
  Crud,
} from './crud.js';
import {
  requerido,
  MensagemAlertaTop,
} from './funcoes.js';
import { 
  agrupar_vendas,
} from './vendas.js';
import { 
  agruparPagamento,
} from './pagamentos.js';

export function GetCliente(id,token){
  // "/c/api/clientes/1/extrato/2f3bcac7-2b3e-4bf0-a1f6-c7b06ae031c4/full/"
    const url = [
      `/gvendas/api/clientes/${id}/extrato/${token}/full/`,
    ];
    new Crud(url).get(function(error, response) {
        if (error) {
            MensagemAlertaTop('Cliente não encontrado', 400);
        } else {
          let cliente=response[0];
          let compras = [];
          let listaPagamentos = [];
          
          cliente.venda_set.forEach(item => {
            if (item.pago===item.total){
              item.icone="/img/img_pago.jpg";
            } else if(item.pago===0){
              item.icone="/img/img_fiado.jpg";
            }else{
              item.icone="/img/img_parcial.jpg";
            }
          });
          
          compras = cliente.venda_set.sort((a, b) => {
            const dataA = a.data_da_venda.split('/').reverse().join('');
            const dataB = b.data_da_venda.split('/').reverse().join('');
            return dataB.localeCompare(dataA);
          });
          compras.forEach(item => {
              item.count = item.itemvenda_set.length;
          });
          
          compras = agrupar_vendas(compras);
          
          listaPagamentos = cliente.venda_set.map(venda => {
            return venda.pagamento_set.sort((a, b) => {
              const dataA = a.data_do_pagamento.split('/').reverse().join('');
              const dataB = b.data_do_pagamento.split('/').reverse().join('');
              return dataB.localeCompare(dataA);
            });
          });
          
          let lista =[];
          listaPagamentos.forEach(item => {
            item.forEach(i=>{
              lista.push(i);
            })
          });
          
          listaPagamentos = agruparPagamento(lista);
          
          let extrato =[];
          listaPagamentos.forEach(item => {
              if (item.valor_total_pago>0) {
                extrato.push({
                  data:item.data_do_pagamento,
                  valor:item.valor_total_pago,//*(-1),
                  is_compra:false,
                });
              }
          });
          
          compras.data.forEach(item => {
              extrato.push({
                  data:item.data_da_venda,
                  valor:item.total,
                  is_compra:true,
              });
          });

          let data = {
            extrato: agruparExtrato(extrato),
          }

          
          templateCliente(cliente);
          templateExtrato(data);
          templateCompras(compras);
          templatePagamentos(listaPagamentos);
        }
    });
}

function templateExtrato(data)
{
  fetch('./template/extrato.mustache')
            .then(response => response.text())
            .then(template => {
                var rendered = Mustache.render(template, data);
                document.getElementById('extrato-data').innerHTML = rendered;
                requerido();
            });
}


function templateCompras(data)
{
  fetch('./template/compras.mustache')
            .then(response => response.text())
            .then(template => {
                var rendered = Mustache.render(template, data);
                document.getElementById('compras-data').innerHTML = rendered;
                requerido();
            });
}

function templatePagamentos(data)
{
  fetch('./template/pagamentos.mustache')
            .then(response => response.text())
            .then(template => {
                var rendered = Mustache.render(template, {listaPagamentos:data});
                document.getElementById('pagamentos-data').innerHTML = rendered;
                requerido();
            });
}


function templateCliente(data)
{
  fetch('./template/cliente.mustache')
            .then(response => response.text())
            .then(template => {
                var rendered = Mustache.render(template, data);
                document.getElementById('cliente-data').innerHTML = rendered;
                requerido();
            });
}


function agruparExtrato(extrato) {
  const agrupadoPorData = extrato.reverse().reduce((acc, item) => {
    if (!acc[item.data]) {
      acc[item.data] = {
        totalValor: 0,
        items: []
      };
    }
    acc[item.data].totalValor += item.valor;
    acc[item.data].items.push(item);
    return acc;
  }, {});

  let resultado = Object.keys(agrupadoPorData).map(data => {
    return {
      data: data,
      totalValor: agrupadoPorData[data].totalValor,
      items: agrupadoPorData[data].items
    };
  });

  // Função para converter a data de dd/mm/yyyy para yyyy-mm-dd para facilitar a ordenação
  function converterData(data) {
    const [dia, mes, ano] = data.split('/');
    return `${ano}-${mes}-${dia}`;
  }

  // Ordenar o resultado pela data convertida
  resultado.sort((a, b) => {
    const dataA = converterData(a.data);
    const dataB = converterData(b.data);
    return dataA.localeCompare(dataB);
  });

  return resultado.reverse();
}