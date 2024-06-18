import React from 'react'
import UpdateContainer from '../../containers/UpdateContainer'
import { useParams } from 'react-router-dom';

const Update = () => {
    const {no} = useParams();
  return (
    <>
        {/* Header */}
        <UpdateContainer no={no}/>
        {/* Fotter */}
    </>
  )
}

export default Update