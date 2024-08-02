const express = require('express');
const router = express.Router();
const pool = require('../config/mariadb.config');

/* GET users listing. */

router.get('/', async (req, res) => {
  try {
    conn = await pool();
    const rows = await conn.query('SELECT * FROM tbl_member');
    res.json(rows);
  } catch (err) {
    res.status(500).send("Error fetching users");
  } finally {
		if (conn) conn.release();
	}
});

module.exports = router;
