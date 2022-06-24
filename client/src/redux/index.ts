import {configureStore, ThunkAction, Action} from "@reduxjs/toolkit"
import logger from "redux-logger"
import { rootReducer } from "./reducer/rootReducer"

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .prepend(
      )
      // prepend and concat calls can be chained
      .concat(logger)
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export type AppThunk = ThunkAction<
  Promise<void> | void,
  RootState,
  unknown,
  Action<string>
>;

export default store;