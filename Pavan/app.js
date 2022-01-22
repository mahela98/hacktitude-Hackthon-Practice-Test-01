const path = require('path');
const express = require('express');
const bodyParser = require('body-parser'); 
const mysql = require('mysql');
const e = require('express');

//hello world

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

//create DataBase connection
const connection = mysql.createConnection({
    host: process.env.HOST,
    user: 'root',
    password: '',
    database: 'node_crud_test'
});

connection.connect(function (err) {
    if(err){
        console.log('err');
    }
    else{
        console.log('Database Connected');
    }
})

//set View Engine
app.set('view engine', 'ejs');

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//route
app.get('/', (req, res) => {
    let sql = 'SELECT * FROM users';
    connection.query(sql, (err, rows) => {
        if(err){
            console.log(err);
        }
        else{
            res.render('index', { title: 'Home',users: rows});
        }
    }) 
});

app.get('/add-new-user', (req,res) => {
    res.render('addUser', { title : 'Add New User'});
});

app.post('/save', (req, res) => {
    let data = { name: req.body.name, email: req.body.email, phone_no: req.body.phone_no};
    // let data = { name: 'vhg', email: 'vhg@gmail.com', phone_no: '01752545'};
    let sql = "INSERT INTO users SET ?";
    connection.query(sql, data, (err, result) => {
        if(err) {
            console.log(err);
        } else{
            res.redirect('/');
        }
    });
});

app.get('/edit/:id', (req, res) => {
    const id = req.params.id;
    let sql = `SELECT * FROM users WHERE id = ${id}`;
    connection.query(sql, (err, result) => {
        if(err){
            console.log(err);
        }
        else{
            res.render('user_edit', { title: 'Updating User', user: result[0] });
        }
    });
});

app.post('/update', (req, res) => {
    
    let sql = "UPDATE users SET name = '"+req.body.name+"', email = '"+req.body.email+"', phone_no = '"+req.body.phone_no+"' WHERE id='"+req.body.id+"' "; 
    connection.query(sql, (err) => {
        if(err){
            console.log(err);
        }
        else{
            res.redirect('/');
        }
    });
});

app.get('/delete/:id', (req, res) => {
    const id = req.params.id;
    let sql = `DELETE FROM users WHERE id = ${id}`;
    connection.query(sql, (err, result) => {
        if(err){
            console.log(err);
        }
        else{
            res.redirect('/');
        }
    })
})

//listen Port+++

app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
})