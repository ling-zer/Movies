
import { IMovie } from "../../services/MovieService"

//  定义payload的类型

export type SaveMoviePayload = {
    movies: IMovie[],
    total: number
}
