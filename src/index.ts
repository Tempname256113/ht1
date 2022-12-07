
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

const arrayDB: any = [
    {
        id: 100,
        "title": "test title",
        "author": "i am",
        "canBeDownloaded": false,
        "minAgeRestriction": null,
        "createdAt": "2022-12-07T21:56:49.942Z",
        "publicationDate": "2022-12-08T21:56:49.942Z",
        "availableResolutions": [
            "P144"
        ]
    },
    {
        id: 101,
        "title": "test title",
        "author": "i am",
        "canBeDownloaded": false,
        "minAgeRestriction": null,
        "createdAt": "2022-12-07T21:56:50.580Z",
        "publicationDate": "2022-12-08T21:56:50.580Z",
        "availableResolutions": [
            "P144"
        ]
    },
    {
        id: 102,
        "title": "test title",
        "author": "i am",
        "canBeDownloaded": false,
        "minAgeRestriction": null,
        "createdAt": "2022-12-07T21:56:51.112Z",
        "publicationDate": "2022-12-08T21:56:51.112Z",
        "availableResolutions": [
            "P144"
        ]
    },
    {
        id: 103,
        "title": "test title",
        "author": "i am",
        "canBeDownloaded": false,
        "minAgeRestriction": null,
        "createdAt": "2022-12-07T21:56:51.604Z",
        "publicationDate": "2022-12-08T21:56:51.604Z",
        "availableResolutions": [
            "P144"
        ]
    },
    {
        id: 104,
        "title": "test title",
        "author": "i am",
        "canBeDownloaded": false,
        "minAgeRestriction": null,
        "createdAt": "2022-12-07T21:56:52.209Z",
        "publicationDate": "2022-12-08T21:56:52.209Z",
        "availableResolutions": [
            "P144"
        ]
    },
    {
        id: 105,
        "title": "test title",
        "author": "i am",
        "canBeDownloaded": false,
        "minAgeRestriction": null,
        "createdAt": "2022-12-07T21:56:52.609Z",
        "publicationDate": "2022-12-08T21:56:52.609Z",
        "availableResolutions": [
            "P144"
        ]
    },
    {
        id: 106,
        "title": "test title",
        "author": "i am",
        "canBeDownloaded": false,
        "minAgeRestriction": null,
        "createdAt": "2022-12-07T21:56:53.102Z",
        "publicationDate": "2022-12-08T21:56:53.102Z",
        "availableResolutions": [
            "P144"
        ]
    },
    {
        id: 107,
        "title": "test title",
        "author": "i am",
        "canBeDownloaded": false,
        "minAgeRestriction": null,
        "createdAt": "2022-12-07T21:56:53.610Z",
        "publicationDate": "2022-12-08T21:56:53.610Z",
        "availableResolutions": [
            "P144"
        ]
    },
    {
        id: 108,
        "title": "test title",
        "author": "i am",
        "canBeDownloaded": false,
        "minAgeRestriction": null,
        "createdAt": "2022-12-07T21:56:54.153Z",
        "publicationDate": "2022-12-08T21:56:54.153Z",
        "availableResolutions": [
            "P144"
        ]
    },
    {
        id: 109,
        "title": "test title",
        "author": "i am",
        "canBeDownloaded": false,
        "minAgeRestriction": null,
        "createdAt": "2022-12-07T21:56:54.657Z",
        "publicationDate": "2022-12-08T21:56:54.657Z",
        "availableResolutions": [
            "P144"
        ]
    },
    {
        id: 110,
        "title": "test title",
        "author": "i am",
        "canBeDownloaded": false,
        "minAgeRestriction": null,
        "createdAt": "2022-12-07T21:56:55.141Z",
        "publicationDate": "2022-12-08T21:56:55.141Z",
        "availableResolutions": [
            "P144"
        ]
    },
    {
        id: 111,
        "title": "test title",
        "author": "i am",
        "canBeDownloaded": false,
        "minAgeRestriction": null,
        "createdAt": "2022-12-07T21:56:55.673Z",
        "publicationDate": "2022-12-08T21:56:55.673Z",
        "availableResolutions": [
            "P144"
        ]
    },
    {
        id: 112,
        "title": "test title",
        "author": "i am",
        "canBeDownloaded": false,
        "minAgeRestriction": null,
        "createdAt": "2022-12-07T21:56:56.183Z",
        "publicationDate": "2022-12-08T21:56:56.183Z",
        "availableResolutions": [
            "P144"
        ]
    },
    {
        id: 113,
        "title": "test title",
        "author": "i am",
        "canBeDownloaded": false,
        "minAgeRestriction": null,
        "createdAt": "2022-12-07T21:56:56.768Z",
        "publicationDate": "2022-12-08T21:56:56.768Z",
        "availableResolutions": [
            "P144"
        ]
    },
    {
        id: 114,
        "title": "test title",
        "author": "i am",
        "canBeDownloaded": false,
        "minAgeRestriction": null,
        "createdAt": "2022-12-07T21:56:57.212Z",
        "publicationDate": "2022-12-08T21:56:57.212Z",
        "availableResolutions": [
            "P144"
        ]
    },
    {
        id: 115,
        "title": "test title",
        "author": "i am",
        "canBeDownloaded": false,
        "minAgeRestriction": null,
        "createdAt": "2022-12-07T21:56:57.780Z",
        "publicationDate": "2022-12-08T21:56:57.780Z",
        "availableResolutions": [
            "P144"
        ]
    },
    {
        id: 116,
        "title": "test title",
        "author": "i am",
        "canBeDownloaded": false,
        "minAgeRestriction": null,
        "createdAt": "2022-12-07T21:56:58.252Z",
        "publicationDate": "2022-12-08T21:56:58.252Z",
        "availableResolutions": [
            "P144"
        ]
    },
    {
        id: 117,
        "title": "test title",
        "author": "i am",
        "canBeDownloaded": false,
        "minAgeRestriction": null,
        "createdAt": "2022-12-07T21:56:58.729Z",
        "publicationDate": "2022-12-08T21:56:58.729Z",
        "availableResolutions": [
            "P144"
        ]
    },
    {
        id: 118,
        "title": "test title",
        "author": "i am",
        "canBeDownloaded": false,
        "minAgeRestriction": null,
        "createdAt": "2022-12-07T21:56:59.318Z",
        "publicationDate": "2022-12-08T21:56:59.318Z",
        "availableResolutions": [
            "P144"
        ]
    },
    {
        id: 119,
        "title": "test title",
        "author": "i am",
        "canBeDownloaded": false,
        "minAgeRestriction": null,
        "createdAt": "2022-12-07T21:56:59.805Z",
        "publicationDate": "2022-12-08T21:56:59.805Z",
        "availableResolutions": [
            "P144"
        ]
    },
    {
        id: 120,
        "title": "test title",
        "author": "i am",
        "canBeDownloaded": false,
        "minAgeRestriction": null,
        "createdAt": "2022-12-07T21:57:00.345Z",
        "publicationDate": "2022-12-08T21:57:00.345Z",
        "availableResolutions": [
            "P144"
        ]
    }
];

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