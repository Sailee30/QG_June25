const express = require('express');
const mysql2 = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const con= mysql2.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'abc123',
	database: 'qg_june25'
});

con.connect(err => {
  if (err) throw err;
  console.log("Connected to MySQL!");
});

app.get('/quote/:category', (req, res) => {
	const category = req.params.category;

	const sql= 'SELECT quote, author FROM quotes WHERE category = ?';
	con.query(sql,[category], (err, result) => {
    		if (err)		res.send(err);
    		else		res.send(result);
	});
});

app.listen(9000, () => {console.log("ready to serve @ 9000");});
