export interface Data {
    originalURL: string,
    key: string,
    expiry: Date,
    shortURL: string,
}

export interface Error {
    code: string,
    description: string,
}

export interface URLCreatedResponse {
    message: string,
    data?: Data,
    error?: Error,
}