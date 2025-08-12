import { Sequelize,DataTypes } from "sequelize";
import express from 'express';

const app=express();
app.use(express.urlencoded());

const sequelize=new Sequelize('zadatak6','root','brile',{
    host:'localhost',
    dialect:"mysql"
});

try{
    await sequelize.authenticate();
    console.log('Spojeno na bazu');
}catch(error){
    console.error('Greška prilikom spajanja',error);
}

const Grad=sequelize.define('Grad',{
    grad_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    naziv_grada:{
        type:DataTypes.STRING,
        allowNull:false
    },
    postanski_broj:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    zupanija_id:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
},{
    tableName:'gradovi',
    timestamps:false
});

const Zupanija=sequelize.define('Zupanija',{
    zupanija_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    naziv:{
        type:DataTypes.STRING,
        allowNull:false
    }
},{
    tableName:'zupanije',
    timestamps:false
});

Zupanija.hasMany(Grad,{
    foreignKey:'zupanija_id',
    as:'gradovi'
});

Grad.belongsTo(Zupanija,{
    foreignKey:'zupanija_id',
    as:'zupanija'
});

app.get('/gradovi', async (req, res) => {
    const gradovi = await Grad.findAll({ include: 'zupanija' });

    res.json(gradovi);  
})


app.get('/zupanije/:id', async (req, res) => {
    let zupanija = await Zupanija.findByPk(req.params.id, {include: 'gradovi'});

    res.json(zupanija);  
})



app.post('/gradovi', async (req, res) => {
    let {naziv_grada, postanski_broj, zupanija_id} = req.body;

    await Grad.create({ 
        naziv_grada: naziv_grada, 
        postanski_broj: postanski_broj, 
        zupanija_id: zupanija_id
    });

    res.send('Uspješno dodan grad.')
})


app.delete('/gradovi/:id', async (req, res) => {
    let grad = await Grad.findByPk(req.params.id);
    await grad.destroy();
    res.send('Uspješno izbrisan grad.')
})


app.put('/gradovi/:id', async (req, res) => {
    let id = req.params.id;
    let {naziv_grada, postanski_broj, zupanija_id} = req.body;

    let grad = await Grad.findByPk(id);
    grad.naziv_grada = naziv_grada;
    grad.postanski_broj = postanski_broj;
    grad.zupanija_id = zupanija_id;
    await grad.save();

    res.send('Uspješno uređen grad.')
})

app.listen(3000, () => {
    console.log("Pokrenuta aplikacija na portu 3000.");
});