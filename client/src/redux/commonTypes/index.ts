import { ISearchCondtion } from "../../services/CommonTypes"
import { IMovie } from "../../services/MovieService"

//  定义每个payload的类型

export type SaveMoviePayload = {
    movies: IMovie[],
    total: number
}

export type SetLoadingPayload = boolean

export type SetConditionPayload = ISearchCondtion

export type DeletePayload = string
