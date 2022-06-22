import {configureStore} from "@reduxjs/toolkit"
// import { rootReducer } from "./reducers/RootReducer"
import logger from "redux-logger"
import movie from "./features/MovieSlice"
export const store = configureStore({
    reducer: {
        movie
    },
    middleware: [logger]
})