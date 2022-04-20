import { Server } from "./server.interface";

export interface CustomResponse {
    timeStamp: Date;
    statusCode: number;
    status: string;
    reason: string;
    message: string;
    data: { servers: Server[], server: Server}
}