// Add
const todo_form = document.querySelector('.header__add-form');
const todo_content = todo_form.querySelector('.add__title');
const todo_list = document.querySelector('.todo__list');

let todos = [];
function save_todos() {
  localStorage.setItem('toDos', JSON.stringify(todos));
}

// delete
function delete_todo(e) {
  const div_button = e.currentTarget.parentElement;
  const li = div_button.parentElement;
  li.remove();
  todos = todos.filter((todo) => todo.id !== parseInt(li.id));

  save_todos();
}
// check
function check_todo(e) {
  const todo_content = e.target.nextSibling;
  todo_content.classList.toggle('complete');
}

// edit

function paint_item(new_content) {
  const newTodoItem = document.createElement('li');
  newTodoItem.setAttribute('class', 'todo__item');
  newTodoItem.id = new_content.id;

  const newCheckbox = document.createElement('input'); //체크박스
  newCheckbox.setAttribute('type', 'checkbox');
  newCheckbox.setAttribute('class', 'todo__checkbox');
  newCheckbox.addEventListener('click', check_todo);
  newCheckbox.addEventListener('click', isChecked);

  const newInputTitle = document.createElement('p'); // 투두 이름
  newInputTitle.setAttribute('class', 'todo__title');
  newInputTitle.textContent = new_content.text;

  const newButtonsDiv = document.createElement('div'); // 버튼 div
  newButtonsDiv.setAttribute('class', 'todo__buttons');
  const newButton_edit = document.createElement('button'); // 편집 버튼
  newButton_edit.setAttribute('class', 'todo__edit');
  newButton_edit.innerHTML = '<i class="fa-solid fa-pen todo__edit__icon"></i>';
  const newButton_delete = document.createElement('button'); // 삭제 버튼
  newButton_delete.setAttribute('class', 'todo__delete');
  newButton_delete.innerHTML =
    '<i class="fa-solid fa-circle-minus todo__delete__icon"></i>';
  newButton_delete.addEventListener('click', delete_todo);

  newButtonsDiv.appendChild(newButton_edit);
  newButtonsDiv.appendChild(newButton_delete);
  newTodoItem.appendChild(newCheckbox);
  newTodoItem.appendChild(newInputTitle);
  newTodoItem.appendChild(newButtonsDiv);

  todo_list.appendChild(newTodoItem);
}

function handletoSubmit(e) {
  e.preventDefault();
  const new_todo = todo_content.value;
  const new_todo_obj = {
    id: Date.now(),
    text: new_todo,
  };
  todos.push(new_todo_obj);
  paint_item(new_todo_obj);
  save_todos();
}

todo_form.addEventListener('submit', handletoSubmit);
const saved_todos = localStorage.getItem('toDos');

if (saved_todos !== null) {
  const parsed_todos = JSON.parse(saved_todos);
  todos = parsed_todos;
  parsed_todos.forEach(paint_item);
}
