
(function() {
  var btn = document.getElementById('notificacoesIcon');
  var modal = document.getElementById('modalNotificacoes');
  if(btn && modal) {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      if(modal.style.display === 'none' || modal.style.display === '') {
        modal.style.display = 'block';
      } else {
        modal.style.display = 'none';
      }
    });
    document.addEventListener('click', function(event) {
      if (!modal.contains(event.target) && event.target !== btn) {
        modal.style.display = 'none';
      }
    });
  }
})();