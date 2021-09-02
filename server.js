import express from 'express';
import path from 'path';

const app = express();
let port = process.env.port || 3000;

app.get('/', (req, res) => {
    res.sendFile('/home/ryujimin/develop/LunchMap/index.html')
});

const server = app.listen(port, () => {
    console.log(`server on ${port}`);
});
