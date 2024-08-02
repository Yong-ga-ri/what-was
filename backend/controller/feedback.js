const pool = require('../config/mariadb.config');

exports.createFeedback = async (req, res) => {
	const requestMsg = req.body.msg;
	if (!requestMsg) return res.status(400).json({ error: 'empty request message' });
	conn = await pool();

	try {
		const rows = await conn.query(
			`INSERT INTO tbl_feedback (memo, content, updated_at, created_at, is_active, member_id) VALUE(' ', '${requestMsg}', NOW(), NOW(), TRUE, 3)`
		);
		console.log("rows: ", rows);
		res.json({
			"result_msg": "done successfully"
		});
	} catch (err) {
		console.log(err);
			res.status(500).send("Error writing feedback");
	} finally {
		if (conn) conn.release();
	}
}

exports.getFeedback = async (req, res) => {
	const reqId = req.params.id;
	if (!reqId) return res.status(400).json({ error: 'empty request message' });
	conn = await pool();

	try {
		const resultSet = await conn.query(
			`SELECT memo, content, updated_at, created_at, member_id FROM tbl_feedback WHERE feedback_id = ${reqId}`
		);
		res.json({
			'reqId': reqId,
			'result': resultSet[0]
		})
	} catch (err) {
		res.status(500).send("Error reading feedback");
	} finally {
		if (conn) conn.release();
	}
}

exports.getFeedbackList = async (req, res) => {
	conn = await pool();

	try {
		const resultSet = await conn.query(
			`SELECT memo, content, updated_at, created_at, member_id FROM tbl_feedback WHERE is_active = TRUE`
		);
		res.json({
			'result': resultSet
		})
	} catch (err) {
		res.status(500).send("Error reading feedback");
	} finally {
		if (conn) conn.release();
	}
}
