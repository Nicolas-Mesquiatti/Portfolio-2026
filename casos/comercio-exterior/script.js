const beforeButton = document.getElementById('show-before');
const afterButton = document.getElementById('show-after');
const trackingImage = document.getElementById('tracking-image');
const trackingZoom = document.getElementById('tracking-zoom');
const comparisonNote = document.getElementById('comparison-note');

function showTrackingState(state) {
  const after = state === 'after';
  beforeButton.setAttribute('aria-pressed', String(!after));
  afterButton.setAttribute('aria-pressed', String(after));
  trackingImage.src = after ? 'assets/actualizador-despues.png' : 'assets/actualizador-antes.png';
  trackingImage.alt = after
    ? 'Planilla ficticia con las ETA y el buque actualizados; las celdas modificadas están en verde'
    : 'Planilla ficticia con fechas ETA previas a la actualización; las celdas que cambiarán están en amarillo';
  trackingZoom.dataset.zoom = trackingImage.src;
  trackingZoom.dataset.caption = after
    ? 'Planilla después de la actualización programada'
    : 'Planilla antes de la actualización programada';
  trackingZoom.setAttribute('aria-label', after
    ? 'Ampliar la planilla después de actualizar'
    : 'Ampliar la planilla antes de actualizar');
  comparisonNote.textContent = after
    ? 'Las celdas verdes muestran las ETA y el buque modificados por la consulta programada.'
    : 'Las celdas amarillas muestran los valores anteriores. Seleccioná “Después” para ver los cambios.';
}

beforeButton.addEventListener('click', () => showTrackingState('before'));
afterButton.addEventListener('click', () => showTrackingState('after'));

const dialog = document.getElementById('lightbox');
const dialogImage = document.getElementById('lightbox-image');
const dialogCaption = document.getElementById('lightbox-caption');
const dialogClose = document.getElementById('lightbox-close');

document.querySelectorAll('[data-zoom]').forEach((button) => {
  button.addEventListener('click', () => {
    dialogImage.src = button.dataset.zoom;
    dialogImage.alt = button.querySelector('img')?.alt || '';
    dialogCaption.textContent = button.dataset.caption || '';
    dialog.showModal();
  });
});

dialogClose.addEventListener('click', () => dialog.close());
dialog.addEventListener('click', (event) => {
  if (event.target === dialog) dialog.close();
});

