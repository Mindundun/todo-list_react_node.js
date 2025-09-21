import { Link, Route, Routes } from 'react-router-dom'
import './App.css'
import TodoList from './components/TodoList'
import TodoWrite from './components/TodoWrite'

const buttonStyle = {
  textDecoration: 'none',
  color: '#fff',
  backgroundColor: '#4a90e2',
  padding: '10px 20px',
  borderRadius: '5px',
  fontWeight: '600',
  transition: 'background-color 0.25s ease',
};

const buttonHoverStyle = {
  backgroundColor: '#357ABD',
};

function App() {
  return (
    <>
      <div style={{ marginBottom: '20px', display: 'flex', gap: '12px', justifyContent: 'center' }}>
        <Link
          to="/write"
          style={buttonStyle}
          onMouseEnter={e => e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor}
          onMouseLeave={e => e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor}
        >
          할일 등록
        </Link>
        <Link
          to="/list"
          style={buttonStyle}
          onMouseEnter={e => e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor}
          onMouseLeave={e => e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor}
        >
          할일 목록조회
        </Link>
      </div>

      <Routes>
        <Route path="/write" element={<TodoWrite />} />
        <Route path="/list" element={<TodoList />} />
      </Routes>
    </>
  )
}

export default App;
