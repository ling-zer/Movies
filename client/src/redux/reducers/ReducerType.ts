import { IMovieState } from "./MovieReducer";

export type MovieReduer<A> = (prevState: IMovieState, action: A) => IMovieState;
