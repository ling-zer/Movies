// 描述电影列表的状态类型

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISearchCondtion } from "../../services/CommonTypes";
import { IMovie } from "../../services/MovieService";
import { DeletePayload, SaveMoviePayload, SetConditionPayload, SetLoadingPayload } from "../commonTypes";

// 仓库中的状态不能为可选值，因此利用类型演算，将ISearchCondtion中的可选变为必选
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
const initialState = {
    data: [],
    condition: {
        page: 1,
        limit: 10,
        key: ""
    },
    total: 0,
    isLoading: false
} as IMovieState

const movieSlice = createSlice({
    name: 'movie',
    initialState,
    reducers: {
        saveMovie: function (state, action: PayloadAction<SaveMoviePayload>) {
            const { movies, total } = action.payload
            state.data = movies;
            state.total = total;
        },
        setCondition: function (state, action: PayloadAction<SetConditionPayload>) {
            state.condition = {...state.condition, ...action.payload};
        },
        setLoading: function (state, action: PayloadAction<SetLoadingPayload>) {
            state.isLoading = action.payload;
        },
        deleteMovie: function (state, action: PayloadAction<DeletePayload>) {
            state.data = state.data.filter(m => m._id !== action.payload);
            state.total -= 1
        }
    }
})

// 默认导出reducer
export default movieSlice.reducer;

// 导出actions
export const {saveMovie, setCondition, setLoading, deleteMovie} = movieSlice.actions