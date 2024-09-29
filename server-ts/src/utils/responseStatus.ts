import { Response } from "express";
import { Readable } from "stream";

interface ResponseData {
    [key: string]: any;
}

const responseStatus = {
    ok: (res: Response, data: ResponseData = {}) => res.status(200).json({ success: true, ...data }),

    created: (res: Response, data: ResponseData = {}) => res.status(201).json({ success: true, ...data }),

    badRequest: (res: Response, message: string = "Bad Request") => res.status(400).json({ success: false, message }),

    unauthorized: (res: Response, message: string = "Unauthorized") => res.status(401).json({ success: false, message }),

    forbidden: (res: Response, message: string = "Forbidden") => res.status(403).json({ success: false, message }),

    notFound: (res: Response, message: string = "Not Found") => res.status(404).json({ success: false, message }),

    serverError: (res: Response, message: string = "Internal Server Error") => res.status(500).json({ success: false, message }),

    message: (res: Response, statusCode: number, message: string) => res.status(statusCode).json({ message }),
    
    stream: (res: Response, stream: Readable, contentType: string = "application/octet-stream") => {
        res.setHeader("Content-Type", contentType);
        stream.pipe(res);
    },
};

export default responseStatus;
