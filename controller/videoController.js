import fs from 'fs';
import fetch from 'node-fetch';

async function downloadToAssets(buffer, fileName) {
    try {
        const blobCode = URL.createObjectURL(new Blob([buffer], { type: 'video/mp4' })).replace('blob:nodedata:', ''); // Cria um código para o arquivo
        const filePath = `./generated/${fileName}.mp4`;

        fs.writeFileSync(filePath, buffer); // Grava o buffer diretamente no arquivo

        return filePath;
    } catch (error) {
        console.error('Erro ao salvar o arquivo:', error);
        return null;
    }

}

// async function videoHandling(){}

export { downloadToAssets };