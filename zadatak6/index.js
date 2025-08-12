import { Sequelize,DataTypes } from "sequelize";
import express from 'express';
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from 'swagger-ui-express';

const app=express();
app.use(express.urlencoded());

const swaggerOptions={
    definition:{
        openapi:'3.0.0',
        info:{
            title:'Primjer API ruta za testiranje',
            version:'1.0.0',
            description:'Swagger dokumentacija za sve CRUD operacije'
        },
    },
    apis:['index.js'],
};

const swaggerSpec=swaggerJSDoc(swaggerOptions);
app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerSpec));

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


/**
 * @swagger
 * /gradovi:
 *   get:
 *     summary: Dohvati sve gradove s pripadajućim županijama
 *     responses:
 *       200:
 *         description: Lista gradova s detaljima županija
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
app.get('/gradovi', async (req, res) => {
    const gradovi = await Grad.findAll({ include: 'zupanija' });

    res.json(gradovi);  
})

/**
 * @swagger
 * /zupanije/{id}:
 *   get:
 *     summary: Dohvati jednu županiju po ID-u s pripadajućim gradovima
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID županije
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Županija s listom gradova
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
app.get('/zupanije/:id', async (req, res) => {
    let zupanija = await Zupanija.findByPk(req.params.id, {include: 'gradovi'});

    res.json(zupanija);  
})


/**
 * @swagger
 * /gradovi:
 *   post:
 *     summary: Dodaj novi grad
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - naziv
 *               - postanski_broj
 *               - zupanija_id
 *             properties:
 *               naziv:
 *                 type: string
 *               postanski_broj:
 *                 type: integer
 *               zupanija_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Grad uspješno dodan
 */
app.post('/gradovi', async (req, res) => {
    let {naziv_grada, postanski_broj, zupanija_id} = req.body;

    await Grad.create({ 
        naziv_grada: naziv_grada, 
        postanski_broj: postanski_broj, 
        zupanija_id: zupanija_id
    });

    res.send('Uspješno dodan grad.')
})

/**
 * @swagger
 * /gradovi/{id}:
 *   delete:
 *     summary: Obriši grad po ID-u
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID grada
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Grad uspješno obrisan
 */
app.delete('/gradovi/:id', async (req, res) => {
    let grad = await Grad.findByPk(req.params.id);
    await grad.destroy();
    res.send('Uspješno izbrisan grad.')
})

/**
 * @swagger
 * /gradovi/{id}:
 *   put:
 *     summary: Ažuriraj postojeći grad
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID grada koji se ažurira
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - naziv
 *               - postanski_broj
 *               - zupanija_id
 *             properties:
 *               naziv:
 *                 type: string
 *               postanski_broj:
 *                 type: integer
 *               zupanija_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Grad uspješno ažuriran
 */
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