import ToDoList from './toDoList.js';

const toDoList = new ToDoList();

document.addEventListener('keyup', (event) => {
  const inputField = document.getElementById('input-field');
  if (event.code === 'Enter' && document.activeElement === inputField) {
    toDoList.addTask(inputField.value);
    toDoList.populateList();
    inputField.value = '';
  }
});

const clearButton = document.getElementById('clear-button');

clearButton.addEventListener('click', () => {
  toDoList.removeCompletedTasks();
});
