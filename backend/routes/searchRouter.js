const express = require('express');
const router = express.Router();

const controller = require('../controller/search');

router.get('/', controller.getAllSearchHistoryList);
router.get('/:id', controller.getSearchHistoryById);
router.get('/:type', controller.getHistoryListByType);
router.post('/', controller.search);

module.exports = router;
