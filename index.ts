import express from 'express';
import cors from 'cors';
import formidable from "formidable";
import OpenAI from "openai";
import {API_KEY} from "./config";
import {createReadStream} from "fs";
import { unlink } from 'fs/promises';

const app = express();

app.use(cors({
    origin: '*',
}));

app.post('/stt', (req, res, next) => {
    const form = formidable({
        keepExtensions: true,
    });

    form.parse(req, async (err, fields, files) => {

        if (err) {
            next(err);
            return;
        }

        try {

            const client = new OpenAI({
                apiKey: API_KEY,
            });

            const text = await client.audio.transcriptions.create({
                model: 'whisper-1',
                response_format: 'text',
                language: 'pl',
                file: createReadStream(files.file[0].filepath),
            }) as unknown as string;

            res.send(text);

        } finally {
            await unlink(files.file[0].filepath);
        }

    });
});

app.listen(3001, '127.0.0.1', () => {
    console.log('Listening.');
});