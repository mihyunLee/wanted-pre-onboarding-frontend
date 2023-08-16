import React, { useEffect, useState } from "react";
import { deleteTodo, getTodo, postTodo, putTodo } from "../../api/todoApi";

export default function TodoPage() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editTodoId, setEditTodoId] = useState(null);
  const [editTodo, setEditTodo] = useState({});

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

  const handleChangeCheckBox = async (e) => {
    const { id, value, checked } = e.target;

    await putTodo(id, { todo: value, isCompleted: checked });
    await fetchData();
  };

  const handleClickEditTodo = (todoId) => {
    setEditTodoId(todoId);
  };

  const handleClickDeleteTodo = async (todoId) => {
    try {
      await deleteTodo(todoId);
      await fetchData();
    } catch (error) {
      console.error("Error delete data:", error);
    }
  };

  const handleChangeEditTodo = (todo, isChecked) => {
    setEditTodo({ todo: todo, isCompleted: isChecked });
  };

  const handleSubmitEditTodo = async (e) => {
    e.preventDefault();

    try {
      if (editTodo) {
        // 수정할 할 일의 값이 있을 때만 동작
        await putTodo(editTodoId, {
          todo: editTodo.todo,
          isCompleted: editTodo.isCompleted,
        });
        await fetchData();
        setEditTodoId(null);
        setEditTodo({});
      }
    } catch (error) {
      console.error("Error update data:", error);
    }
  };

  const handleClickCancleEdit = () => {
    setEditTodoId(null);
    setEditTodo({});
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
                onChange={handleChangeCheckBox}
              />
              <span>{todo.todo}</span>
              <button
                type="button"
                data-testid="modify-button"
                onClick={() => {
                  handleClickEditTodo(todo.id);
                }}
              >
                수정
              </button>
              <button
                type="button"
                data-testid="delete-button"
                onClick={() => handleClickDeleteTodo(todo.id)}
              >
                삭제
              </button>
            </label>

            {editTodoId === todo.id && (
              <form onSubmit={handleSubmitEditTodo}>
                <input
                  data-testid="modify-input"
                  onChange={(e) =>
                    handleChangeEditTodo(e.target.value, todo.isCompleted)
                  }
                />
                <button data-testid="submit-button">제출</button>
                <button
                  type="button"
                  data-testid="cancel-button"
                  onClick={handleClickCancleEdit}
                >
                  취소
                </button>
              </form>
            )}
          </li>
        ))}
      </ul>
    </>
  );
}
