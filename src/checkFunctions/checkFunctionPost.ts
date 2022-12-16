
// for /videos POST method

export const checkFunctionPost = (reqBody: any, res: any, arrayDB: any, uniqueID: any) => {
    const errorObj = {
        errorsMessages: []
    }
    const correctResolutions = ["P144", "P240", "P360", "P480", "P720", "P1080", "P1440", "P2160"];
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
        let date = new Date();
        // add a day
        date.setDate(date.getDate() + 1);
        const successResponse = {
            id: uniqueID,
            title: reqBody.title,
            author: reqBody.author,
            canBeDownloaded: false,
            minAgeRestriction: null,
            createdAt: new Date().toISOString(),
            publicationDate: date.toISOString(),
            availableResolutions: resolutions
        }
        arrayDB.push(successResponse);
        res.status(201).json(successResponse);
    }
}