
type availableResolutions = Array<"P144" | "P240" | "P360" | "P480" | "P720" | "P1080" | "P1440" | "P2160" | null>;

interface IAcceptedObj {
    title: string;
    author: string;
    availableResolutions: availableResolutions;
    canBeDownloaded: boolean;
    minAgeRestriction: number | null;
    publicationDate: string;
};

interface IErrorMessage {
    message: string,
    field: string
};

interface IErrorObj {
    errorsMessages: IErrorMessage[]
};

// если ты зашел сюда вспоминать как это все работает, то тут хардкод. подходит только для hometask01 на 09.12.2022
// как там дальше будет я не знаю, но ты себе придумал эту функцию чтобы не писать по два раза одно и то же в методах POST и PUT
// нужно передать сюда объект который тебе приходит из тела запроса в методе PUT и POST для валидации
// на выходе получается объект с полем 'errorsMessages': []. если массив не пустой, значит были ошибки и нужно отправить их обратно
// на клиент

// функция для проверки объекта из метода POST и GET
export const validationFunc = (obj: IAcceptedObj): IErrorObj => {

    // массив для проверки значений поля 'availableResolutions' из входящего объекта
    const checkArr: availableResolutions = ["P144", "P240", "P360", "P480", "P720", "P1080", "P1440", "P2160", null];
    // объект ошибки, в массив которого пушится другой объект с сообщением об конкретной ошибке

    const errorObj: IErrorObj = {
        errorsMessages: []
    };

    // написал просто чтобы не ошибиться при наборе строк. среда подсказывает что подставлять
    const enum fields {
        author = 'author',
        title = 'title',
        availableResolutions = 'availableResolutions',
        canBeDownloaded = 'canBeDownloaded',
        minAgeRestriction = 'minAgeRestriction',
        publicationDate = 'publicationDate'
    };

    if (typeof obj.author !== "string") {
        errorObj.errorsMessages.push({
            message: 'string',
            field: fields.author
        })
    } else if (obj.author.length > 20) {
        errorObj.errorsMessages.push({
            message: 'string',
            field: fields.author
        })
    };

    if (typeof obj.title !== "string") {
        errorObj.errorsMessages.push({
            message: 'string',
            field: fields.title
        })
    } else if (obj.title.length > 20) {
        errorObj.errorsMessages.push({
            message: 'string',
            field: fields.title
        })
    };

    if (obj.availableResolutions) {
        if (!Array.isArray(obj.availableResolutions)) {
            errorObj.errorsMessages.push({
                message: 'string',
                field: fields.availableResolutions
            })
        } else {
            for (let i = 0; i < obj.availableResolutions.length; i++) {
                if (!checkArr.includes(obj.availableResolutions[i])) {
                    errorObj.errorsMessages.push({
                        message: 'string',
                        field: fields.availableResolutions
                    });
                    break;
                }
            }
        }
    };

    if (obj.canBeDownloaded) {
        if (typeof obj.canBeDownloaded !== "boolean") {
            errorObj.errorsMessages.push({
                message: 'string',
                field: fields.canBeDownloaded
            })
        }
    };

    if (obj.minAgeRestriction) {
        if (typeof obj.minAgeRestriction !== "number") {
            errorObj.errorsMessages.push({
                message: 'string',
                field: fields.minAgeRestriction
            })
        } else if (typeof obj.minAgeRestriction === "number") {
            if (obj.minAgeRestriction < 1 || obj.minAgeRestriction > 18) {
                errorObj.errorsMessages.push({
                    message: 'string',
                    field: fields.minAgeRestriction
                })
            }
        }
    }

    if (obj.publicationDate) {
        if (typeof  obj.publicationDate !== "string") {
            errorObj.errorsMessages.push({
                message: 'string',
                field: fields.publicationDate
            })
        }
    }

    return errorObj;
}