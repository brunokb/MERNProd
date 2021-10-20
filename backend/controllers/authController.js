const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');

const router = express.Router();

function generateToken(params = {}) {
    return jwt.sign(params, authConfig.secret,{
        expiresIn: 864000,
    });
    
}

router.post('/register', async(req,res) => {
    const {email} = req.body;
    try {
    if(await User.findOne({email}))
        return res.send({error: 'User already exists'});

    const user = await User.create(req.body);
    console.log(email);
    console.log("Reg");

    return res.send({
        user,
        token: generateToken({id:user.id}),
    });
    } catch (err) {
    return res.status(400).send({error: 'Registration failed'});    
    }

});

router.post('/authenticate', async(req,res)=> {
    const {email,password} = req.body;
    const user = await User.findOne({email}).select('+password');

    if(!user)
        return res.status(400).send({error:'User not found'});
    if(!await bcrypt.compare(password, user.password))
        return res.status(400).send({error:'Invalid password'});
        console.log(user);
        console.log("Auth");
    user.password = undefined;
    return res.send({
        user,
        token: generateToken({id:user.id}),
    });
});

module.exports = app => app.use('/auth',router);