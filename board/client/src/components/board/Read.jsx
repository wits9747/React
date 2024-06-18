import React from 'react'
import { Link, useParams } from 'react-router-dom'

const Read = ({ no, board, isLiading }) => {
  return (
    <div className='container'>
      <h1 className='title'>게시글 조회</h1>
      <h3>번호 : {board.no}</h3>
      <hr />

      {
        isLiading &&
        <div>
          <img src="/img/loading.webp" alt="loading" width="100%" srcset="" />
        </div>
      }

      {
        !isLiading && board && (
          <table>
            <tbody>
              <tr>
                <td>번호</td>
                <td>
                  <input type="text" value={board.no} readOnly />
                </td>
              </tr>
              <tr>
                <td>등록일자</td>
                <td>
                  <input type="text" value={board.regDate} readOnly />
                </td>
              </tr>
              <tr>
                <td>제목</td>
                <td>
                  <input type="text" value={board.title} name="" id="" />
                </td>
              </tr>
              <tr>
                <td>작성자</td>
                <td>
                  <input type="text" value={board.writer} readOnly />
                </td>
              </tr>
              <tr>
                <td colSpan={2}>내용</td>
              </tr>
              <tr>
                <td colSpan={2}>
                  <textarea name="" id="" cols="40" rows="10" value={board.content} readOnly></textarea>
                </td>
              </tr>
            </tbody>
          </table>


        )
      }

      <hr />
      <div className="botn-box">
        <Link to="/boards" className='btn'>목록</Link>
        <Link to={`/boards/update/${board.no}`} className='btn'>수정</Link>

      </div>

    </div>
  )
}

export default Read