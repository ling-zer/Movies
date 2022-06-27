import { FormInstance } from 'antd';
import React, { useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import MovieForm from '../../components/MovieForm';
import { MovieService } from '../../services/MovieService';


const EditMovie: React.FC = function() {
  
  const { id } = useParams(); // {id: xxxxxx}
  const formRef = useRef<FormInstance>(null);
  // 副作用函数 完成异步请求 得到电影数据
  useEffect(() => {
    const fetchMovie = async() => {
      return await MovieService.getMovieById(id!);
    }
    fetchMovie().then(resp => {
      if(resp?.data) {
        // setState不会触发Form组件的intialValues改变
        // 因此使用ref手动更改form数据
        const form = formRef.current;
        form?.setFieldsValue(resp.data);
      }
    })
  }, [id])                                        
  return (
    <MovieForm 
      ref={formRef}
      onSubmit={async(movie) => {
      const resp = await MovieService.edit(id!, movie)
      if(resp.data) {
        return ""
      } else {
        return resp.err
      }
    }}/>
  )
}

export default EditMovie
