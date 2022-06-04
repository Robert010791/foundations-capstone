require('dotenv').config();
const { SERVER_PORT } = process.env;
const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');

const publicDir = path.join(__dirname, 'public');

app.use(express.static(publicDir));

const { seed } = require('./seed');
const {
  getAllTasks,
  newTask,
  crossOffTask,
  deleteTask,
  getPlaceHolder,
} = require('./controller');

app.use(cors());
app.use(express.json());

app.get('/api/list', getAllTasks);
app.get('/api/list/placeholder', getPlaceHolder);
app.post('/api/list', newTask);
app.put('/api/list/:id', crossOffTask);
app.delete('/api/list/:id', deleteTask);

//DEV
app.post('/api/seed', seed);

app.listen(SERVER_PORT, () =>
  console.log(`Server is up and atom!! on port ${SERVER_PORT}`)
);
