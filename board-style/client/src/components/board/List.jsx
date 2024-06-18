import React from 'react'
import { Link } from 'react-router-dom'
import styles from '../board/css/list.module.css'
import { formatDate } from '../../apis/format'

const List = ({ boardList, isLiading }) => {
  console.log(boardList)
  return (
    <div className='container'>
      <h1>게시글 목록</h1>
      <Link to="/boards/insert">글쓰기</Link>


      {
        isLiading &&
        <div>
          <img src="/img/loading.webp" alt="loading" width="100%" srcset="" />
        </div>
      }
      {
        !isLiading && boardList && (
          <table border={1} className={styles.table}>
            <thead>
              <tr>
                <th>번호</th>
                <th>제목</th>
                <th>작성자</th>
                <th>등록일자</th>
              </tr>
            </thead>
            <tbody>
              {boardList.map((board) => (
                <tr key={board.no}>
                  <td>{board.no}</td>
                  <td>
                    <Link to={`/boards/${board.no}`}>
                      {board.title}
                    </Link>
                  </td>
                  <td>{board.writer}</td>
                  <td>{formatDate(board.regDate)}</td>
                </tr>
              ))}
            </tbody>



          </table>
        )
      }




    </div>
  )
}

export default List