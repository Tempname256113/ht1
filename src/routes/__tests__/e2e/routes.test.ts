
import request from "supertest";
import express from "express";
import { testingRouter } from "../../testingRouter";
import { videosRouter } from "../../videosRouter";

const app = express();

app.use(express.json());
app.use('/videos', videosRouter);
app.use('/testing', testingRouter);

interface ICreateNewVideo {
    title: any;
    author: any;
    availableResolutions: any[];
}

interface IUpdateVideo {
    title: any;
    author: any;
    availableResolutions: any[] | null;
    canBeDownloaded: any;
    minAgeRestriction: any;
    publicationDate: any
}

interface IErrorMessage {
    errorMessages: [
        {
            message: string;
            field: string;
        }
    ]
}

interface IObjFromDB {
    id: number;
    title: string;
    author: string;
    canBeDownloaded: boolean;
    minAgeRestriction: number | null;
    createdAt: string;
    publicationDate: string;
    availableResolutions: Array<'P144' | 'P240' | 'P360' | 'P480' | 'P720' | 'P1080' | 'P1440' | 'P2160'>
}

describe('clear dataBase, /videos POST method then GET, PUT and GET again', () => {

    it('clear DB should return status 204', async () => {
        await request(app)
            .delete('/testing/all-data')
            .expect(204)
    })

    it ('videos POST should return status 201 created and new video obj, PUT should return status 204 and GET should return updated video',
    async () => {
        const createVideo = await request(app)
            .post('/videos')
            .send(<ICreateNewVideo>{
                title: 'some title',
                author: 'some author',
                availableResolutions: ["P144", "P240", "P360"]
            })
            .expect(201);
        const createdVideoId = createVideo.body.id;
        const createdVideoObj: IObjFromDB = {
            id: createVideo.body.id,
            title: 'some title',
            author: 'some author',
            canBeDownloaded: true,
            minAgeRestriction: null,
            createdAt: createVideo.body.createdAt,
            publicationDate: createVideo.body.publicationDate,
            availableResolutions: ["P144", "P240", "P360"]
        }
        expect(createVideo.body).toEqual(createdVideoObj);
        
        await request(app)
            .put(`/videos/${createdVideoId}`)
            .send(<IUpdateVideo>{
                title: 'updated title',
                author: 'updated author',
                canBeDownloaded: false,
                minAgeRestriction: 14
            })
            .expect(204)
        const updatedVideo: IObjFromDB = {
            id: createdVideoId,
            title: 'updated title',
            author: 'updated author',
            canBeDownloaded: false,
            minAgeRestriction: 14,
            createdAt: createdVideoObj.createdAt,
            publicationDate: createdVideoObj.publicationDate,
            availableResolutions: createdVideoObj.availableResolutions
        }
        const showCreatedVideo = await request(app)
            .get(`/videos/${createdVideoId}`)
            .expect(200)
            expect(showCreatedVideo.body).toEqual(updatedVideo)
    })

})