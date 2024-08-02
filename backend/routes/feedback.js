const express = require('express');
const router = express.Router();

const controller = require('../controller/feedback');

router.get('/', controller.getFeedbackList);
router.get('/:id', controller.getFeedback);
router.post('/', controller.createFeedback);

module.exports = router;
