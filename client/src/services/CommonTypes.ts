export interface IResponseError {
    err: string,
    data: null
}

export interface IResponseData<T> {
    err: null,
    data: T
}

export interface IResponsePageData<T> {
    err: null,
    total: number,
    data: T[]
}

export interface ISearchCondtion {
    page?: number,
    limit?: number,
    key?: string
}

export enum SwitchType {
    isHot = "isHot",
    isComing = "isComing",
    isClassic = "isClassic"
}