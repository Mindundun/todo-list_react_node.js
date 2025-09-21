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
                console.error('fetchTodos error :', err);
                setError("할일 목록을 불러오는 데 실패했습니다.");
            })
            .finally(() => {
                setLoading(false);
            });
    }, []); 
    
    if (loading) {
        return <h2 style={{ textAlign: 'center' }}>📦 Loading...</h2>;
    }

    if (error) {
        return <h2 style={{ color: "red", textAlign: 'center' }}>{error}</h2>;
    }

    if (todos.length === 0) {
        return <h2 style={{ textAlign: 'center', color: '#888' }}>🙅 등록된 할일이 없습니다.</h2>;
    }

    return (
        <div style={{ maxWidth: "800px", margin: "40px auto", padding: "20px", backgroundColor: "#fdfdfd", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
            <h1 style={{ textAlign: "center", marginBottom: "30px", color: "#333" }}>📋 할일 목록</h1> 
            
            <table style={{ width: '100%', borderCollapse: 'collapse' }}> 
                <thead style={{ backgroundColor: "#f48fb1", color: "white" }}> 
                    <tr> 
                        <th style={thStyle}>번호</th> 
                        <th style={thStyle}>내용</th> 
                        <th style={thStyle}>완료여부</th> 
                    </tr> 
                </thead> 
                <tbody> 
                    {todos.map((todo, index, array) => (
                        <tr
                            key={todo.id}
                            style={{
                                backgroundColor: index % 2 === 0 ? "#e1f5fe" : "#fce4ec",
                                transition: "background 0.3s",
                                cursor: "pointer",
                                color: "#333"
                            }}
                            onClick={() => navigate(`/view/${todo.id}`)}
                        > 
                            <td style={tdStyle}>{array.length - index}</td> 
                            <td style={{ ...tdStyle, color: "#333", textDecoration: 'underline' }}>
                                {todo.contents}
                            </td> 
                            <td style={{tdStyle, color: "#333"}}>{todo.completed ? "✅ 완료" : "⏳ 미완료"}</td>
                        </tr> 
                    ))} 
                </tbody> 
            </table> 
        </div>
    ); 
} 

const thStyle = {
    padding: "12px",
    fontSize: "16px",
    borderBottom: "2px solid #ccc",
    textAlign: "center"
};

const tdStyle = {
    padding: "10px",
    fontSize: "15px",
    textAlign: "center",
    borderBottom: "1px solid #eee"
};

export default TodoList;
