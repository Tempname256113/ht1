
// for /videos PUT method
import {type} from "os";

export const checkFunctionPut = (reqBody: any, res: any, arrayDB: any, reqID: any, req: any) => {
    // сразу 404 и разворот если не правильный id
    // @ts-ignore
    const response = arrayDB.filter(item => item.id == req.params.id);
    if (!response.length) {
        res.status(404).end();
        return;
    } else {
        const errorObj = {
            errorsMessages: []
        }
        const correctResolutions = ["P144", "P240", "P360", "P480", "P720", "P1080", "P1440", "P2160"];
        if (reqBody.title) {
            if (typeof reqBody.title !== "string") {
                // @ts-ignore
                errorObj.errorsMessages.push({
                    message: 'str',
                    field: 'title'
                })
            } else if (typeof reqBody.title === "string") {
                if (reqBody.title.length > 40) {
                    // @ts-ignore
                    errorObj.errorsMessages.push({
                        message: 'str',
                        field: 'title'
                    })
                }
            }
        } else {
            // @ts-ignore
            errorObj.errorsMessages.push({
                message: 'str',
                field: 'title'
            })
        }
        if (reqBody.author) {
            if (typeof reqBody.author !== "string") {
                // @ts-ignore
                errorObj.errorsMessages.push({
                    message: 'str',
                    field: 'author'
                })
            } else if (typeof reqBody.author === "string") {
                if (reqBody.author.length > 20) {
                    // @ts-ignore
                    errorObj.errorsMessages.push({
                        message: 'str',
                        field: 'author'
                    })
                }
            }
        }
        const resolutions: any = [];
        const err = [];
        if (reqBody.availableResolutions) {
            if (Array.isArray(reqBody.availableResolutions)) {
                if (reqBody.availableResolutions.length) {
                    // @ts-ignore
                    reqBody.availableResolutions.forEach(item => resolutions.push(item));
                } else {
                    resolutions.push("P144");
                }
            }  else if (typeof reqBody.availableResolutions === "boolean") {
                resolutions.push("error");
            } else {
                resolutions.push("error");
            }
        } else if (reqBody.availableResolutions === null) {
            resolutions.push("error");
        } else {
            resolutions.push("P144");
        }
        for (let key of resolutions) {
            if (key !== "P144" && key !== "P240" && key !== "P360" && key !== "P480" && key !== "P720" && key !== "P1080" && key !== "P1440" && key !== "P2160") {
                err.push(key);
            }
        }
        if (reqBody.canBeDownloaded) {
            if (typeof reqBody.canBeDownloaded !== "boolean") {
                // @ts-ignore
                errorObj.errorsMessages.push({
                    message: 'str',
                    field: 'canBeDownloaded'
                })
            }
        }
        if (reqBody.minAgeRestriction) {
            if (typeof reqBody.minAgeRestriction !== "number") {
                // @ts-ignore
                errorObj.errorsMessages.push({
                    message: 'str',
                    field: 'minAgeRestriction'
                })
            } else if (typeof reqBody.minAgeRestriction === "number") {
                if (reqBody.minAgeRestriction > 18 || reqBody.minAgeRestriction < 1) {
                    // @ts-ignore
                    errorObj.errorsMessages.push({
                        message: 'str',
                        field: 'minAgeRestriction'
                    })
                }
            }
        }
        if (reqBody.publicationDate) {
            if (typeof reqBody.publicationDate !== "string") {
                // @ts-ignore
                errorObj.errorsMessages.push({
                    message: 'str',
                    field: 'publicationDate'
                })
            }
        }
        if (err.length) {
            // @ts-ignore
            errorObj.errorsMessages.push({
                message: 'str',
                field: 'availableResolutions'
            })
        }
        if (errorObj.errorsMessages.length) {
            res.status(400).send(errorObj);
            return;
        } else {
            // let num: any = 0;
            // arrayDB.forEach((item: any, index: any) => {
            //     if (item.id === reqID) {
            //         num = index;
            //         console.log(num);
            //     }
            // })
            // const newObj = {
            //     ...arrayDB[num]
            // }
            // arrayDB.splice(num, 1);
            // arrayDB.push({
            //     id: newObj.id,
            //     title: reqBody.title,
            //     author: reqBody.author,
            //     canBeDownloaded: reqBody.canBeDownloaded || newObj.canBeDownloaded,
            //     minAgeRestriction: reqBody.minAgeRestriction || newObj.minAgeRestriction,
            //     createdAt: newObj.createdAt,
            //     publicationDate: reqBody.publicationDate || newObj.publicationDate,
            //     availableResolutions: reqBody.availableResolutions || newObj.availableResolutions
            // })

            // reqID = запрошенный id с клиента

            // arrForUpgrage это массив в котором лежит одно значение. объект который нужно изменить клиенту
            const arrForUpgrade = arrayDB.filter((item: any) => item.id == reqID);
            const resu2 = arrayDB.filter((item: any) => item.id != reqID);

            const obj = {...arrForUpgrade[0]}

            arrayDB.splice(0);

            arrayDB.push({
                id: obj.id,
                title: reqBody.title,
                author: reqBody.author,
                canBeDownloaded: reqBody.canBeDownloaded || obj.canBeDownloaded,
                minAgeRestriction: reqBody.minAgeRestriction || obj.minAgeRestriction,
                createdAt: obj.createdAt,
                publicationDate: reqBody.publicationDate || obj.publicationDate,
                availableResolutions: reqBody.availableResolutions || obj.availableResolutions
            })

            arrayDB.push(...resu2);
            res.status(204).end();
        }
    }
}