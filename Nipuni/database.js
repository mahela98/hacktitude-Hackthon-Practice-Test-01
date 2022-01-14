var mysql = require('mysql2');

var connection = mysql.createConnection({
    host: 'db-mysql-blr1-31903-do-user-10351008-0.b.db.ondigitalocean.com',
    user: 'doadmin',
    password: '0uNUiwhiRBJOOam8',
    database: 'defaultdb',
    port: '25060'
});
connection.connect(function (error) {
    if (!!error) {
        console.log("error in connecting to database")
        console.log(error);
    } else {
        console.log('Connected..!');
    }
});

module.exports = connection;