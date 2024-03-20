const Task = require('../models/task')

exports.createTask = async (req,res) =>{
    const {title,description,dueDate} = req.body;
    try{

        let task = await Task.create({title,description,dueDate})
        res.status(200),json({message:'created',response:task})
    }catch(err){
        res.status(500),json({message:'Internal server error'})
    }
}

exports.getTasks = async (req,res) =>{
    try{
        let tasks = await Task.find();
        res.status(200),json({message:'fetched all task',response:tasks})
    }catch(err){
        res.status(500),json({message:'Internal server error'})
    }
}

exports.getTask = async (req,res) =>{
    let {id} = req.params;
    try{
        let task = await Task.findById({_id:id}) 
        res.status(200),json({message:'fetched all task',response:task})
    }catch(err){
        res.status(500),json({message:'Internal server error'})
    }
}

exports.deleteTask = async (req,res) =>{
    let {id} = req.params;
    try{
        let task = await Task.findByIdAndDelete({_id:id})
        res.status(200),json({message:'deleted'})
    }catch(err){
        res.status(500),json({message:'Internal server error'})
    }
}

exports.updateTask = async (req,res) =>{
    let {title,description,dueDate} = req.body
    let {id} = req.params;
    try{
        let task = await Task.findByIdAndUpdate({_id:id},{title,description,dueDate})
        res.status(200),json({message:'deleted'})
    }catch(err){
        res.status(500),json({message:'Internal server error'})
    }
}