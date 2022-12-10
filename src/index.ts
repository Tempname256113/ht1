
import express, {Response, Request, json} from 'express';
import {videosRouter} from "./routes/videosRouter";
import {testingRouter} from "./routes/testingRouter";

export const app = express();
const port: number = 3000 || process.env.PORT;
const host: string = 'localhost';

app.use(express.json());
app.use('/videos', videosRouter);
app.use('/testing', testingRouter);


app.listen(port, host, (): void => {
    console.log(`server started on ${host}:${port}`);
});