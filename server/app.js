const express = require('express')
require('dotenv').config()
const connectToDB = require('./config/db')
const userRoute = require('./routes/user')
const taskRoute = require('./routes/task')

const PORT = process.env.PORT || 8000

const app = express();


app.use(express.json())
app.use(express.urlencoded({extended:true}))
connectToDB();

app.use('/api/user',userRoute) // api/user/signup
app.use('/api/task',taskRoute)



app.listen(PORT,()=>{
    console.log(`Server started on ${PORT}`)
})