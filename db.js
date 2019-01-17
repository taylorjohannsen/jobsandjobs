const mysql = require('mysql');
const express = require('express');

const connection = mysql.createConnection({
    // DB credentials
});

connection.connect(function(err) {
    if (err) throw err;
    console.log('Connected to DB!');
})

module.exports = connection;