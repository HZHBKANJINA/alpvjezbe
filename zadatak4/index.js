import { Sequelize,DataTypes } from "sequelize";

const sequelize=new Sequelize('zadatak4','root','brile',{
    host:'localhost',
    dialect:'mysql'
});

try{
    await sequelize.authenticate();
    console.log('Spojeno na bazu');
}catch(error){
    console.error('Ne može se spojiti na bazu',error);
}

const Grad = sequelize.define('Grad', {
    naziv_grada: {
        type: DataTypes.STRING,
        allowNull: false
    },
    postanski_broj: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    zupanija_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'gradovi',
    timestamps: false
});

//await Grad.create({ naziv_grada: "Tomislavgrad", postanski_broj: 92000, zupanija_id: 3});
//console.log("Uspješno dodan grad.")

let grad = await Grad.findByPk(0);
console.log(grad.naziv_grada);