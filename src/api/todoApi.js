import axios from "axios";

const API_SERVER_HOST = 'http://localhost:5050';
const prefix = `${API_SERVER_HOST}/api`;

// 할일 목록 조회 요청 ( 비동기 )
export const fetchTodos = async() => {    // async는 Promise 객체 반환
    const res = await axios.get(`${prefix}/todos`);
    console.log("fetchTodos res data : ", res.data);   // axios가 Array 객체로 만듬
    
    return res.data;
};

// 할일 등록 요청
export const postTodo = async(todo) => {    // async는 Promise 객체 반환
    const res = await axios.post(`${prefix}/todos`,todo);
    console.log("postTodo res data : ", res.data);   
    
    return res.data;
};