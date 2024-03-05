var express = require("express")
var app = express()
var http = require("http").createServer(app)
var io = require("socket.io")(http)

io.on("connection", socket => {
    console.log("OK");
    socket.on("disconnect", () => {
        console.log("x disconnect");
    });

    socket.on("video", data => {
        console.log(data.url);
    })
})

app.use(express.static("public"))

app.set("view engine", "ejs")

app.get("/", (req, res) => {
    res.render("index")
})

http.listen(3000, (req, res) => {
    console.log("Server is running on port 3000")
})