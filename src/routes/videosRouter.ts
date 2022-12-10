import {Request, Response, Router} from "express";
import {validationFunc} from "../validationFunc";

type availableResolutions = Array<"P144" | "P240" | "P360" | "P480" | "P720" | "P1080" | "P1440" | "P2160" | null>;

interface IDBDataObj {
    id: number;
    title: string;
    author: string;
    canBeDownloaded: boolean;
    minAgeRestriction: null | number;
    createdAt: string;
    publicationDate: string;
    availableResolutions: availableResolutions;
}

interface IAcceptedObj {
    title: string;
    author: string;
    availableResolutions: availableResolutions;
    canBeDownloaded: boolean;
    minAgeRestriction: number | null;
    publicationDate: string;
}

interface IErrorMessage {
    message: string,
    field: string
};

interface IErrorObj {
    errorsMessages: IErrorMessage[]
};

export const videosRouter = Router();

export const arrayDB: IDBDataObj[] = [];
let id: number = 0;

videosRouter.get('/', (req: Request<{}, {}, {}, {}>, res: Response<IDBDataObj[] | string>): void => {
    res.status(200).json(arrayDB);
});

videosRouter.post('/', (req: Request<{}, {}, IAcceptedObj, {}>, res: Response<IDBDataObj | IErrorObj>): void => {
    const error: IErrorObj = validationFunc(req.body);
    if (error.errorsMessages.length) {
        res.status(400).json(error);
    } else {
        let date = new Date();
        // add a day
        date.setDate(date.getDate() + 1);
        const newObj: IDBDataObj = {
            id: id,
            title: req.body.title,
            author: req.body.author,
            canBeDownloaded: true,
            minAgeRestriction: null,
            createdAt: new Date().toISOString(),
            publicationDate: date.toISOString(),
            availableResolutions: req.body.availableResolutions || ["P144"]
        };
        res.status(201).json(newObj);
        arrayDB.push(newObj);
        id++;
    };
});

videosRouter.get('/:id', (req: Request<{id: string}>, res: Response<IDBDataObj>): void => {
    const valFromDB = arrayDB.find((elem) => elem.id === Number(req.params.id));
    if (valFromDB) {
        res.status(200).json(valFromDB);
    } else {
        res.status(404).end();
    }
});

videosRouter.put('/:id', (req: Request<{id: string}, {}, IAcceptedObj, {}>, res: Response<IErrorObj>): void => {
    const valFromDB = arrayDB.find((elem) => elem.id === Number(req.params.id));
    const error: IErrorObj = validationFunc(req.body);
    if (!valFromDB) {
        res.status(404).end();
        return;
    }
    if (error.errorsMessages.length) {
        res.status(400).json(error);
        return;
    }
    const otherValues: IDBDataObj[] = arrayDB.filter((item) => item.id !== Number(req.params.id));
    const myValueArr: IDBDataObj[] = arrayDB.filter((item) => item.id === Number(req.params.id));
    const [myValueObj] = myValueArr;
    arrayDB.splice(0);
    let downloadStatus: boolean;
    // проверяет есть ли свойство 'canBeDownloaded' в теле запроса
    if ('canBeDownloaded' in req.body) {
        downloadStatus = req.body.canBeDownloaded;
    } else {
        downloadStatus = myValueObj.canBeDownloaded;
    }
    arrayDB.push({
        id: myValueObj.id,
        title: req.body.title,
        author: req.body.author,
        canBeDownloaded: downloadStatus,
        minAgeRestriction: req.body.minAgeRestriction || myValueObj.minAgeRestriction,
        createdAt: myValueObj.createdAt,
        publicationDate: req.body.publicationDate || myValueObj.publicationDate,
        availableResolutions: req.body.availableResolutions || myValueObj.availableResolutions
    })
    arrayDB.push(...otherValues);
    res.status(204).end();
});

videosRouter.delete('/:id', (req: Request<{id: string}>, res: Response<{}>): void => {
    const valFromDB = arrayDB.find((elem) => elem.id === Number(req.params.id));
    const arrWithoutDeletedElem = arrayDB.filter((elem) => elem.id !== Number(req.params.id));
    if (!valFromDB) {
        res.status(404).end();
    } else {
        arrayDB.splice(0);
        arrayDB.push(...arrWithoutDeletedElem);
        res.status(204).end();
    }
});