import React, { Component } from 'react'
import MovieForm from '../../components/MovieForm'
import { MovieService } from '../../services/MovieService'

export default class AddMovie extends Component {


  render() {
    return (
      <MovieForm onSubmit={async(movie) => {
        const resp = await MovieService.add(movie)
        if(resp.data) {
          return ""
        } else {
          return resp.err
        }
      }}/>
    )
  }
}
