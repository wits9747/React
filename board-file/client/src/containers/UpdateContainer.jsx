import React, { useEffect, useState } from 'react'
import UpdateForm from '../components/board/UpdateForm'
import * as boards from '../apis/boards'
import { useNavigate } from 'react-router-dom';
import * as files from '../apis/files'

const UpdateContainer = ({no}) => {
// state
const [board, setBoard] = useState([]);
const [fileList, setFileList] = useState([]);
const [isLiading, setLoading] = useState(false)

// 이벤트 함수
const getBoard = async () => {
  // ⏲ 로딩 시작
  setLoading(true)
  const response = await boards.select(no)
  const data = await response.data  // board 객체 + fileList
  
  const board = data.board
  const fileList = data.fileList
  
  console.log(data)
  setBoard(board)
  setFileList(fileList);
  setLoading(false)
  // ⏲ 로딩 끝
}

// 다운로드
const onDownload = async ( no, fileName) => {
  const response = await files.download(no)
  console.log(response);

  // 서버에서 반환한 파일 데이터를 Blob으로 변환
  // 브라우저를 통해 데이터를 a 태그로 등록하고 다운로드하도록 요청
  const url = window.URL.createObjectURL(new Blob([response.data]))
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', fileName)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
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

const onDeleteFile = async (fileNo) => {
  try{
    // 파일 삭제 요청
    const fileResponse = await files.remove(fileNo)

    // 파일 목록 갱신
    const boardResponse = await boards.select(no);
    const data = boardResponse.data
    const fileList = data.fileList
    setFileList(fileList);
  }catch(error){
    console.log(error);
  }
}

const DeleteCheckedFiles = async (fileNoList) => {
  const fileNos = fileNoList.join(",")
  console.log(fileNos);

  const respose = await files.removeFiles(fileNos);
  console.log(respose.status);

  // 파일 목록 갱신
  const boardResponse = await boards.select(no);
  const data = boardResponse.data
  const fileList = data.fileList
  setFileList(fileList);

}




// ? hook
useEffect( () => {
  getBoard()
},[])


  return (
    <UpdateForm no={no} board={board} onUpdate={onUpdate} onDelete={onDelete} fileList={fileList} onDownload={onDownload} onDeleteFile={onDeleteFile} DeleteCheckedFiles={DeleteCheckedFiles} />
  )
}

export default UpdateContainer