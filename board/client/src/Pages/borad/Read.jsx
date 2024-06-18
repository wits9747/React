import React from 'react'
import ReadContainer from '../../containers/ReadContainer'
import { useParams } from 'react-router-dom'

const Read = () => {
    const {no} = useParams();
  return (
    <>
    {/* Header */}
    <ReadContainer no={no}/>
    {/* Fotter */}
    </>
  )
}

export default Read