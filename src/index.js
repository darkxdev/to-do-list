class ToDoList {
  constructor() {
    this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    this.populateList();
  }

  addTask(description) {
    let task = {
      description: description,
      completed: false,
      index: this.tasks.length
    }
    this.tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  removeCompletedTasks() {
    let listContainer = document.getElementById("list-container");
    let list = listContainer.querySelector('ul');
    let listItems = list.querySelectorAll('li');
    let completedTasks = [];
    for (let i = 0; i < listItems.length; i++) {
      let checkbox = listItems[i].querySelector('.checkbox');
      if (checkbox.checked) {
        completedTasks.push(i);
        listItems[i].remove();
      }
    }

    // remove completed tasks from the tasks array
    this.tasks = this.tasks.filter((task, index) => !completedTasks.includes(index));
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
    this.populateList();
  }

  populateList() {
    let listContainer = document.getElementById("list-container");
    let list = document.createElement("ul");

    if(!listContainer.querySelector('ul')) {
      listContainer.appendChild(list);
    } else {
      list = listContainer.querySelector('ul');
      list.innerHTML = "";
    }

    for (let i = 0; i < this.tasks.length; i++) {
      let task = this.tasks[i];
      let listItem = document.createElement("li");
      listItem.innerHTML = `<input type="checkbox" class="checkbox"></input>${task.description}`;
      let checkbox = listItem.querySelector('.checkbox');
      
      list.addEventListener('change', (event) => {
        if(event.target.className === 'checkbox') {
          task.completed = event.target.checked;
        }
      });
      list.appendChild(listItem);
    }
  }
}

const toDoList = new ToDoList();

document.addEventListener('keyup', function(event) {
  let inputField = document.getElementById("input-field");
  if (event.code === 'Enter' && document.activeElement === inputField) {
    toDoList.addTask(inputField.value);
    toDoList.populateList();
    inputField.value = "";
  }
});

const clearButton = document.getElementById('clear-button');

clearButton.addEventListener('click', () => {
  toDoList.removeCompletedTasks();
});
