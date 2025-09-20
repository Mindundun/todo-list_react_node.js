import { useEffect, useState } from "react"; 
import { useNavigate } from "react-router-dom"; 
import { fetchTodos } from "../api/todoApi"; 

function TodoList() { 
    const [todos, setTodos] = useState([]); 
    const [error, setError] = useState(null); 
    const [loading, setLoading] = useState(false); 
    
    const navigate = useNavigate(); 
    
    useEffect(() => { 
        setLoading(true);

        fetchTodos() 
            .then((data) => {
                console.log('data :', data);
                setTodos(data);
            }) 
            .catch((err) => {
                console.error('f22etchTodoserror :', err);
                setError("할일 목록을 불러오는 데 실패했습니다.");
            })
            .finally(() => {
                setLoading(false);
            });
    }, []); 
    
    if (loading) {
        return <h2>Loading...</h2>;
    }

    if (error) {
        return <h2 style={{ color: "red" }}>{error}</h2>;
    }
    
    return (
        <>
            <h1 style={{ textAlign: "center" }}>할일 목록 조회</h1> 
            <table border="1" cellPadding="8" cellSpacing="0" style={{ width: '100%', borderCollapse: 'collapse' }}> 
                <thead style={{ backgroundColor: "lightpink", color: "black" }}> 
                    <tr> 
                        <th>번호</th> 
                        <th>내용</th> 
                        <th>완료여부</th> 
                    </tr> 
                </thead> 
                <tbody> 
                    {todos.map((todo, index, array) => (
                        <tr key={todo.id} style={{ backgroundColor: "lightblue", color: "black" }}> 
                            <td>{array.length - index}</td> 
                            <td
                                style={{ cursor: 'pointer', color: 'gray', textDecoration: 'underline' }}
                                onClick={() => navigate(`/view/${todo.id}`)}
                            >
                                {todo.contents}
                            </td> 
                            <td>{todo.completed ? "완료" : "미완료"}</td>
                        </tr> 
                    ))} 
                </tbody> 
            </table> 
        </>
    ); 
} 

export default TodoList;