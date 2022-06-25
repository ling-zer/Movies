import MovieTable, { IMovieTableEvent } from '../../components/MovieTable'
import {connect} from "react-redux"
import { AppDispatch, RootState } from '../../redux'
import { changeMovieSwitch, fetchMovies, IMovieState } from '../../redux/features/MovieSlice';

function mapStateToProps(state: RootState): IMovieState {
  return state.movie
}

function mapDispatchToProps(dispatch: AppDispatch): IMovieTableEvent  {
  return {
    onLoad() {
      dispatch(fetchMovies({
        page: 1,
        limit: 10,
        key: ""
      }))
    },
    onSwitchChange(type, newVal, id) {
      dispatch(changeMovieSwitch({
        type,
        newVal,
        id
      }))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieTable);
