async function fetchData(){
    const response = await fetch("http://httpbin.org/get")
    // await 를 쓰면 비동기 응답을 기다린다.
    console.log(response);
    // json 객체로 변환
    const data = await response.json()
    return data
}

fetchData()



// const result = await fetchData();

console.log("anync await 비동기 요청 처리")

