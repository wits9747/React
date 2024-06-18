import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styles from '../board/css/update.module.css'

const UpdateForm = ({ no, board, onUpdate, onDelete }) => {

  const [title, setTitle] = useState('');
  const [writer, setWriter] = useState('');
  const [content, setContent] = useState('');

  const handleChangeTitle = (e) => {
    setTitle(e.target.value)
  }
  const handleChangeWriter = (e) => {
    setWriter(e.target.value)
  }
  const handleChangeContent = (e) => {
    setContent(e.target.value)
  }

  const onSubmit = () => {
    onUpdate(no, title, writer, content)
  }

  useEffect(() => {
    if (board) {
      setTitle(board.title)
      setWriter(board.writer)
      setContent(board.content)
    }
  }, [board])
  //  [의존하는 객체]
  // : 지정한 객체가 변화했을떄, 다시 useEffect 를 실행한다.


  const handleDelete = () => {
    const check = window.confirm("삭제 ㄱ?");
    if (check) onDelete(no);
  }

  return (
    <div className='container'>
      <h1 className='title'>게시글 수정</h1>
      <h3>번호 : {no}</h3>
      <hr />
      <table className={styles.table}>
        <tbody>
          <tr>
            <td>제목</td>
            <td>
              <input type="text" className={styles['form-input']} value={title} onChange={handleChangeTitle} name="" id="" />
            </td>
          </tr>
          <tr>
            <td>작성자</td>
            <td>
              <input type="text" className={styles['form-input']} value={writer} onChange={handleChangeWriter} />
            </td>
          </tr>
          <tr>
            <td colSpan={2}>내용</td>
          </tr>
          <tr>
            <td colSpan={2}>
              <textarea className={styles['form-input']} id="" cols="40" rows="10" value={content} onChange={handleChangeContent} ></textarea>
            </td>
          </tr>
        </tbody>
      </table>
      <hr />
      <div className="btn-box">
        <div className="item">
          <Link to="/boards" className='btn'>목록</Link>
        </div>

        <div className="item">
          <button className='btn' onClick={handleDelete}>삭제</button>
          <button className='btn' onClick={onSubmit}>수정</button>
        </div>

      </div>

    </div>
  )
}

export default UpdateForm