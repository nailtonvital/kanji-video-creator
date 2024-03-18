import { createAudioFile } from "simple-tts-mp3";

async function createAudio(text) {
    try {
        const filePath = `./generated/temp/${text}`;
        await createAudioFile(text, filePath, "ja").then(() => {
            console.log(`Arquivo de audio do kanji ${text} criado com sucesso`);
        })
        return filePath;
    } catch (error) {
        console.error('Erro ao criar o arquivo de audio:', error);
        return null;
    }
}

export { createAudio }
