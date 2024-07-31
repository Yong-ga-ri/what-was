require('dotenv').config();
const mariadb = require('mariadb');

// generate mariadb connection pool
const pool = mariadb.createPool({
	host: process.env.MARIADB_HOST,
	user: process.env.MARIADB_USER,
	password: process.env.MARIADB_PASSWORD,
	database: process.env.MARIADB_DATABASE,
	connectionLimit: process.env.DB_CONNECTION_LIMIT || 10
});

// query function return promise
const getPromisPool = async () => {
	try {
		const conn = await pool.getConnection();
		console.log("succesfully connected with database");
		return conn;
	} catch (error) {
		throw error;
	}
};

module.exports = getPromisPool;
