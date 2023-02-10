module.exports = (http)=>{
    const soketIO = require("socket.io")(http, {
        cors:{
            origin: "http://localhost:5173"
        }
    })

    soketIO.on("connection", (socket)=>{
        // console.log(">>>>>>>", socket, ">>>>>>>>>")

        socket.on("newInput", (data)=>{
            console.log(data, "ikuzoooooooooooooo")
        })


    })
    

}
