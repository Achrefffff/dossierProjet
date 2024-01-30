

const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
    const Reservation = sequelize.define('Reservation', {
        id: {
            type: DataTypes.INTEGER(10),
            primaryKey: true,
            autoIncrement: true
        },
        date: {
            type: DataTypes.DATEONLY, 
            defaultValue: DataTypes.NOW,
            allowNull: false
        },
        heure: {
            type: DataTypes.TIME,
            defaultValue: DataTypes.NOW,
            allowNull: false,
        },
        nbPersonnes: {
            type: DataTypes.INTEGER(10),
            defaultValue: 0,
            allowNull: false
        },
        nom: {
            type: DataTypes.STRING(100),
            defaultValue: '',
            allowNull: false
        },
        prenom: {
            type: DataTypes.STRING(100),
            defaultValue: '',
            allowNull: false
        },
        telephone: {
            type: DataTypes.STRING(10), 
            defaultValue: '',
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            validate: {
                isEmail: true
            }
        },
        message: {
            type: DataTypes.STRING(100),
            defaultValue: '',
            allowNull: true
        },
        user_id: {
            type: DataTypes.INTEGER(10),
            allowNull: true
        },
        
    }, { paranoid: true });

    return Reservation;
};
