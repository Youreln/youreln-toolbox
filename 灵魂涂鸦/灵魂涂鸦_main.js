document.addEventListener('DOMContentLoaded', function() {
  const canvas = document.getElementById('drawingCanvas');
  const colorInput = document.getElementById('colorInput');
  const saveButton = document.getElementById('saveButton');

  const context = canvas.getContext('2d');
  let currentColor = 'black';

  colorInput.addEventListener('change', function() {
    currentColor = colorInput.value;
  });

  let isDrawing = false;
  let lastX = 0;
  let lastY = 0;

  canvas.addEventListener('touchstart', startDrawing);
  canvas.addEventListener('touchmove', draw);
  canvas.addEventListener('touchend', stopDrawing);
  canvas.addEventListener('touchcancel', stopDrawing);

  function startDrawing(e) {
    isDrawing = true;
    [lastX, lastY] = getTouchPosition(e);
  }

  function draw(e) {
    if (!isDrawing) return;
    const [x, y] = getTouchPosition(e);

    context.strokeStyle = currentColor;
    context.beginPath();
    context.moveTo(lastX, lastY);
    context.lineTo(x, y);
    context.stroke();

    [lastX, lastY] = [x, y];
  }

  function stopDrawing() {
    isDrawing = false;
  }

  function getTouchPosition(e) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (e.changedTouches[0].clientX - rect.left) * scaleX;
    const y = (e.changedTouches[0].clientY - rect.top) * scaleY;
    return [x, y];
  }

  saveButton.addEventListener('click', function() {
    const image = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = image;
    link.download = 'drawing.png';
    link.click();
  });

});
