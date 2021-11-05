// build your `/api/resources` router here
const express = require('express');
const router = express.Router();
const Resource = require('./model');
router.get('/', (req, res) => {
  Resource.getResources()
    .then((resource) => {
      res.status(200).json(resource);
    })
    .catch((error) => {
      res.status({ status: 500, message: error });
    });
});

router.post('/', (req, res) => {
  Resource.addResource(req.body)
    .then((resource) => {
      res.status(201).json(resource);
    })
    .catch((error) => {
      res.status(500).json({ message: error });
    });
});

module.exports = router;
