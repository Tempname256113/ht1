
import express from 'express';
import {Request, Response} from "express";
import {checkFunctionPost} from "./checkFunctions/checkFunctionPost";
import {checkFunctionPut} from "./checkFunctions/checkFunctionPut";


export const app = express();
const host = 'localhost';
const port = 3000 || process.env.PORT;
let id = 100;

// body parse
app.use(express.json());

const arrayDB: any = [];

app.delete('/testing/all-data', (req, res) => {
    arrayDB.splice(0);
    res.status(204).end();
});

app.get('/videos', (req, res) => {
    res.status(200).send(arrayDB);
});

app.post('/videos', (req, res) => {
    checkFunctionPost(req.body, res, arrayDB, id);
    id++;
});

app.get('/videos/:id', (req, res) => {
    // @ts-ignore
    const response = arrayDB.filter(item => item.id == req.params.id);
    if (!response.length) {
        res.status(404).end();
        return;
    } else {
        const [respObj] = response;
        res.status(200).json(respObj);
    }
});

app.put('/videos/:id', (req, res) => {
    checkFunctionPut(req.body, res, arrayDB, req.params.id, req);
});

app.delete('/videos/:id', (req, res) => {
    // @ts-ignore
    const response = arrayDB.filter(item => item.id == req.params.id);
    if (!response.length) {
        res.status(404).end();
        return;
    } else {
        const otherElems = arrayDB.filter((item: any) => item.id != req.params.id);
        arrayDB.splice(0);
        arrayDB.push(...otherElems);
        res.status(204).end();
    }
});

app.listen(port, host, () => {
    console.log(`server started on ${host}:${port}`);
});