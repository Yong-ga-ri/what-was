const express = require('express');
const router = express.Router();
// const pool = require('../config/mariadb.config');
const openaiService = require('../service/openaiService');
const pool = require('../config/mariadb.config');

/* GET users listing. */

router.post('/keyword', async (req, res) => {
		const requestMsg = req.body.msg;
		if (!requestMsg) return res.status(400).json({ error: 'empty request message' });
		try {
			result = await openaiService.getKeywordsResponse(requestMsg);
			try {
				conn = await pool();
				const rows = await conn.query(
					`INSERT INTO tbl_search (message, answer, updated_at, created_at, type, member_id) VALUE('${requestMsg}', '${result}', NOW(), NOW(), TRUE, 3)`
				);
				console.log("rows: ", rows);
				res.json({
					"request_msg": requestMsg,
					"result_msg": result,
					"request_type": 1
				});
			} catch (err) {
				res.status(500).send("Error stocking response on db with idiom");
			}
		} catch (err) {
				res.status(500).send("Error requesting openai with idiom");
		}
	}
);

router.post('/idiom', async (req, res) => {
	const requestMsg = req.body.msg;
	if (!requestMsg) return res.status(400).json({ error: 'empty request message' });

		try {
			result = await openaiService.getIdiomResponse(requestMsg);

			try {
				conn = await pool();
				const rows = await conn.query(
					`INSERT INTO tbl_search (message, answer, updated_at, created_at, type, member_id) VALUE('${requestMsg}', '${result}', NOW(), NOW(), FALSE, 3)`
				);
				console.log("rows: ", rows);
				res.json({
					"request_msg": requestMsg,
					"result_msg": result,
					"request_type": 0
				});
			} catch (err) {
				res.status(500).send("Error stocking response on db with idiom");
			}
		} catch (err) {
			res.status(500).send("Error requesting openai with idiom");
		}
	}

);

module.exports = router;
