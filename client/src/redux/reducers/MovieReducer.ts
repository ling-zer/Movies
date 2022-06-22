// 描述电影列表的状态类型

import { ISearchCondtion } from "../../services/CommonTypes";
import { IMovie } from "../../services/MovieService";
import { DeleteAction, MoiveActions, SaveMoviesAction, SetConditionAction, SetLoadingAction } from "../actions/MovieAction";
import { MovieReduer } from "./ReducerType";

export type IMovieCondition = Required<ISearchCondtion>

/**
 * 电影状态
 */
export interface IMovieState {
    /**
     * 电影数组
     */
    data: IMovie[],
    /**
     * 查询条件
     */
    condition: IMovieCondition,
    /**
     * 总记录数
     */
    total: number
    /**
     * 是否正在加载数据
     */
    isLoading: boolean
}

/**
 * 默认状态
 */
const defaultState: IMovieState = {
    data: [],
    condition: {
        page: 1,
        limit: 10,
        key: ""
    },
    total: 0,
    isLoading: false
}

const savaMovie: MovieReduer<SaveMoviesAction> = function(state, action) {
    const {movies, total} = action.payload
    return {
        ...state,
        data: movies,
        total
    }
}

const setCondition: MovieReduer<SetConditionAction>  = function(state, action) {
    return {
        ...state,
        condition: {
            ...state.condition,
            ...action.payload
        }
    }
}

const setLoading: MovieReduer<SetLoadingAction> = function(state, action) {
    return {
        ...state,
        isLoading: action.payload
    }
}

const deleteMovie: MovieReduer<DeleteAction> = function(state, action) {
    return {
        ...state,
        data: state.data.filter(m => m._id !== action.payload),
        total: state.total - 1
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function(state: IMovieState = defaultState, action: MoiveActions) {
    switch(action.type) {
        case "movie_save":
            savaMovie(state, action);
            break;
        case "movie_setLoading":
            setLoading(state, action);
            break;
        case "movie_set_condition": 
            setCondition(state, action);
            break;
        case "movie_delete":
            deleteMovie(state, action);
            break;
        default:
            break;
    }
    
}