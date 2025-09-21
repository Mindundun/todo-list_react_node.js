import dotenv from 'dotenv';
dotenv.config();

import express, { json } from 'express'
import mysql from 'mysql2'
import cors from 'cors'

// 웹 서버 설정, 라우팅 설정, 미들웨어 등록 가능
const app = express();

app.use(cors());

app.use(express.json());

const PORT = 5050;

// 웹 서버 실행
app.listen (PORT, () => {
    console.log(`Web server running ar http://localhost:${PORT}`);
});

// DB 접속 정보
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME    
});

// DB 연결 테스트
db.connect((err) => {
    console.log("err : ", err);
    if (!err) {
        console.log("DB 연결 완료");
    } else {
        console.log("DB 연결 실패");        
    }
});

// 라우팅 설정
app.get('/', (req, res) => { // 핸들러 메소드, get은 http method
    console.log('call get /');
    
    res.send('<h1>Welcome!</h1>');
});

app.get('/ping', (req, res) => {
  console.log('Ping received!');
  res.send('pong');
});


// 할일 목록 조회
app.get('/api/todos', (req, res) => {
    console.log('call get /api/todos');
   
    const sql = `SELECT id, contents, completed
                   FROM todos 
                  ORDER BY id DESC`;
            
    db.query(sql, (err, data) => {
        if(!err) { // null
            res.status(200).json(data); // res.status(200).json(data); -> Array 객체
        } else {
            console.log('error :', err);
            res.status(100).json({error : 'DB query error'});
        }
    })
});

// 할일 등록
app.post('/api/todos', (req, res) => {
    const contents = req.body.contents;
    const completed = req.body.completed;

    console.log("sql",completed);
    
    const sql = `INSERT INTO todos(contents, completed) values (?, ?)`
    
    
    
    db.query(sql, [contents, completed],(err, data) => {
        if(!err) { // null
            res.status(201).json(data); 
        } else {
            console.log('error :', err);
            res.status(100).json({error : 'DB query error'});
        }
    })
});