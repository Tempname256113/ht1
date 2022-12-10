import {Request, Response, Router} from "express";
import {arrayDB} from "./videosRouter";

export const testingRouter = Router();

testingRouter.delete('/all-data', (req: Request<{},{},{},{}>, res: Response<{}>): void => {
    arrayDB.splice(0);
    res.status(204).end();
});