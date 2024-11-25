import {
  getParametros,
} from './autenticacao.js?v=2';
import {
  GetCliente,
}from './cliente.js?v=2';

document.addEventListener('DOMContentLoaded', function() {
    const {id, token} = getParametros();
    GetCliente(id, token)
});


