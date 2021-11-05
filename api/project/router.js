// build your `/api/projects` router here
const express = require('express');
const router = express.Router();
const Project = require('./model');

router.get('/', (req, res) => {
  Project.getProjects()
    .then((projects) => {
      res.status(200).json(projects);
    })
    .catch((error) => {
      res.status({ status: 500, message: error });
    });
});

router.post('/', (req, res) => {
  Project.addProject(req.body)
    .then((project) => {
      res.status(201).json(project);
    })
    .catch((error) => {
      res.status(500).json({ message: error });
    });
});
module.exports = router;
