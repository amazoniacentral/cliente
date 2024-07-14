import {
  MensagemAlertaTop,
} from './funcoes.js';

export function getParametros() {
  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.search);
  const key = params.get('key');
  
  if (key) {
    adicionarValor('key', key);
  }
  return getToken()
}


function adicionarValor(chave, novoValor) {
    localStorage.setItem(chave, novoValor);
    
    /*
    let valoresExistentes = localStorage.getItem(chave);
    
    if (!valoresExistentes) {
        valoresExistentes = [];
    } else {
        valoresExistentes = JSON.parse(valoresExistentes);
    }
    let lista = JSON.stringify(valoresExistentes)
    if (!lista.includes(JSON.stringify(novoValor))) {
      valoresExistentes.push(novoValor); 
      localStorage.setItem(chave, JSON.stringify(valoresExistentes)); 
    }*/
}

function getToken(){
  let data = localStorage.getItem('key');
  //localStorage.clear();
  return data;
}