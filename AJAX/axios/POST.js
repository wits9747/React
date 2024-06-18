// axios 라이브러리로 소환시켜야한다.

const axios = require('axios');

const url = 'https://httpbin.org/post'
const data = {
    name : '김조은',
    age : 25
}

const headers = {
    'ContentType' : 'application/json'
}

// axios POST 요청
axios.post(url,data,headers)
    .then(Response => {
        console.log(`data : ${Response.data}`);
        console.dir(Response.data)
    })
    .catch(error => {
        console.log(`error : ${error}`);
    })
    