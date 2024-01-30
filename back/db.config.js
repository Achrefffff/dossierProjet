const { Sequelize } = require('sequelize')

let sequelize = new Sequelize(
    process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'mysql',
        logging: false
    }
)

const db = {}

db.sequelize = sequelize
db.User = require('./models/user')(sequelize)
db.Cocktail = require('./models/cocktail')(sequelize)
db.apropos = require('./models/apropos')(sequelize)
db.reservation = require('./models/reservation')(sequelize)
db.formules = require('./models/formules')(sequelize)


db.User.hasMany(db.Cocktail, {foreignKey: 'user_id', onDelete: 'cascade'})
db.Cocktail.belongsTo(db.User, {foreignKey: 'user_id'})
db.Cocktail.hasMany(db.formules, {foreignKey: 'cocktail_id'})
db.formules.belongsTo(db.Cocktail, {foreignKey: 'cocktail_id'})
db.User.belongsToMany(db.reservation, { through: 'UserReservation', foreignKey: 'user_id' });
db.reservation.belongsToMany(db.User, { through: 'UserReservation', foreignKey: 'reservation_id' });
db.User.hasMany(db.apropos, { foreignKey: 'user_id' });
db.apropos.belongsTo(db.User, { foreignKey: 'user_id' });
db.User.hasMany(db.formules, { foreignKey: 'user_id' });
db.formules.belongsTo(db.User, { foreignKey: 'user_id' });

db.sequelize.sync({alter: true})
module.exports = db
