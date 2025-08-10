const express = require('express')
const app = express()
const port = 3000

app.use(express.urlencoded());

app.get('/', (req, res) => {
    res.send('Dobar dan.')
})

app.get('/zbroji/:broj1/:broj2', (req, res) => {
    let broj1 = parseInt(req.params.broj1)
    let broj2 = parseInt(req.params.broj2)

    let zbroj = broj1 + broj2

    res.send('Zbroj = ' + zbroj)
})

app.get('/kvadriraj/:broj', (req, res) => {
    let broj = parseInt(req.params.broj)
    let kvadrat = broj ** 2

    res.send('Kvadrat = ' + kvadrat)
})

app.get('/dohvati/:tablica', (req, res) => {
    let tablica = req.params.tablica
    let sql_upit = 'SELECT * FROM ' + tablica;

    res.send(sql_upit)
})

app.post('/dodaj/:tablica', (req, res) => {
    let tablica = req.params.tablica

    let kor_ime = req.body.kor_ime;
    let email = req.body.email;
    let lozinka = req.body.lozinka;

    let korisnik = {
        "kor_ime": kor_ime,
        "email": email,
        "lozinka": lozinka
    }

    // INSERT INTO :tablica SET username = :kor_ime AND email = :email ..

    res.send(korisnik)
})

app.put('/uredi/:tablica/:id', (req, res) => {
    let tablica = req.params.tablica

    let kor_ime = req.body.kor_ime;
    let email = req.body.email;
    let lozinka = req.body.lozinka;

    let korisnik = {
        "kor_ime": kor_ime,
        "email": email,
        "lozinka": lozinka
    }

    // UPDATE :tablica SET username ... WHERE id = :id

    res.send(korisnik)
})

app.delete('/izbrisi/:tablica/:id', (req, res) => {
    let id = req.params.id
    let tablica = req.params.tablica

    // DELETE FROM :tablica WHERE id = :id

    res.send(korisnik)
})

app.post('/login', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    if (username == "marko" && password == "informatika") {
        res.send("Uspješna prijava.")
    } else {
        res.send("Neuspješna prijava.")
    }
})

app.listen(port, () => {
    console.log('Pokrenuta aplikacija.')
})