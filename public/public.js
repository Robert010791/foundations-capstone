const inputField = document.querySelector('form');
const taskList = document.querySelector('ul');

const baseURL = '/api/list';

const checkData = ({ data: list }) => {
  populateList(list);
};

const errorCatch = (error) => console.log(error);

//Axios get
const getAllTasks = () => {
  axios.get(baseURL).then(checkData).catch(errorCatch);
};

//Axios post
const newTask = (body) => {
  axios.post(baseURL, body).then(checkData).catch(errorCatch);
};

//Axios put
const crossOffTask = (id) => {
  axios.put(`${baseURL}/${id}`).then(checkData).catch(errorCatch);
};

//Axios delete
const deleteTask = (id) => {
  axios.delete(`${baseURL}/${id}`).then(checkData).catch(errorCatch);
};

const getPlaceHolder = () => {
  axios.get('/api/list/placeholder').then(function (response) {
    document.getElementsByName('task-input')[0].placeholder = response.data;
  });
};

//Handles new task input
const getNewTask = (e) => {
  e.preventDefault();
  let task = document.querySelector('.input');

  if (task.value === '') {
    getPlaceHolder();
  } else {
    let taskObject = {
      task: task.value,
      completed: false,
    };

    newTask(taskObject);

    task.value = '';
  }
};

//creates li element and appends it to ul element
const createTaskCard = (list) => {
  const taskContainer = document.createElement('li');
  console.log(list.task_id);
  if (list.completed) {
    taskContainer.innerHTML = `<span>
  <p class="crossed-off" onclick="crossOffTask(${list.task_id})">${list.task}</p>
   <button onclick="deleteTask(${list.task_id})">Delete</button> </span>`;
  } else {
    taskContainer.innerHTML = `<span>
    <p onclick="crossOffTask(${list.task_id})">${list.task}</p>
     <button class="delete" onclick="deleteTask(${list.task_id})">X</button> </span>`;
  }

  taskList.appendChild(taskContainer);
};

//loops through tasks and sends them to addToList function to be created
const populateList = (lists) => {
  taskList.innerHTML = '';
  for (let i = 0; i < lists.length; i++) {
    createTaskCard(lists[i]);
  }
};

inputField.addEventListener('submit', getNewTask);

//Displays all tasks on load
getAllTasks();
