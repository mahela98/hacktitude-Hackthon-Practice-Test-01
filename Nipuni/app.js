const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

require('dotenv').config();


const app = express();
const port = 5000;

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

app.get('/gona/:id', (req, res) => {
    const id = req.params.id;
    console.log(id);
    // res.send("chaminda gona");
    res.send(id);
});

app.get('/', (req, res) => {

    res.send("chaminda gona");


});





//listening port
app.listen(port, () => {

    console.log(`server start at http://localhost:${port}`);

});

