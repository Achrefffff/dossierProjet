const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
    const Formule = sequelize.define('Formule', {
        id: {
            type: DataTypes.INTEGER(10),
            primaryKey: true,
            autoIncrement: true
        },
        prix: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        text: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        user_id: {
            type: DataTypes.INTEGER(10),
            allowNull: true
        },
        
    }, { paranoid: true })          

    Formule.belongsToMany(Cocktail, { through: 'FormuleCocktails' });
    Cocktail.belongsToMany(Formule, { through: 'FormuleCocktails' });

    return Formule;
}