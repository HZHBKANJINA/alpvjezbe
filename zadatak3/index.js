const mysql=require('mysql');
const express=require('express');
const app=express();

const con=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"brile",
    database:"zadatak3"
});

app.get('/gradovi', (req, res) => {
    con.query("SELECT * FROM gradovi;", function(error, result) {
        res.json(result);  
    })
})

app.get('/dodaj_grad', (req, res) => {
    con.query("INSERT INTO gradovi VALUES (NULL, 'Čapljina', 89000, 1);", function(error, result) {
        console.log(result);  
    })

    con.query("SELECT * FROM gradovi;", function(error, result) {
        res.json(result);  
    })
})

app.listen(3000, () => {
    console.log("Pokrenuta aplikacija na portu 3000.");
});


