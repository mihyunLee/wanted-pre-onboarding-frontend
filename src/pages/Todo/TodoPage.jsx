import React, { useEffect, useState } from "react";
import { getTodo, postTodo, putTodo } from "../../api/todoApi";

export default function TodoPage() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  const fetchData = async () => {
    try {
      const response = await getTodo();
      setTodos(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleChangeTodo = (e) => {
    setNewTodo(e.target.value);
  };

  const handleSubmitTodo = async (e) => {
    e.preventDefault();

    try {
      await postTodo({ todo: newTodo });
      await fetchData();
      setNewTodo("");
    } catch (error) {
      console.error("Error post data:", error);
    }
  };

  const handleClickCheckBox = async (e) => {
    const { id, value, checked } = e.target;

    await putTodo(id, { todo: value, isCompleted: checked });
    await fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <form onSubmit={handleSubmitTodo}>
        <input
          type="text"
          data-testid="new-todo-input"
          value={newTodo}
          onChange={handleChangeTodo}
        />
        <button data-testid="new-todo-add-button">추가</button>
      </form>

      <br />

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <label>
              <input
                type="checkbox"
                id={todo.id}
                checked={todo.isCompleted}
                value={todo.todo}
                onClick={handleClickCheckBox}
              />
              <span>{todo.todo}</span>
              <button type="button" data-testid="modify-button">
                수정
              </button>
              <button type="button" data-testid="delete-button">
                삭제
              </button>
            </label>
          </li>
        ))}
      </ul>
    </>
  );
}
