const express = require('express');
const router = express.Router();
// const pool = require('../config/mariadb.config');
const openaiService = require('../service/openaiService');

/* GET users listing. */

router.post('/keyword', async (req, res) => {
	try {
		const prompt = req.body.msg;
		let response;
		if (!prompt) return res.status(400).json({ error: 'empty request message' });

		try {
			console.log("before to service: response: ", response);
			response = await openaiService.getKeywordsResponse(prompt);
			console.log("after to service: response: ", response);
			res.json({ response });
		} catch (err) {
			res.status(500).send("Error requesting openai with keyword");
		}

		// db에 검색 결과 저장
		//   conn = await pool();
		//   const [rows] = await conn.query('SELECT * FROM tbl_member');
		//   res.json(rows);
		// } catch (err) {
		//   res.status(500).send("Error requesting openai");
		// } 
		} catch {
			res.status(500).send("Error fetching users");
		}
	}
);

router.post('/idiom', async (req, res) => {
	try {
		const { prompt } = req.body.msg;
		let response;
		if (!prompt) return res.status(400).json({ error: 'empty request message' });

		try {
			response = await openaiService.getIdiomResponse(prompt);
			res.json({ response });
		} catch (err) {
			res.status(500).send("Error requesting openai with idiom");
		}

		// db에 검색 결과 저장
		//   conn = await pool();
		//   const [rows] = await conn.query('SELECT * FROM tbl_member');
		//   res.json(rows);
		// } catch (err) {
		//   res.status(500).send("Error requesting openai");
		// } 
		} catch {
			res.status(500).send("Error fetching users");
		}
	}
);

module.exports = router;
