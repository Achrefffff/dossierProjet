const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const DB = require('../db.config')
const User = DB.User
const fs = require('fs')
exports.login = async (req, res) => {
    const { email, password } = req.body
    if(!email || !password){
        return res.status(400).json({ message: 'mauvais email ou password'})
    }
    try{
        let user = await User.findOne({ where: {email: email}, raw: true})
        if(user === null){
            return res.status(401).json({ message: 'ce compte n existe pas  !'})
        }
        let test = await User.checkPassword(password, user.password)
        if(!test){
            return res.status(401).json({ message: 'Wrong password'})
        }
        const secret=fs.readFileSync('./certifs/private.pem')
        const token = jwt.sign({
            id: user.id,
            nom: user.nom,
            prenom: user.prenom,
            email: user.email
        }, secret, { expiresIn: process.env.JWT_DURING, algorithm: 'RS256'})        
        return res.json({access_token: token})
    }catch(err){
        if(err.name == 'SequelizeDatabaseError'){
            res.status(500).json({ message: 'Database Error', error: err })
        }
        res.status(500).json({ message: 'Login process echoué', error: err})        
    }
}