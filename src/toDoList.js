class ToDoList {
  constructor() {
    this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    this.listContainer = document.getElementById('list-container');
    this.list = this.listContainer.querySelector('ul') || document.createElement('ul');
    this.listContainer.appendChild(this.list);
    this.populateList();
  }

  addTask(description) {
    const task = {
      description,
      completed: false,
      index: this.tasks.length,
    };
    this.tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
    this.populateList();
  }

  removeCompletedTasks() {
    const listItems = this.list.querySelectorAll('li');
    const completedTasks = [];
    for (let i = 0; i < listItems.length; i += 1) {
      const checkbox = listItems[i].querySelector('.checkbox');
      if (checkbox.checked) {
        completedTasks.push(i);
        listItems[i].remove();
      }
    }

    this.tasks = this.tasks.filter((task, index) => !completedTasks.includes(index));
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
    this.populateList();
  }

  editTask(index, newDescription) {
    if (index < this.tasks.length) {
      this.tasks[index].description = newDescription;
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
      this.populateList();
    }
  }

  populateList() {
    this.list.innerHTML = '';
    for (let i = 0; i < this.tasks.length; i += 1) {
      const task = this.tasks[i];
      const listItem = document.createElement('li');
      listItem.innerHTML = `<input type="checkbox" class="checkbox"></input>${task.description}`;
      listItem.addEventListener('click', (event) => {
        if (event.target.className !== 'checkbox') {
          let inputField = document.createElement('input');
          inputField.value = task.description;
          inputField.addEventListener('keyup', (event) => {
            if (event.code === 'Enter') {
              this.editTask(i, inputField.value);
              listItem.innerHTML = `<input type="checkbox" class="checkbox"></input>${inputField.value}`;
            }
          });
          inputField.addEventListener('focusout', (event) => {
            if (event.code !== 'Enter') {
              this.editTask(i, task.description);
              listItem.innerHTML = `<input type="checkbox" class="checkbox"></input>${task.description}`;
            }
          });
          listItem.innerHTML = '';
          listItem.appendChild(inputField);
          inputField.focus();
        }
      });
      this.list.addEventListener('change', (event) => {
        if (event.target.className === 'checkbox') {
          task.completed = event.target.checked;
        }
      });
      this.list.appendChild(listItem);
    }
  }
}

export default ToDoList;