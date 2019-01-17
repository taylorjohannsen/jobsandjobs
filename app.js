const express = require('express');
const mysql = require('mysql');
const db = require('./db');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const favicon = require('serve-favicon');

app.use(favicon(__dirname + '/public/images/favicon.ico'));

app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'ejs');


app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json());

app.use('/public', express.static(path.join(__dirname, "public")));

app.get('/', (req, res) => {
    db.query('SELECT * FROM posts ORDER BY id DESC', (err, result) => {
        if (err) throw err;
        var data = {
            print: result
        };
        res.render('index', data);
    });
});

app.get('/search', (req, res) => {
    db.query('SELECT * FROM posts ORDER BY id DESC', (err, result) => {
        if (err) throw err;
        var data = {
            print: result
        };
        res.render('search', data);
    });
});

app.get('/newpost', (req, res) => {
    res.render('posting');
})

app.post('/addpost', (req, res) => {
    let title = req.body.title;
    let company = req.body.company;
    let location = req.body.location;
    let description = req.body.description;

    db.query('INSERT INTO posts (title, name, location, body, date) VALUES (?, ?, ?, ?, NOW())',  [title, company, location, description], function(err, rows, fields) {
        if (err) throw err;
        console.log('Post added!');
    });
    res.redirect('/');
});

app.post('/searchdb', (req, res) => {
    let location = req.body.location;
    let keyword = req.body.keyword;
    keyword = '%' + keyword + '%';
    location = '%' + location + '%';

    db.query("SELECT * FROM posts WHERE body LIKE ? OR name LIKE ? AND location LIKE ?",  [keyword, keyword, location], function(err, result) {
        if (err) throw err;
        console.log('Search Completed!');
        var data = {
            print: result
        };
        res.render('search', data);
    });
});


app.listen(8000, '127.0.0.1', () => console.log("Connected"));
