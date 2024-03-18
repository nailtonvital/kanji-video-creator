import express from "express";
import bodyParser from "body-parser";
import * as videoHandler from "./controller/videoController.js";
import * as imageHandler from "./controller/imageController.js";
import * as audioHandler from "./controller/audioController.js";
import http from "http";
import chokidar from 'chokidar';
import { existsSync, unlinkSync } from "fs";
const app = express();

const server = http.createServer(app);

app.use(bodyParser.urlencoded({ limit: "1gb", extended: true, parameterLimit: 1000000 }))


app.use(express.static("public"))

app.set("view engine", "ejs")

const kanjiData = {
    kanji: "夢",
    reading: "む/ゆめ",
    meaning: "Dream",
    jlpt: "N3",
}

app.get("/", (req, res) => {
    res.render("index", { kanjiData })
})

app

app.get("/template", (req, res) => {
    res.render("template", { kanjiData })
})

app.post('/raw/:cmd', express.raw({ type: "*/*", limit: "10gb" }), async (req, res) => {

    videoHandler.downloadToAssets(req.body, kanjiData.kanji)
})

app.get("/image", (req, res) => {
    imageHandler.getScreenshot(req, kanjiData.kanji)
})

app.get("/audio", (req, res) => {
    audioHandler.createAudio(kanjiData.kanji)
})

server.listen(3000, () => {
    console.log("Server is running on port 3000")
})

const path = './generated/temp';

const watcher = chokidar.watch(path, {
    ignored: /^\./,
    persistent: true
});

watcher
    .on('add', async function (path) {
        console.log('File', path, 'has been added');
        if (path.includes(".mp4") || path.includes(".png") || path.includes(".mp3")) {
            if (existsSync(`./generated/${kanjiData.kanji}.mp4`)) unlinkSync(`./generated/${kanjiData.kanji}.mp4`);


            if (existsSync(`./generated/temp/${kanjiData.kanji}.mp4`) && existsSync(`./generated/temp/${kanjiData.kanji}.png`) && existsSync(`./generated/temp/${kanjiData.kanji}.mp3`)) {
                videoHandler.mergeImageVideo(kanjiData.kanji)
            }
        }
    })
    .on('change', function (path) {
        console.log('File', path, 'has been changed');
        // if (path.includes(".mp4") || path.includes(".png")) {
        //     if (existsSync(`./generated/temp/${kanjiData.kanji}.mp4`) && existsSync(`./generated/temp/${kanjiData.kanji}.png`)) {
        //         console.log("Arquivos existem");
        //         videoHandler.mergeImageVideo(kanjiData.kanji)
        //     }
        // }
    })
    .on('unlink', function (path) { console.log('File', path, 'has been removed'); })
    .on('error', function (error) { console.error('Error happened', error); })