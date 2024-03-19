const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title:{
        type:String
    },
    description:{
        type:String,
        require : true
    },
    dueDate:{
        type: Date
    },
    statue:{
        type: Boolean
    }
})

const Task = mongoose.model('Task',taskSchema)

module.exports = Task;