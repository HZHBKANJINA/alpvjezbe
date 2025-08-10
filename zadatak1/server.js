const express=require('express');
const app=express();
const port=3000;

app.set('view engine','ejs');

app.get('/',(req,res)=>{
    console.log('Početna stranica')

    res.send('Početna stranica je u funkciji')
})

app.get('/onama',(req,res)=>{
    console.log("TEST")

    res.render('onama',{moje_ime:'Jozo'})
})

app.get('/kontakt',(req,res)=>{
    res.render('kontakt',{
        broj:'123456789',
        adresa:'Kanjina bb',
        grad:'Kanjina',
        gosti:['Roke','Mare','Zdena']
    })
})

app.listen(port,()=>{
    console.log("Aplikacija radi na portu" + port)
})