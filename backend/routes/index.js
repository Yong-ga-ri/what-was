var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) =>
  res.send("Hi Claire Welcome to Node.js")
);

module.exports = router;
