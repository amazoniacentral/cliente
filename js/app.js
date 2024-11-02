import {
  getParametros,
} from './autenticacao.js?v=1';
import {
  GetCliente,
}from './cliente.js?v=1';

document.addEventListener('DOMContentLoaded', function() {
    const {id, token} = getParametros();
    GetCliente(id, token)
});


