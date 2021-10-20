const express = require('express');
const authMiddleware = require('../middlewares/auth')
const router = express.Router();

const Costumer = require('../models/costumer');
const Task = require('../models/products');

router.use(authMiddleware);

router.get('/', async (req,res)=>{
    try{
        const costumer = await Costumer.find().populate('name');
        console.log("done");
        return res.send({costumer});
    } catch(err){
        console.log("errinho");
        return res.status(400).send({error:'Error loading project'});
    };
});
router.get('/:projectId', async (req,res)=>{
        const costumer = await Costumer.find({userId : req.params.projectId});
        console.log(costumer);
        if(!costumer) return res.status(400).send({error:'Error loading costumer'});
        return res.send({costumer});
        
});

router.post('/', async (req,res)=>{
    try{
        const costumer = await Costumer.create({...req.body, name: req.body.name , email: req.body.email, userId: req.body.userId});
        console.log(req.body);
        return res.send({costumer});
    } catch(err){
        return res.status(400).send({error:'Error creating project'});
    };

});

router.put('/addProd', async (req,res)=>{
    try{
        const task = await Costumer.findByIdAndUpdate(req.body._id,
        {$push: {prod: {description: req.body.description, quantity: req.body.quantity}}},
        {"upsert": true, "new": true});
        console.log(task);
        return res.send({task});
    } catch(err){
        return res.status(400).send({error:'Error adding task'});
    };

});

router.put('/:projectId', async (req,res)=>{
    res.send({user: req.userId});

});

router.delete('/delCustomer', async (req,res)=>{
    try{
        const task = await Costumer.deleteOne({_id: req.body._id})
        return res.send({task});
        } catch(err){
            return res.status(400).send({error:'Error adding task'});
        };
    });

router.delete('/delProduct', async (req,res)=>{
    try{
        const task = await Costumer.findByIdAndUpdate(req.body.userId,
            {$pull: {prod: {_id: req.body._id}}},
            {"upsert": true, "new": true});
            return res.send({task});
        } catch(err){
            return res.status(400).send({error:'Error adding task'});
        };
    });
    

module.exports = app => app.use('/costumer',router);