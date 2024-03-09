import express from "express";
import bodyParser from "body-parser";
import * as videoHandler from "./controller/videoController.js";
import * as imageHandler from "./controller/imageController.js";
import http from "http";
const app = express();


const server = http.createServer(app);

app.use(bodyParser.urlencoded({ limit: "2000mb", extended: true, parameterLimit: 50000 }))


app.use(express.static("public"))

app.set("view engine", "ejs")

const kanjiData = {
    kanji: "国",
    reading: "くに",
    meaning: "country"
}

app.get("/", (req, res) => {
    res.render("index", { kanjiData })
})

app.get("/template", (req, res) => {
    res.render("template", { kanjiData })
})

app.post('/raw/:cmd', express.raw({ type: "*/*" }), async (req, res) => {
    videoHandler.downloadToAssets(req.body, kanjiData.kanji)
})

app.get("/image", (req, res) => {
    imageHandler.getScreenshot(req, kanjiData.kanji)
})

server.listen(3000, () => {
    console.log("Server is running on port 3000")
})