import { Link, Route, Routes } from 'react-router-dom'
import './App.css'
import TodoList from './components/TodoList'

function App() {

  return (
    <>
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', justifyContent: 'center' }}>
        <Link to="/list" style={{ textDecoration: 'none', color: '#fff', background: '#6e9fd3ff', padding: '8px 16px', borderRadius: '4px' }}>
          할일 목록조회
        </Link>
      </div>
      <Routes>
        <Route path="/list" element ={<TodoList/>}/>
      </Routes>
    </>
  )
}

export default App
