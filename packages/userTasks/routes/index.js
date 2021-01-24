const router = require('express').Router();
const userTask = require('./userTask');

router.use(userTask);

module.exports = router;
