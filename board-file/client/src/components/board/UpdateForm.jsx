import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import * as format from '../../apis/format'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import * as filesApi from '../../apis/files.js'

const UpdateForm = ({ no, board, onUpdate, onDelete, onDownload, fileList, onDeleteFile, DeleteCheckedFiles }) => {

  const [title, setTitle] = useState('');
  const [writer, setWriter] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState(null);
  const [checkAll, setCheckAll] = useState(false)
  // 파일 선택 삭제
  const [fileNoList, setFileNoList] = useState([])

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
    // 유효성 검사

    // 파일 업로드에서는 
    // Content-Type : application/json -> multipart/form-data
    const formData = new FormData()
    formData.append('title', title)
    formData.append('writer', writer)
    formData.append('content', content)
    formData.append('no', no)

    if (files) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        formData.append('files', file);
      }
    }

    // 헤더
    const headers = {
      'Content-Type': 'multipart/form-data'
    }


    // onInsert(title,writer,content)
    onUpdate(formData, headers)
  }

  const handleDownload = (no, name) => {
    onDownload(no, name)
  }

  const handleDeleteFile = (no) => {
    const check = window.confirm("정말로 삭제하실거에요??")
    if (check) {
      onDeleteFile(no);
    }
  }

  const checkFileNo = () => {
    let checkList = document.getElementsByClassName('check-file')
    let updatedFileNoList = [];

    for (let i = 0; i < checkList.length; i++) {
      const check = checkList[i];
      if (check.checked) {
        updatedFileNoList.push(check.value);
      }
    }

    console.log(`선택된 파일 번호 : ${fileNoList}`);
    setFileNoList(updatedFileNoList);
  }

  const handelDeleteCheckedFiles = () => {
    const check = window.confirm("정말로 삭제하시겠습니까? \n" + fileNoList)
    if (check) {
      DeleteCheckedFiles(fileNoList);
    }

    setFileNoList([])  // 파일 번호 초기화
  }

  const fileCheckAll = () => {
    let checkList = document.getElementsByClassName('check-file')

    if (!checkAll) {
      for (let i = 0; i < checkList.length; i++) {
        const check = checkList[i];
        check.checked = true
      }
      setCheckAll(true)
    } else {
      for (let i = 0; i < checkList.length; i++) {
        const check = checkList[i];
        check.checked = false
      }
      setCheckAll(false)
    }

    checkFileNo();


  }

  // 파일 핸들러 추가
  const handleChangeFile = (e) => {
    setFiles(e.target.files)
  }

  function uploadPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return customUploadAdapter(loader);
    };
  }

  const customUploadAdapter = (loader) => {
    return {
      upload() {
        return new Promise((resolve, reject) => {
          const formData = new FormData();
          loader.file.then(async (file) => {
            console.log(file);
            formData.append("parentTable", 'editor');
            formData.append("file", file);

            const headers = {
              'Content-Type': 'multipart/form-data'
            }
            let response = await filesApi.upload(formData, headers);
            let data = await response.data;
            console.log(`data : ${data}`);

            let newFile = data;
            let newFileNo = newFile.no

            // 이미지 렌더링
            await resolve({
              default: `http://localhost:8080/files/img/${newFileNo}`
            })

          });
        });
      },
    };
  };


  useEffect(() => {
    if (board) {
      setTitle(board.title)
      setWriter(board.writer)
      setContent(board.content)
    }
  }, [board, fileList])
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
      <table>
        <tbody>
          <tr>
            <td>제목</td>
            <td>
              <input type="text" value={title} onChange={handleChangeTitle} name="" id="" />
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
              {/* <textarea name="" id="" cols="40" rows="10" value={content} onChange={handleChangeContent} ></textarea> */}
              <CKEditor
                editor={ClassicEditor}
                config={{
                  placeholder: "내용을 입력하세요.",
                  toolbar: {
                    items: [
                      'undo', 'redo',
                      '|', 'heading',
                      '|', 'fontfamily', 'fontsize', 'fontColor', 'fontBackgroundColor',
                      '|', 'bold', 'italic', 'strikethrough', 'subscript', 'superscript', 'code',
                      '|', 'bulletedList', 'numberedList', 'todoList', 'outdent', 'indent',
                      '|', 'link', 'uploadImage', 'blockQuote', 'codeBlock',
                      '|', 'mediaEmbed',
                    ],
                    shouldNotGroupWhenFull: false
                  },
                  editorConfig: {
                    height: 500, // Set the desired height in pixels
                  },
                  alignment: {
                    options: ['left', 'center', 'right', 'justify'],
                  },

                  extraPlugins: [uploadPlugin]            // 업로드 플러그인
                }}
                data={board.content}         // ⭐ 기존 컨텐츠 내용 입력 (HTML)
                onReady={editor => {
                  // You can store the "editor" and use when it is needed.
                  console.log('Editor is ready to use!', editor);
                }}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  console.log({ event, editor, data });
                  setContent(data);
                }}
                onBlur={(event, editor) => {
                  console.log('Blur.', editor);
                }}
                onFocus={(event, editor) => {
                  console.log('Focus.', editor);
                }}
              />
            </td>
          </tr>
          <tr>
            <td colSpan={2}>파일</td>
          </tr>
          <tr>
            <td colSpan={2}>
              <input type="file" onChange={handleChangeFile} multiple />
            </td>
          </tr>
          <tr>
            <td colSpan={2}>
              <div className="flex-box">
                <div className="item">
                  <button className="btn" onClick={fileCheckAll}>전체선택</button>
                </div>
                <div className="item">
                  <button className="btn" onClick={handelDeleteCheckedFiles}>선택삭제</button>
                </div>
              </div>
            </td>
          </tr>
          {
            fileList.map((file) => (
              <tr key={file.no}>
                <td>
                  {/* 파일 선택 체크 박스 */}
                  <input type="checkbox" onChange={checkFileNo} className='check-file' value={file.no} />
                </td>
                <td>
                  <div className="flex-box" >
                    <div className="item">
                      <img src={`/files/img/${file.no}`} alt={file.fileName} srcset="" />
                      <span>{file.originName} ({format.byteToUnit(file.fileSize)})</span>
                    </div>

                    <div className="item">
                      <button className='btn' onClick={() => handleDownload(file.no, file.originName)} >다운로드</button>
                      <button className='btn' onClick={() => handleDeleteFile(file.no)} >삭제</button>
                    </div>
                  </div>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
      <hr />
      <div className="botn-box">
        <Link to="/boards" className='btn'>목록</Link>
        <button className='btn' onClick={handleDelete}>삭제</button>
        <button className='btn' onClick={onSubmit}>수정</button>

      </div>

    </div>
  )
}

export default UpdateForm