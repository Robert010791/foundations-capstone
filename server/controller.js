const toDoTasks = require('./toDoListDB.json');
let id = toDoTasks.length + 1;

require('dotenv').config();
const { CONNECTION_STRING } = process.env;
const Sequelize = require('sequelize');

const sequelize = new Sequelize(CONNECTION_STRING, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
});

//
const getAllTasks = (req, res) => {
  sequelize
    .query(`SELECT * FROM task_table`)
    .then((dbResult) => {
      console.log(dbResult);
      res.status(200).send(dbResult);
    })
    .catch((err) => console.log(err));

  // res.status(200).send(toDoTasks);
};

//
const newTask = (req, res) => {
  const { task, completed } = req.body;

  const newTask = {
    id,
    task,
    completed,
  };
  toDoTasks.push(newTask);

  id++;

  res.status(200).send(toDoTasks);
};

//
const crossOffTask = (req, res) => {
  const taskToBeCrossedOff = +req.params.id;
  for (let i = 0; i < toDoTasks.length; i++) {
    const completedTask = toDoTasks[i];
    if (completedTask.id === taskToBeCrossedOff) {
      if (completedTask.completed === false) {
        completedTask.completed = true;
      } else {
        completedTask.completed = false;
      }
      return res.status(200).send(toDoTasks);
    }
  }
};

//
const deleteTask = (req, res) => {
  const taskToBeDeleted = +req.params.id;
  for (let i = 0; i < toDoTasks.length; i++) {
    const taskItem = toDoTasks[i];
    if (taskItem.id === taskToBeDeleted) {
      toDoTasks.splice(i, 1);
      return res.status(200).send(toDoTasks);
    }
  }
};

const placeHolderText = require('./placeHolder.json');

const getPlaceHolder = (req, res) => {
  let randomIndex = Math.floor(Math.random() * placeHolderText.length);
  let randomPlaceHolder = placeHolderText[randomIndex];
  res.status(200).send(randomPlaceHolder);
};

const exportsObject = {
  getAllTasks,
  newTask,
  crossOffTask,
  deleteTask,
  getPlaceHolder,
};

module.exports = exportsObject;
