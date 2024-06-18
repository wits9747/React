import React, { useEffect, useState } from 'react'
import Read from '../components/board/Read'
import * as boards from '../apis/boards'

const ReadContainer = ({no}) => {
  // state
  const [board, setBoard] = useState([]);
  const [isLiading, setLoading] = useState(false)

  // 이벤트 함수
  const getBoard = async () => {
    // ⏲ 로딩 시작
    setLoading(true)
    const response = await boards.select(no)
    const data = await response.data  // board 객체
    console.log(data)
    setBoard(data)
    setLoading(false)
    // ⏲ 로딩 끝
  }

  // ? hook
  useEffect( () => {
    getBoard()
  },[])


  return (
    <>
    <Read no={no} board={board} isLiading={isLiading} />
    </>
  )
}

export default ReadContainer