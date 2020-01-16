const express = require('express');

const Database = require('../data/seeds/03-posts');
const checkFor = require('./checkForMiddleware.js');

const router = express.Router();

//Get all posts
router.get('/', (req, res) => {
  
});

router.get('/:id', (req, res) => {
  // do your magic!
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
}

module.exports = router;
