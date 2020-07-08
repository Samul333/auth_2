const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const app = express()
const port = process.env.PORT || 3000
const bcrypt = require('bcrypt')
const cookieParser = require('cookie-parser')
const {auth} = require('./models/middleware/auth')
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/auth')


const {User} = require('./models/User')
const {Car} = require('./models/Cars')
app.use(bodyParser.json());
app.use(cookieParser());



app.post('/api/user',(req,res)=>{
    const user = new User({
        email:req.body.email,
        password:req.body.password
    });

    user.save((err,doc)=>{
        if(err)res.status(400).send(err)

        res.status(200).send(doc)
    })
})

app.post('/api/car',(req,res)=>{
    const car = new Car({
        brand:req.body.brand,
        year:req.body.year
    });

    car.save((err,doc)=>{
        if(err)res.status(400).send(err)
        res.status(200).send(doc)
    })
})

app.post('/api/user/login',(req,res)=>{
    User.findOne({'email':req.body.email},(err,user)=>{
            if(!user) res.json({message:'User not Found'})
             user.comparePassword(req.body.password,(err,isMatch)=>{
                if(err) throw err;
                if(!isMatch) return res.status(400).json({
                    message:"Wrong Password"
                });

                user.generateToken((err,user)=>{
                    if(err) return res.status(400).send('error')
                    res.cookie('auth',user.token).send('ok')

                })
           })
    })
})

app.get('/user/profile',auth,(req,res)=>{

    res.status(200).send(req.token)
    

   
   
})

app.listen(port,()=>{
    console.log(`The server is started on port ${port}`)
})