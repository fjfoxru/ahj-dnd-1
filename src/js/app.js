let draggedEl;
let ghostEl;

const itemsEl = document.querySelector('.items-area');
const allItems = document.querySelectorAll('.items-item');
allItems.forEach((item) => {
  item.addEventListener('mouseover', (evt) => {
    if (draggedEl) {
      evt.target.classList.add('bottom-space');
    }
  });
});
allItems.forEach((item) => {
  item.addEventListener('mouseout', (evt) => {
    evt.target.classList.remove('bottom-space');
  });
});

itemsEl.addEventListener('mousedown', (evt) => {
  evt.preventDefault();
  if (!evt.target.classList.contains('items-item')) {
    return;
  }
  draggedEl = evt.target;
  ghostEl = evt.target.cloneNode(true);
  ghostEl.classList.add('dragged');
  document.body.appendChild(ghostEl);
  ghostEl.style.left = `${evt.pageX}px`;
  ghostEl.style.top = `${evt.pageY}px`;
});

itemsEl.addEventListener('mousemove', (evt) => {
  evt.preventDefault();
  if (!draggedEl) {
    return;
  }
  ghostEl.style.left = `${evt.pageX}px`;
  ghostEl.style.top = `${evt.pageY}px`;
});

itemsEl.addEventListener('mouseup', (evt) => {
  if (!draggedEl) {
    return;
  }
  let closest = document.elementFromPoint(evt.clientX, evt.clientY);
  closest = closest.closest('.items');
  closest.appendChild(draggedEl);
  document.body.removeChild(ghostEl);
  evt.target.classList.remove('bottom-space');
  ghostEl = null;
  draggedEl = null;
});
