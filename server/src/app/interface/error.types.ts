export interface IErrorSources {
    path: string;
    message: string;
}

export interface IGenricsErrorResponse {
    statusCode: number;
    message: string;
    errorSources?: IErrorSources[];
}