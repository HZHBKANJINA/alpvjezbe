const mysql = require('mysql');
const express = require('express');

const app = express();
app.use(express.urlencoded());

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "brile",
    database: "zadatak5"
})


app.get('/gradovi', (req, res) => {
    con.query("SELECT * FROM gradovi;", function(error, result) {
        res.json(result);  
    })
})

app.post('/gradovi', (req, res) => {
    let naziv_grada = req.body.naziv_grada;
    let postanski_broj = req.body.postanski_broj;
    let zupanija_id = req.body.zupanija_id;
    
    con.query(`INSERT INTO gradovi VALUES (1, '${naziv_grada}', ${postanski_broj}, ${zupanija_id});`, function(error, result) {
        if (error) res.send(error)

        res.send('Uspješno dodan grad.')
    })
})

app.put('/gradovi/:id', (req, res) => {
    let grad_id = req.params.id;
    let naziv_grada = req.body.naziv_grada;
    let postanski_broj = req.body.postanski_broj;
    let zupanija_id = req.body.zupanija_id;
    
    con.query(`UPDATE gradovi SET naziv_grada = '${naziv_grada}', postanski_broj = ${postanski_broj}, zupanija_id = ${zupanija_id} WHERE id = ${grad_id};`, function(error, result) {
        if (error) res.send(error)

        res.send('Uspješno uređen grad.')
    })
})

app.delete('/gradovi/:id', (req, res) => {
    let grad_id = req.params.id;
    
    con.query(`DELETE FROM gradovi WHERE id=${grad_id};`, function(error, result) {
        if (error) res.send(error)

        res.send('Uspješno izbrisan grad.')
    })
})

app.get('/zupanija/:zupanija_id/gradovi', (req, res) => {
    let zupanija_id = req.params.zupanija_id;

    con.query(`SELECT * FROM gradovi WHERE zupanija_id=${zupanija_id};`, function(error, result) {
        res.json(result);  
    })
})

app.listen(3000, () => {
    console.log("Pokrenuta aplikacija na portu 3000.");
});