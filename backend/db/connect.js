var Promise = require('promise');
var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'dev',
  password: 'password',
  database: 'devEnvironment'
});

connection.connect();

exports.query = function(query) {
  return new Promise(function(resolve, reject) {
    connection.query(query, function(err, rows) {
      if(err) {
        return reject(err);
      }
      return resolve(rows);
    });
  });
}




