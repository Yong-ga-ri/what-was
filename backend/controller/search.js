const openaiService = require('../service/openaiService');
const pool = require('../config/mariadb.config');


exports.search = async (req, res) => {
	const requestMsg = req.body.msg;
	const reqestType = req.query.type;

	if (reqestType === 'idiom') type = false;
	else if (reqestType === 'keyword') type = true;
	else return res.status(400).json({ error: 'wrong param' });

	if (!requestMsg) return res.status(400).json({ error: 'empty request message' });
	try {
		if (type === false) result = await openaiService.getKeywordsResponse(requestMsg)
		else if (type === true) result = await openaiService.getIdiomResponse(requestMsg)

		try {
			conn = await pool();
			const rows = await conn.query(
				`INSERT INTO tbl_search (message, answer, updated_at, created_at, type, member_id) VALUE('${requestMsg}', '${result}', NOW(), NOW(), ${type}, 3)`
			);
			res.json({
				"request_msg": requestMsg,
				"result_message": result.split(', '),
				"request_type": reqestType
			});
		} catch (err) {
			res.status(500).send("Error stocking response on db");
		} finally {
			if (conn) conn.release();
		}
	} catch (err) {
		res.status(500).send("Error requesting openai");
	}
};

exports.getAllSearchHistoryList = async (req, res) => {
	try {
		conn = await pool();
		const result = await conn.query(
			`SELECT message, answer, updated_at, created_at FROM tbl_search ORDER BY created_at DESC`
		);
		res.json({
			"result_message": result
		});
	} catch (err) {
		res.status(500).send(`Error searching history`);
	} finally {
		if (conn) conn.release();
	}
};

exports.getHistoryListByType = async (req, res) => {
	const reqestType = req.params.type;

	if (reqestType === 'idiom') type = false;
	else if (reqestType === 'keyword') type = true;
	else return res.status(400).json({ error: 'wrong param' });

	try {
		conn = await pool();
		const result = await conn.query(
			`SELECT message, answer, updated_at, created_at FROM tbl_search WHERE type = ${type} ORDER BY created_at DESC`
		);
		res.json({
			"result_message": result,
			"request_type": req.params.type
		});
	} catch (err) {
		res.status(500).send(`Error searching history with ${reqestType} `);
	} finally {
		if (conn) conn.release();
	}
};

exports.getSearchHistoryById = async (req, res) => {
	const id = req.params.id;

	try {
		conn = await pool();
		const result = await conn.query(
			`SELECT message, answer, updated_at, created_at FROM tbl_search WHERE search_id = ${id}`
		);
		res.json({
			"request_message": result[0].message,
			"result_message": result[0].answer.split(', '),
			"created_at": result[0].created_at
		});
	} catch (err) {
		res.status(500).send(`Error searching history by ${id} `);
	} finally {
		if (conn) conn.release();
	}
}