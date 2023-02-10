const express = require("express")
const app = express()
const http = require("http").Server(app)
const path = require("path")
const cors = require("cors")

const port = 8000;

app.use(cors())

require("./src/util/soket")(http);


app.get(("/"), (req, res, next)=>{
    res.send("<h1>iwatani<h1>")
})

http.listen(port, ()=>console.log("server is connected "+port))