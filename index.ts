import express from 'express';
import cors from 'cors';

const app = express();

app.use(express.json({
    limit: '5mb',
}));
app.use(cors({
    origin: '*',
}));

app.listen(3001, '127.0.0.1', () => {
    console.log('Listening.');
});