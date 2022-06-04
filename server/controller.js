require('dotenv').config();
const { DATABASE_URL } = process.env;
const Sequelize = require('sequelize');

const sequelize = new Sequelize(DATABASE_URL, {
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
    .query(
      `SELECT * FROM task_table
  ORDER BY task_id asc
  `
    )
    .then((dbResult) => {
      res.status(200).send(dbResult[0]);
    })
    .catch((err) => console.log(err));
};

//
const newTask = (req, res) => {
  const { task, completed } = req.body;

  sequelize
    .query(
      `INSERT INTO task_table (task, completed)
    VALUES ('${task}', '${completed}');
    SELECT * FROM task_table
  ORDER BY task_id asc

   `
    )
    .then((dbResult) => res.status(200).send(dbResult[0]))
    .catch((err) => console.log(err));
};

//
const crossOffTask = async (req, res) => {
  const { id: task_id } = req.params;

  const [task] = await sequelize.query(
    `SELECT completed FROM task_table WHERE task_id = ${+task_id}`
  );

  sequelize
    .query(
      `UPDATE task_table
  SET completed = ${!task[0].completed}
  WHERE task_id = ${+task_id};
  SELECT * FROM task_table
  ORDER BY task_id asc
  `
    )
    .then((dbResult) => res.status(200).send(dbResult[0]))
    .catch((err) => console.log(err));
};

//
const deleteTask = async (req, res) => {
  const { id: task_id } = req.params;
  const [task] = await sequelize.query(
    `SELECT completed FROM task_table WHERE task_id = ${+task_id}`
  );
  sequelize
    .query(
      `DELETE FROM task_table
  WHERE task_id = ${+task_id};
  SELECT * FROM task_table
  ORDER BY task_id asc
  `
    )
    .then((dbResult) => res.status(200).send(dbResult[0]))
    .catch((err) => console.log(err));
};

const dbResult = require('./placeHolder.json');

const getPlaceHolder = (req, res) => {
  sequelize.query(`SELECT text FROM placeholder_text`).then((dbResult) => {
    let randomIndex = Math.floor(Math.random() * dbResult[0].length);
    let randomPlaceHolder = dbResult[0][randomIndex];
    res.status(200).send(randomPlaceHolder.text);
  });
};

const exportsObject = {
  getAllTasks,
  newTask,
  crossOffTask,
  deleteTask,
  getPlaceHolder,
};

module.exports = exportsObject;
