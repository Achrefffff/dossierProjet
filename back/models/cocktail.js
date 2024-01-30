
const { DataTypes } = require('sequelize')
module.exports = (sequelize) => {
    return Cocktail = sequelize.define('Cocktail', {
        id: {
            type: DataTypes.INTEGER(10),
            primaryKey: true,
            autoIncrement: true
        },
        user_id:{
            type: DataTypes.INTEGER(10),
            allowNull: true
        },
        nom:{
            type: DataTypes.STRING(100),
            defaultValue: '',
            allowNull: false
        },
        description:{
            type: DataTypes.TEXT,
            defaultValue: '',
            allowNull: false,
        },
        recette:{
            type: DataTypes.TEXT,
            defaultValue: '',
            allowNull: false,
        },
        photo: {
            type: DataTypes.STRING, 
            allowNull: true,
        }
    }, { paranoid: true })           
}


