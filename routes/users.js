var express = require('express');
var router = express.Router();

const userRouter = express.Router();

/* GET users listing. */
userRouter.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
