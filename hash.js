const bcrypt = require('bcrypt')
const {MD5} = require('crypto-js')
const jwt = require('jsonwebtoken')
// bcrypt.genSalt(10,(err,salt)=>{
//     if(err) return next(err)
//     bcrypt.hash('passoword123',salt,(err,hash)=>{
//         if(err)return next(err)
//         console.log(hash)
//     })
// })
// Cryto JS
// const secret = "mypassword"

// const secretSalt = "asdsadsadas"

// const user ={
//     id:1,
//     token: MD5('password').toString() +secretSalt
// }

// const receivedToken  = '5f4dcc3b5aa765d61d8327deb882cf99asdsadsadas'

// if(receivedToken===user.token){

// }
// console.log(user)

const id ='1000'
const secret = 'supersecretword11234'
const received = 'eyJhbGciOiJIUzI1NiJ9.MTAwMA.gwv4_BDzSZj35YCBSCKIDC4cFDwOdbk1UCfBYSRMosg'
const token = jwt.sign(id,secret);

const decodeToken = jwt.verify(received,secret);


console.log(decodeToken)