import React from 'react'
import { useParams } from 'react-router-dom'

const EditMovie: React.FC = function() {
  const { id } = useParams(); // {id: xxxxxx}
  return (
    <div>
      EditMovie: {"{id:" + id + "}"}
    </div>
  )
}

export default EditMovie
