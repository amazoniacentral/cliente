window.MensagemAlertaTop=MensagemAlertaTop
export function MensagemAlertaTop(mensagem, code = 200) {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    }
  });

  let icon = 'success';
  if (code === 400) {
    icon = 'warning';
  } else if (code !== 200) {
    icon = 'error';
  }

  Toast.fire({
    icon: icon,
    title: mensagem || 'Ok',
  });
}

export function Loading(acao_show_hide=null){
  $('body').LoadingOverlay(acao_show_hide??"show");
}


export function Mascara(){
  $('.telefone').mask('(99) 99999-9999');
  $('.moeda').mask('000.000.000,00', {reverse: true});
}

function formatarMoeda() {
  $('.preco').each(function() { 
    let item = $(this);
    let texto = '';
    if (item.is(':input')) {
         texto = item.val().trim();
    } else {
        texto = item.text().trim();
    }
    if (!isNaN(texto) && texto) { 
      var preco = parseFloat(texto); 
      var precoFormatado = preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
      let precoFormatado2 = preco.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      
      if (item.is(':input')) {
          item.val(precoFormatado2);
      } else {
          item.text(precoFormatado);
      }
    }
  });
}

export function requerido(){
  formatarMoeda();
  Mascara();
}