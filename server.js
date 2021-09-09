import express from 'express';

const app = express();
let port = process.env.port || 3000;

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile('/home/ryujimin/develop/LunchMap/public/index.html');
});

const server = app.listen(port, () => {
    console.log(`server on ${port}`);
});
