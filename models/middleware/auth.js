const {User} = require('../../models/User')

let auth=(req,res,next)=>{
    let token = req.cookies.auth
    User.findByToken(token,(err,user)=>{
            if(err) throw err;
            if(!user) return res.status(401).send('no access')

           res.token = token 
           next();
    })

}


module.exports = {auth}