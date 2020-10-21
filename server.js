const path = require('path')
const express = require('express')
const app = express()

const cors = require('cors')
app.use((req,res,next)=>{
    res.header('Acess-Control-Allow-Origin','*')
    app.use(cors)
    next()
})

///defining static folder
const static_path = path.join(__dirname,"build")
app.use(express.static(static_path) )

///apps routes
const main_app = require("./main_app/routes")
app.use("/",main_app)

//run server
app.listen( process.env.PORT || 8000,
    _=>{console.log('server is running')}
    )