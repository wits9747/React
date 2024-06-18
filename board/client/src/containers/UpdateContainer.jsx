import React, { useEffect, useState } from 'react'
import UpdateForm from '../components/board/UpdateForm'
import * as boards from '../apis/boards'
import { useNavigate } from 'react-router-dom';

const UpdateContainer = ({no}) => {
// state
const [board, setBoard] = useState([]);
// 이벤트 함수
const getBoard = async () => {
  const response = await boards.select(no)
  const data = await response.data  // board 객체
  console.log(data)
  setBoard(data)
}

const anvigate = useNavigate();
const onUpdate = async (no, title, writer, content) => {
  try {
    const response =await boards.update(no, title, writer, content)
    const status = await response.status
    console.log(`게시글 수정 요청 결과 : ${status}`)
    alert("게시글 수정 완료")

    anvigate("/boards")
  } catch (error) {
    console.log(error)
  }
}

const onDelete = async (no) => {
  try {
    const response = await boards.remove(no);
    const status = await response.status;


    anvigate("/boards")
  } catch (error) {
    
  }
}


// ? hook
useEffect( () => {
  getBoard()
},[])


  return (
    <UpdateForm no={no} board={board} onUpdate={onUpdate} onDelete={onDelete} />
  )
}

export default UpdateContainer