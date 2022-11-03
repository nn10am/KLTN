var mysql = require('mysql')

// Create mysql connetion

var dbConn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'projetnhat',
})

dbConn.connect(function (error) {
  if (error) throw error
  console.log('Database Connected Succesfully!!!!!')
})

module.exports = dbConn
