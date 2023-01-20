import ToDoList from './toDoList.js';

export default class removeCheckbox {
  removeCompletedTasks(toDoList) {
    const listItems = document.querySelectorAll('li');
    const completedTasks = [];
    for (let i = 0; i < listItems.length; i += 1) {
      const checkbox = listItems[i].querySelector('.checkbox');
      if (checkbox.checked) {
        completedTasks.push(i);
        listItems[i].remove();
      }
    }
    toDoList.tasks = toDoList.tasks.filter((task, index) => !completedTasks.includes(index));
    for (let i = 0; i < toDoList.tasks.length; i += 1) {
      toDoList.tasks[i].index = i + 1;
    }
    localStorage.setItem('tasks', JSON.stringify(toDoList.tasks));
    toDoList.populateList();
  }
}