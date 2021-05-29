const listRegular = document.querySelector('#todo-display-list-regular');
const listDone = document.querySelector('#todo-display-list-done');
const todoBtn = document.querySelector('#todo-add-container-btn');
const todoInput = document.querySelector('#todo-add-container-input');

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    navigator.serviceWorker
      .register('/Todo-App/pwabuilder-sw.js')
      .then((res) => console.log('Service worker registered'))
      .catch((err) => console.log('Service worker not registered', err));
  });
}

let listRegularItems = JSON.parse(localStorage.getItem('listRegularItems'));
if (!listRegularItems) {
  listRegularItems = [];
} else {
  for (let val of listRegularItems) {
    addActivity(val, 'listRegularItems');
  }
}

let listDoneItems = JSON.parse(localStorage.getItem('listDoneItems'));
if (!listDoneItems) {
  listDoneItems = [];
} else {
  for (let val of listDoneItems) {
    addActivity(val, 'listDoneItems');
  }
}

function addToList(lName, list, val) {
  list.push(val);
  localStorage.setItem(lName, JSON.stringify(list));
}

function removeFromList(lName, list, val) {
  for (let i = 0; i < val.length; i++) {
    if (list[i] === val) {
      list.splice(i, 1);
      break;
    }
  }
  localStorage.setItem(lName, JSON.stringify(list));
}

function addActivity(val, lName = '') {
  if (val) {
    let i2Class = 'far';
    let list = listRegular;
    if (lName === 'listDoneItems') {
      i2Class = 'fas';
      list = listDone;
    }
    const li = document.createElement('li');
    const span = document.createElement('span');
    const a1 = document.createElement('a');
    const i1 = document.createElement('i');
    const div = document.createElement('div');
    const a2 = document.createElement('a');
    const i2 = document.createElement('i');

    span.textContent = val;
    a1.href = '#';
    a2.href = '#';
    li.classList.add('todo-display-list-li');
    span.classList.add('todo-display-list-span');
    a1.classList.add('delete-todo');
    i1.classList.add('far');
    i1.classList.add('fa-trash-alt');
    div.classList.add('v2');
    a2.classList.add('check-todo');
    i2.classList.add(i2Class);
    i2.classList.add('fa-check-circle');

    a1.appendChild(i1);
    a2.appendChild(i2);
    li.appendChild(span);
    li.appendChild(a1);
    li.appendChild(div);
    li.appendChild(a2);
    list.appendChild(li);
    if (lName === '') {
      todoInput.value = '';
      addToList('listRegularItems', listRegularItems, val);
    }
  } else {
    alert("Activity can't be empty");
  }
}

todoBtn.addEventListener('click', () => {
  const val = todoInput.value;
  addActivity(val);
});

todoInput.addEventListener('keyup', (e) => {
  if (e.keyCode === 13) {
    const val = todoInput.value;
    addActivity(val);
  }
});

listRegular.addEventListener('click', function (e) {
  const val = e.target.parentElement.parentElement.textContent;
  if (e.target.classList[1].includes('trash')) {
    if (confirm('Do you want to delete the activity?')) {
      e.target.parentElement.parentElement.remove();
      removeFromList('listRegularItems', listRegularItems, val);
    }
  } else if (e.target.classList.contains('far')) {
    e.target.parentElement.parentElement.remove();
    e.target.classList.remove('far');
    e.target.classList.add('fas');
    listDone.appendChild(e.target.parentElement.parentElement);
    removeFromList('listRegularItems', listRegularItems, val);
    addToList('listDoneItems', listDoneItems, val);
  }
});

listDone.addEventListener('click', function (e) {
  const val = e.target.parentElement.parentElement.textContent;
  if (e.target.classList[1].includes('trash')) {
    if (confirm('Do you want to delete the completed activity?')) {
      e.target.parentElement.parentElement.remove();
      removeFromList('listDoneItems', listDoneItems, val);
    }
  } else if (e.target.classList.contains('fas')) {
    e.target.parentElement.parentElement.remove();
    e.target.classList.remove('fas');
    e.target.classList.add('far');
    listRegular.appendChild(e.target.parentElement.parentElement);
    removeFromList('listDoneItems', listDoneItems, val);
    addToList('listRegularItems', listRegularItems, val);
  }
});
