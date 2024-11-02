import {
  MensagemAlertaTop,
  Loading,
} from './funcoes.js';

export class Crud {
  constructor(urls, token, contentType=false) {
    this.urls = urls;
    this.token = token;
    this.contentType=contentType;
  }

  fetchWithToken(url, method, data = null) {
    let dados = {
      url: `https://gvendas.app.br${url}`,
      type: method,
      data: data,
      processData: false,
      contentType: this.contentType,
    }
    
    if (this.token){
      dados.headers = {
        'Authorization': 'token ' + this.token
      }
    }
    return $.ajax(dados);
  }

  fetchAll(method, data = null) {
    let urls = Array.isArray(this.urls) ? this.urls : [this.urls]; // Transforma em uma lista se for uma URL única

    if (urls.length === 0) {
      return Promise.resolve([]); // Retorna uma Promise resolvida com um array vazio se não houver URLs
    }

    const promises = urls.map(url => this.fetchWithToken(url, method, data));
    return promises; // Retorna diretamente o array de promessas
  }

  performRequest(method, data, callback) {
    Loading();
    const promises = this.fetchAll(method, data);
    Promise.all(promises)
      .then(responses => {
        this.processResponses(responses);
        Loading("hide");
        callback(null, responses);
      })
      .catch(error => {
        Loading("hide");
        MensagemAlertaTop(JSON.stringify(error), error.status|| 400);
        callback(error, null);
      });
  }

  processResponses(responses) {
    // Implemente aqui a lógica para processar as respostas
    // Exemplo:
    responses.forEach(response => {
      console.log('Processando resposta:', response);
    });
  }

  get(callback) {
    this.performRequest('GET', null, callback);
  }

  post(data, callback) {
    this.performRequest('POST', data, callback);
  }

  put(data, callback) {
    this.performRequest('PUT', data, callback);
  }
  
  patch(data, callback) {
    this.performRequest('PATCH', data, callback);
  }

  delete(callback) {
    this.performRequest('DELETE', null, callback);
  }
}

