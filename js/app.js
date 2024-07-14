import {
  getParametros,
} from './autenticacao.js';
import {
  GetCliente,
}from './cliente.js';

document.addEventListener('DOMContentLoaded', function() {
    const key = getParametros();
    GetCliente(key)
});


