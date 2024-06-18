import React from 'react'
import TodoHeader from './TodoHeader'
import TodoInput from './TodoInput'
import TodoList from './TodoList'
import TodoFooter from './TodoFooter'
import { useEffect } from 'react'
import { useState } from 'react'

const TodoContainer = () => {
  // state
  const [todoList, setTodoList] = useState([])
  const [input, setInput] = useState('')


  // 데이터 가져오기
  useEffect(() => {
    getList();
  }, [])


  const getList = () => {
    fetch('http://127.0.0.1:8080/todos')
      .then((Response) => Response.json())
      .then((data) => setTodoList(data))
      .catch((Error) => console.error())
  }

  // 체크 박스 토글
  const onToggle = async (todo) => {
    console.log("체크박스 toggle!")
    console.log("체크박수 여부 : " + todo.status)

    const data = {
      no: todo.no,
      name: todo.name,
      status: todo.status ? 0 : 1,
      regDate: todo.regDate,
      updDate: todo.updDate
    }

    // 서버로 업데이트 요청
    // [PUT] - /todos
    // ♡
    // - method   :PUT
    // - headers
    //    - Content-Type : application/json
    // - body     : JSON.stringify( data ) 

    const init = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }


    const url = 'http://localhost:8080/todos'

    try {
      const response = await fetch(url, init)
      console.log(response);
    } catch (error) {
      console.log(error)
    }

    // ✅ 체크 여부 업데이트
    const updateTodoList = todoList.map((item) => {
      return item.no == todo.no ? data : item
    })

    //정렬
    updateTodoList.sort((a, b) => {
      // 1 상태 오름차순
      // 2 번호 내림차순
      return a.status - b.status == 0 ? b.no - a.no : a.status - b.status
    })

    setTodoList(updateTodoList)
  }


  //🐱 할일 삭제
  const onRemove = async (no) => {
    console.log('할일 삭제 클릭');

    const init = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const url = `http://localhost:8080/todos/${no}`;
    try {
      const response = await fetch(url, init)
      console.log(response);
    } catch (error) {
      console.log(error)
    }

    // 삭제 후 리스트 갱신
    // - 삭제한 번호만 필터링해서 없앰
    const updateTodoList = todoList.filter((todo) => todo.no !== no)
    setTodoList(updateTodoList)
  }


  //🐱 할일 cnrk
  // - [POST] /todos
  // onSubmit

  const onSubmit = async (e) => {
    // 기본 이벤트 제거(방지)
    // 여기서는 폼 제출(submint)을 방지
    e.preventDefault();

    const data = {
      name: input
    }

    const init = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }

    const url = 'http://localhost:8080/todos'

    try {
      const response = await fetch(url, init)
      const newTodo = await response.json()
      getList();
      console.log(response);

    } catch (error) {
      console.log(error)
    }

    setInput('')
    

  }


  // 🐱 할일 입력 변경 이벤트
  const onChange = (e) => {
    // e (event)  : input 이 가진 이벤트 객체
    // e.target   : input 태그
    // e.target.vale : 입력한 값
    const changedInput = e.target.value;
    // 📢 input state 갱신
    setInput(changedInput);
  }

  const onRemoveAll = async () => {
    const init = {
      method: 'DELETE'
    }
    const url = 'http://localhost:8080/todos/total'

    try {
      const response = await fetch(url, init)
      getList();
      console.log(response);

    } catch (error) {
      console.log(error)
    }
  }


  const onUpateAll = async () => {
    const init = {
      method: 'PUT'
    }
    const url = 'http://localhost:8080/todos/total'

    try {
      const response = await fetch(url, init)
      console.log(response);      
      getList(); 
    } catch (error) {
      console.log(error)
    }
  } 


  return (
    <div className='container'>
      <TodoHeader />
      <TodoInput onSubmit={onSubmit} input={input} onChange={onChange}/>
      <TodoList todoList={todoList} onToggle={onToggle} onRemove={onRemove} />
      <TodoFooter onRemoveAll={onRemoveAll} onUpateAll={onUpateAll} />
    </div>
  )
}

export default TodoContainer