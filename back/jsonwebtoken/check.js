/***********************************/
const jwt = require('jsonwebtoken')
const fs = require('fs')
/*** Extraction du token */
const extractBearer = authorization => {

    if(typeof authorization !== 'string'){
        return false
    }
  //  isolation,n  token
    const matches = authorization.match(/(bearer)\s+(\S+)/i)

    return matches && matches[2]

}
const checkTokenMiddleware = (req, res, next) => {
    const token = req.headers.authorization && 
    extractBearer(req.headers.authorization)
    if(!token){
        return res.status(401).json({ message: 'Ho le petit malin !!!'})
    }
    // check la validité du token
    const secret=fs.readFileSync('./certifs/public.pem')    
    jwt.verify(token, secret, (err, decodedToken) => {
        if(err){
            return res.status(401).json({message: 'Bad token'})
        }
        next()
    })
}
module.exports = checkTokenMiddleware
