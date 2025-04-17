const { createConnection } = require('mysql2');
require('dotenv').config();

const connection = createConnection({
  host: process.env.DATABASEHOST,
  user: process.env.DATABASEUSER,
  password: process.env.DATABASEPASS,
  database: process.env.DATABASE,
  port: 3306
});

connection.connect((error) => {
  if (error) {
    console.error('Error connecting to MySQL: ' + error.stack);
    return;
  }
  console.log('Main File Connected to MySQL database!');
});

module.exports = connection;

// // Example: Query the database
// connection.query('SELECT * FROM userlist', (err, results) => {
//     if (err) {
//       console.error(err);
//       return;
//     }
//     console.log(results);
//   });