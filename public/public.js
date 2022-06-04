const inputField = document.querySelector('form');
const taskList = document.querySelector('ul');

const baseURL = '/api/list';

const checkData = ({ data: list }) => {
  populateList(list);
};

const errorCatch = (error) => console.log(error);

const getAllTasks = () => {
  axios.get(baseURL).then(checkData).catch(errorCatch);
};

const newTask = (body) => {
  axios.post(baseURL, body).then(checkData).catch(errorCatch);
};

const crossOffTask = (id) => {
  axios.put(`${baseURL}/${id}`).then(checkData).catch(errorCatch);
};

const deleteTask = (id) => {
  axios.delete(`${baseURL}/${id}`).then(checkData).catch(errorCatch);
};

const getPlaceHolder = () => {
  axios.get('/api/list/placeholder').then(function (response) {
    document.getElementsByName('task-input')[0].placeholder = response.data;
  });
};

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

const createTaskCard = (list) => {
  const taskContainer = document.createElement('li');
  if (list.completed) {
    taskContainer.innerHTML = `<span>
  <p class="crossed-off" onclick="crossOffTask(${list.task_id})">${list.task}</p>
   <button onclick="deleteTask(${list.task_id})">X</button> </span>`;
  } else {
    taskContainer.innerHTML = `<span>
    <p onclick="crossOffTask(${list.task_id})">${list.task}</p>
     <button class="delete" onclick="deleteTask(${list.task_id})">X</button> </span>`;
  }

  taskList.appendChild(taskContainer);
};

const populateList = (lists) => {
  taskList.innerHTML = '';
  for (let i = 0; i < lists.length; i++) {
    createTaskCard(lists[i]);
  }
};

inputField.addEventListener('submit', getNewTask);

getAllTasks();
