import fs from 'fs';
import { exec } from "child_process";
import fetch from 'node-fetch';

async function downloadToAssets(buffer, fileName) {
    try {
        const blobCode = URL.createObjectURL(new Blob([buffer], { type: 'video/mp4' })).replace('blob:nodedata:', ''); // Cria um código para o arquivo
        const filePath = `./generated/temp/${fileName}.mp4`;

        fs.writeFileSync(filePath, buffer); // Grava o buffer diretamente no arquivo

        return filePath;
    } catch (error) {
        console.error('Erro ao salvar o arquivo:', error);
        return null;
    }

}


async function mergeImageVideo(kanjiName) {
    const outputPath = `./generated/${kanjiName}`;
    const inputPath = `./generated/temp/${kanjiName}`;
    const command = `ffmpeg -i ${inputPath}.png -i ${inputPath}.mp4 -filter_complex "[1:v]colorkey=0x000000:0.08[ckout];[0:v][ckout]overlay=(W-w)/2:(H-h)/3[out]" -map "[out]" ${outputPath}.mp4`;
    return new Promise((resolve, reject) => {
        console.log("Iniciando processo de mesclagem de audio e video...");
        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error('Erro ao mesclar audio e video:', error);
                reject(error);
            }
            console.log('stdout:', stdout);
            console.log('stderr:', stderr);
            console.log("Processo finalizado com sucesso!");
            removeTempFiles();
            resolve(outputPath);
        }).removeAllListeners('exit').on('exit', (code) => {
            console.log('Processo finalizado com código:', code);
        });
    });
}

async function removeTempFiles() {
    const path = './generated/temp';
    const files = fs.readdirSync(path);
    files.forEach(file => {
        fs.unlinkSync(`${path
            }/${file}`);
    }
    );
}

async function verifyFileExists(filePath) {
    return new Promise((resolve, reject) => {
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            resolve(filePath);
        } else {
            reject('Arquivo não encontrado');
        }
    });
}

// async function videoHandling(){}

export { downloadToAssets, mergeImageVideo, verifyFileExists };