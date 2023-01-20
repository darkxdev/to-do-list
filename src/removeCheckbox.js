export default class removeCheckbox {
  constructor(toDoList) {
    this.toDoList = toDoList;
  }

  removeCompletedTasks() {
    const listItems = document.querySelectorAll('li');
    const completedTasks = [];
    for (let i = 0; i < listItems.length; i += 1) {
      const checkbox = listItems[i].querySelector('.checkbox');
      if (checkbox.checked) {
        completedTasks.push(i);
        listItems[i].remove();
      }
    }
    this.toDoList.tasks = (
      this.toDoList.tasks.filter((task, index) => !completedTasks.includes(index))
    );
    for (let i = 0; i < this.toDoList.tasks.length; i += 1) {
      this.toDoList.tasks[i].index = i + 1;
    }
    localStorage.setItem('tasks', JSON.stringify(this.toDoList.tasks));
    this.toDoList.populateList();
  }
}