import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const InsertForm = ({onInsert}) => {

  const [ title, setTitle] = useState('');
  const [ writer, setWriter] = useState('');
  const [ content, setContent] = useState('');
  const [files, setFiles] = useState(null)

  const handleChangeTitle = (e) => {
    setTitle(e.target.value)
  }
  const handleChangeWriter = (e) => {
    setWriter(e.target.value)
  }
  const handleChangeContent = (e) => {
    setContent(e.target.value)
  }

  // 파일 핸들러 추가
  const handleChangeFile = (e) => {
    setFiles(e.target.files)
  }

  const onSubmit = () => {
    // 유효성 검사

    // 파일 업로드에서는 
    // Content-Type : application/json -> multipart/form-data
    const formData = new FormData()
    formData.append('title',title)
    formData.append('writer',writer)
    formData.append('content',content)

    if(files) {
      for(let i=0; i<files.length; i++){
        const file = files[i];
        formData.append('files',file);
      }
    }

    // 헤더
    const headers = {
      'Content-Type' : 'multipart/form-data'
    }
  
  
    // onInsert(title,writer,content)
    onInsert(formData,headers)
  }

  return (
    <div className='container'>
      <h1 className="title">게시글 등록</h1>
      <table>
        <tbody>
          <tr>
            <td>제목</td>
            <td>
              <input type="text" value={title} onChange={handleChangeTitle} />
            </td>
          </tr>

          <tr>
            <td>작성자</td>
            <td>
              <input type="text" value={writer} onChange={handleChangeWriter} />
            </td>
          </tr>
          <tr>
            <td colSpan={2}>내용</td>
          </tr>
          <tr>
            <td colSpan={2}>
              <textarea cols={40} rows={10} value={content} onChange={handleChangeContent}></textarea>
            </td>
          </tr>
          <tr>
            <td>파일</td>
            <td>
              <input type="file" onChange={handleChangeFile} multiple />
            </td>
          </tr>
        </tbody>
      </table>

      <div className="btn-box">
        <Link to="/boards" className='btn'>목록</Link>
        <button className='btn' onClick={onSubmit}>등록</button>
      </div>

    </div>
  )
}

export default InsertForm