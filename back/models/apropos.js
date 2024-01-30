/************************************/
/*** Import des modules nécessaires */
const { DataTypes } = require('sequelize');

/*******************************/
/*** Définition du modèle About */
module.exports = (sequelize) => {
    return About = sequelize.define('About', {
        id: {
            type: DataTypes.INTEGER(10),
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.INTEGER(10),
            allowNull: true
        },
        title: {
            type: DataTypes.STRING(100),
            defaultValue: '',
            allowNull: false
        },
        content: {
            type: DataTypes.TEXT,
            defaultValue: '',
            allowNull: false,
        },
        // Ajoutez d'autres champs au besoin
    }, { paranoid: true });
};
