import {
  getParametros,
} from './autenticacao.js';
import {
  GetCliente,
}from './cliente.js';

document.addEventListener('DOMContentLoaded', function() {
    const {id, token} = getParametros();
    GetCliente(id, token)
});


