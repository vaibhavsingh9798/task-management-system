const express = require('express')
const {createTask,deleteTask,getTasks,getTask,updateTask} = require('../controllers/task')
const {authentication} = require('../middleware/auth')
const router = express.Router();


router.post('/',authentication,createTask)

router.get('/',authentication,getTasks)

router.get('/:id',authentication,getTask)

router.put('/:id',authentication,updateTask)

router.delete('/:id',authentication,deleteTask)

module.exports = router;