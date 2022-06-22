import { ISearchCondtion } from "../../services/CommonTypes"
import { IMovie } from "../../services/MovieService"
import { IAction } from "./ActionTypes"

// action的创建函数

export type SaveMoviesAction = IAction<"movie_save", {
    movies: IMovie[],
    total: number
}>

function saveMoviesAction(movies: IMovie[], total: number): SaveMoviesAction {
    return {
        type: "movie_save",
        payload: {
            movies,
            total
        }
    }
}

export type SetLoadingAction = IAction<"movie_setLoading", boolean>

function setLoadingAction(isLoading: boolean): SetLoadingAction {
    return {
        type: "movie_setLoading",
        payload: isLoading
    }
}

export type SetConditionAction = IAction<"movie_set_condition", ISearchCondtion>

function setConditionAction(condition: ISearchCondtion): SetConditionAction {
    return {
        type: "movie_set_condition",
        payload: condition
    }
}

export type DeleteAction = IAction<"movie_delete", string>

function deleteAction(id: string): DeleteAction {
    return {
        type: "movie_delete",
        payload: id
    }
}

export type MoiveActions = SaveMoviesAction | SetConditionAction | SetLoadingAction | DeleteAction;

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    saveMoviesAction,
    setLoadingAction,
    setConditionAction,
    deleteAction
}