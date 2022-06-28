// 描述电影列表的状态类型

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISearchCondtion, SwitchType } from "../../services/CommonTypes";
import { IMovie } from "../../services/MovieService";
import { SaveMoviePayload } from "../commonTypes";
import { MovieService } from "../../services/MovieService";

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
    isLoading: boolean,
    /**
     * 总页数
     */
    totalPage: number
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
    isLoading: false,
    totalPage: 0
} as IMovieState

type ChangeswitchType = {
    type: SwitchType, newVal: boolean, id: string
}

/**
 * 根据条件从服务器获取电影数据
 */
export const fetchMovies = createAsyncThunk<
    void,
    ISearchCondtion,
    {
        state: {movie: IMovieState} // 这里必须设置为仓库的状态的类型{xx:xx}，设置为IMovieState时，外面dispatch会报错
    }
>(
    "movie/fetchMovies",
    async (condition, thunkAPI) => {
        // 1. 设置加载状态
        thunkAPI.dispatch(setLoading(true));
        // 2. 设置查询条件
        thunkAPI.dispatch(setCondition(condition))
        // 3. 获取电影
        const curCondition = thunkAPI.getState().movie.condition;
        const resp = await MovieService.getMovies(curCondition);
        // 4. 更改仓库中的数据
        thunkAPI.dispatch(saveMovie({movies: resp.data, total: resp.total}))
        // 5. 关闭加载状态
        thunkAPI.dispatch(setLoading(false));
    }
)

/**
 * 根据id从服务器获取电影数据
 */
//  export const fetchMovieById = createAsyncThunk(
//     "movie/fetchMovieById",
//     async (id: string, thunkAPI) => {
//         // 1. 设置加载状态
//         thunkAPI.dispatch(setLoading(true));

//         // 2. 获取电影
//         const response = await MovieService.getMovieById(id);
//         return response
//     }
// )

/**
 * 根据id删除电影
 */
export const deleteMovieById = createAsyncThunk(
    "movie/deleteMovie",
    async (id: string, thunkAPI) => {
        thunkAPI.dispatch(setLoading(true));
        await MovieService.delete(id);
        thunkAPI.dispatch(deleteMovie(id)); // 删除本地仓库中的数据
        thunkAPI.dispatch(setLoading(false));
    }
)
/**
 * 改变电影中的isHot，isComing，isClassic的某个数据
 */
export const changeMovieSwitch = createAsyncThunk<
    void,
    ChangeswitchType
>(
    "movie/changeSwitch",
    async(info, thunkAPI) => {
        thunkAPI.dispatch(changeSwitch(info));
        await MovieService.edit(info.id, {
            [info.type]: info.newVal
        });
    }
)

const movieSlice = createSlice({
    name: 'movie',
    initialState,
    reducers: {
        saveMovie: function (state, action: PayloadAction<SaveMoviePayload>) {
            const { movies, total } = action.payload
            state.data = movies;
            state.total = total;
            state.totalPage = Math.ceil(total / state.condition.limit)
        },
        setCondition: function (state, action: PayloadAction<ISearchCondtion>) {
            state.condition = { ...state.condition, ...action.payload };
            state.totalPage = Math.ceil(state.total / state.condition.limit);
        },
        setLoading: function (state, action: PayloadAction<boolean>) {
            state.isLoading = action.payload;
        },
        deleteMovie: function (state, action: PayloadAction<string>) {
            const len = state.data.length;
            state.data = state.data.filter(m => m._id !== action.payload);
            if(len !== state.data.length) {
                state.total -= 1;
            }
            state.totalPage = Math.ceil(state.total / state.condition.limit)
        },
        changeSwitch: function(state, action: PayloadAction<ChangeswitchType>) {
            // 根据id找到电影
            const movie = state.data.find(d => d._id === action.payload.id)
            // 如果找到对应的电影，就进行修改
            if(movie) {
                movie[action.payload.type] = action.payload.newVal
            }
        }
    },
    // extraReducers: (builder) => {
    //     // fetchMovies完成后调用
    //     builder.addCase(fetchMovies.fulfilled, (state, {payload}) => {
    //        console.log('fulfilled')
    //     })
    //     builder.addCase(fetchMovieById.fulfilled, (state, {payload}) => {
            
    //     })
    //   },

})

// 默认导出reducer
export default movieSlice.reducer;

// 导出actions
export const { saveMovie, setCondition, setLoading, deleteMovie, changeSwitch } = movieSlice.actions
