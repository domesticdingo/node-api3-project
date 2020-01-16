const express = require('express');

const UserDatabase = require('./userDb');
const PostDatabase = require('../posts/postDb');
const checkFor = require('./checkForMiddleware');

const router = express.Router();

const validateUserId = (req, res, next) => {
  const userId = req.params.id;

  UserDatabase.getById(userId)
    .then(user => {
      if (!user) {
        res.status(400).json({ error: 'Invalid user ID' });
      } else {
        next();
      }
    })
}

const validateUser = (req, res, next) => {
  const user = req.body;

  if (!user) {
    res.status(400).json({ error: 'Missing user data' })
  } else if (!user.name) {
    res.status(400).json({ error: 'Missing required name field' })
  } else {
    next();
  }
}

const validatePost = (req, res, next) => {
  const post = req.body;

  if (!post) {
    res.status(400).json({ error: 'Missing post data' })
  } else {
    next();
  }
}

//Create new user
router.post('/', validateUser, (req, res) => {
  const userData = req.body;

  UserDatabase.insert(userData)
    .then(user => res.status(201).json(user))
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: 'There was a problem creating a new user.' })
    })
});

//Add a post to a user by the user ID
router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  PostDatabase.insert(req.body)
    .then(post => res.status(201).json(post))
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: 'Error adding post to user.' });
    })
});

//Get all users
router.get('/', (req, res) => {
  UserDatabase.get()
    .then(users => {
      console.log('Users: ' + users);
      res.status(200).json(users);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "There was an error fetching all users." })
    })
});

//Get a user by its user ID
router.get('/:id', validateUserId, (req, res) => {
  userId = req.params.id;

  UserDatabase.getById(userId)
    .then(user => {
      console.log(user);
      res.status(200).json(user);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "Error fetching user by that ID." })
    })
});

//Get all posts from a user by user ID
router.get('/:id/posts', (req, res) => {
  userId = req.params.id;

  UserDatabase.getUserPosts(userId)
    .then(posts => res.status(200).json(posts))
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "Error fetching posts by that user ID." });
    })
});

//Delete user by ID
router.delete('/:id', validateUserId, (req, res) => {
  user = req.params.id;

  UserDatabase.remove(user)
    .then(user => res.status(200).json(user))
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "Error deleting user."});
    })
});

//Update user information
router.put('/:id', validateUser, (req, res) => {
  user = req.body.id;
  update = req.body;

  UserDatabase.update(user, update)
    .then(user => res.status(200).json(user))
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: 'Error updating user.'});
    })
});

//custom middleware



module.exports = router;
