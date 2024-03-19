const express = require('express')
require('dotenv').config()
const connectToDB = require('./config/db')
const PORT = process.env.PORT || 8000

const app = express();


app.use(express.json())
app.use(express.urlencoded({extended:true}))

connectToDB();
app.listen(PORT,()=>{
    console.log(`Server started on ${PORT}`)
})