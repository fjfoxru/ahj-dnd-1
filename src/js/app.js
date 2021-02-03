let draggedEl;
let ghostEl;
let positionY;
let positionX;
let elemSize;

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
  elemSize = evt.target.getBoundingClientRect();
  positionY = evt.clientY - elemSize.top;
  positionX = evt.clientX - elemSize.left;
  ghostEl.style.width = `${elemSize.width}px`;
});

itemsEl.addEventListener('mousemove', (evt) => {
  evt.preventDefault();
  if (!draggedEl) {
    return;
  }
  ghostEl.style.left = `${evt.pageX - positionX}px`;
  ghostEl.style.top = `${evt.pageY - positionY}px`;
});

itemsEl.addEventListener('mouseup', (evt) => {
  if (!draggedEl) {
    return;
  }
  let closest = document.elementFromPoint(evt.clientX, evt.clientY);
  if (closest.classList.contains('items-item')) {
    closest.insertAdjacentElement('afterend', draggedEl);
  }
  
  document.body.removeChild(ghostEl);
  evt.target.classList.remove('bottom-space');
  ghostEl = null;
  draggedEl = null;
});
