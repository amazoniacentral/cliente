import {
  MensagemAlertaTop,
} from './funcoes.js';

export function getParametros() {
  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.search);
  const id = params.get('i');
  const token = params.get('t');
  
  if (id && token) {
    adicionarValor('id', id);
    adicionarValor('token', token);
    return {id,token};
  }
  else{
    return getToken()
  }
}


function adicionarValor(chave, novoValor) {
    localStorage.setItem(chave, novoValor);
}

function getToken(){
  let id = localStorage.getItem('id');
  let token = localStorage.getItem('token');
  return {id, token};
}