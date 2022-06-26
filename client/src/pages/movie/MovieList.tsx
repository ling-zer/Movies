import MovieTable, { IMovieTableEvent } from '../../components/MovieTable'
import {connect} from "react-redux"
import { AppDispatch, RootState } from '../../redux'
import { changeMovieSwitch, deleteMovieById, fetchMovies, IMovieState, setCondition } from '../../redux/features/MovieSlice';

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
    },
    async onDelete(id) {
      await dispatch(deleteMovieById(id))
    },
    onChange(newPage, newLimit) {
      dispatch(fetchMovies({
        page: newPage,
        limit: newLimit
      }))
    },
    onKeyChange(newKey) {
      dispatch(setCondition({
        key: newKey
      }))
    },
    onSearch() {
      dispatch(fetchMovies({
        page: 1
      }))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieTable);
