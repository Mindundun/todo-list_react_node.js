import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postTodo } from "../api/todoApi";

const initialTodo = {
  contents: "",
  completed: 0,
};

function TodoWrite() {
  const [todo, setTodo] = useState({ ...initialTodo });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // 입력 폼 변경 핸들러
  const handleChangeForm = (e) => {
    const { name, type, checked, value } = e.target;

    setTodo({
      ...todo,
      [name]: type === "checkbox" ? (checked ? 1 : 0) : value,
    });
  };

  // 제출 핸들러
  const handleSubmit = () => {
    setError(null);

    if (todo.contents.trim() === "") {
      alert("내용을 입력하세요.");
      return;
    }

    if (!window.confirm("할일을 등록하시겠습니까?")) {
      return;
    }

    setLoading(true);

    postTodo(todo)
      .then((data) => {
        console.log("postTodo data:", data);
        navigate("/list", { replace: true });
      })
      .catch((err) => {
        console.error("등록 실패:", err);
        setError("할일을 등록하는데 실패했습니다.");
      })
      .finally(() => setLoading(false));
  };

  // 리셋 핸들러
  const handleReset = () => {
    setTodo(initialTodo);
    setError(null);
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "40px auto",
        padding: "30px",
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        backgroundColor: "#fff",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "24px", color: "#333" }}>
        📌 할일 등록
      </h1>

      {error && (
        <div
          style={{
            marginBottom: "16px",
            padding: "10px",
            backgroundColor: "#ffe6e6",
            color: "#cc0000",
            borderRadius: "4px",
            textAlign: "center",
          }}
        >
          {error}
        </div>
      )}

      <div style={{ marginBottom: "20px" }}>
        <label
          htmlFor="contents"
          style={{ display: "block", marginBottom: "8px", fontWeight: "600", color: "#333"}}
        >
          내용
        </label>
        <textarea
          id="contents"
          name="contents"
          value={todo.contents}
          onChange={handleChangeForm}
          rows={5}
          placeholder="할 일을 입력하세요.."
          style={{
            width: "100%",
            padding: "12px",
            fontSize: "16px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            resize: "vertical",
            fontFamily: "inherit",
            boxSizing: "border-box", 
          }}
          disabled={loading}
        />
      </div>

      <div
        style={{
          marginBottom: "24px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <input
          type="checkbox"
          id="completed"
          name="completed"
          checked={todo.completed === 1}
          onChange={handleChangeForm}
          disabled={loading}
          style={{ width: "18px", height: "18px", cursor: "pointer"}}
        />
        <label htmlFor="completed" style={{ userSelect: "none", fontSize: "16px", color: "#333" }}>
          완료 여부
        </label>
      </div>

      <div style={{ display: "flex", justifyContent: "center", gap: "16px" }}>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading}
          style={{
            backgroundColor: "#f48fb1",
            border: "none",
            padding: "12px 24px",
            borderRadius: "6px",
            color: "#333",
            fontSize: "16px",
            fontWeight: "600",
            cursor: loading ? "not-allowed" : "pointer",
            transition: "background-color 0.3s ease",
          }}
        >
          {loading ? "등록 중..." : "등록"}
        </button>

        <button
          type="button"
          onClick={handleReset}
          disabled={loading}
          style={{
            backgroundColor: "#eee",
            border: "none",
            padding: "12px 24px",
            borderRadius: "6px",
            fontSize: "16px",
            cursor: loading ? "not-allowed" : "pointer",
            transition: "background-color 0.3s ease",
          }}
        >
          초기화
        </button>
      </div>
    </div>
  );
}

export default TodoWrite;
