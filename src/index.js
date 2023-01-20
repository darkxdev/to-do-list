import ToDoList from './toDoList.js';
import RemoveCheckbox from './removeCheckbox.js';

const toDoList = new ToDoList();
const removeCheckboxObject = new RemoveCheckbox(toDoList);

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
  removeCheckboxObject.removeCompletedTasks();
});