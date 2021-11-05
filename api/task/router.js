// build your `/api/tasks` router here
const express = require('express');
const router = express.Router();
const Task = require('./model');

router.get('/', (req, res) => {
  Task.getTasks()
    .then((tasks) => {
      res.status(200).json(tasks);
    })
    .catch((error) => {
      res.status({ status: 500, message: error });
    });
});

router.post('/', (req, res) => {
  Task.addTask(req.body)
    .then((task) => {
      res.status(201).json(task);
    })
    .catch((error) => {
      res.status(500).json({ message: error });
    });
});
module.exports = router;
