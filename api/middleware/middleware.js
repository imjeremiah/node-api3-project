const User = require('../users/users-model');

function logger(req, res, next) {
  console.log(`A ${req.method} request happened on ${req.url} at ${Date.now()}`);
  next();
}

function validateUserId(req, res, next) {
  const { id } = req.params;
  User.getById(id)
    .then(possibleUser => {
      possibleUser ? (req.user = possibleUser, next()) : res.status(404).json({ message: "user not found" });
    })
    .catch(next)
}

function validateUser(req, res, next) {
  req.body.name ? next() : res.status(400).json({ message: "missing required name field" });
}

function validatePost(req, res, next) {
  req.body.text ? next() : res.status(400).json({ message: "missing required text field" });
}

// do not forget to expose these functions to other modules
module.exports = { logger, validateUserId, validateUser, validatePost }