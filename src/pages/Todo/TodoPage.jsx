import React, { useEffect, useState } from "react";
import { deleteTodo, getTodo, postTodo, putTodo } from "../../api/todoApi";
import styled from "styled-components";
import { StyledButton } from "../../components/Button";
import Title from "../../components/Title";
import TodoInput from "../../components/TodoInput";

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

  const handleClickEditTodo = (todoId, todo, isChecked) => {
    setEditTodoId(todoId);
    setEditTodo({ todo: todo, isCompleted: isChecked });
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
    <Container>
      <Title>오늘의 할일 추가하기</Title>
      <TodoInputForm onSubmit={handleSubmitTodo}>
        <TodoInput
          type="text"
          id="new-todo-input"
          value={newTodo}
          onChange={handleChangeTodo}
        />
        <TodoAddButton id="new-todo-add-button">추가</TodoAddButton>
      </TodoInputForm>

      <TodoList>
        {todos.map((todo) => (
          <TodoItem key={todo.id}>
            <TodoLabel isEdit={editTodoId === todo.id}>
              <input
                type="checkbox"
                id={todo.id}
                checked={todo.isCompleted}
                value={todo.todo}
                onChange={handleChangeCheckBox}
              />
              <span>{todo.todo}</span>
              <TodoButton
                type="button"
                id="modify-button"
                onClick={() => {
                  handleClickEditTodo(todo.id, todo.todo, todo.isChecked);
                }}
              >
                수정
              </TodoButton>
              <TodoButton
                type="button"
                id="delete-button"
                onClick={() => handleClickDeleteTodo(todo.id)}
              >
                삭제
              </TodoButton>
            </TodoLabel>

            {editTodoId === todo.id && (
              <EditForm onSubmit={handleSubmitEditTodo}>
                <TodoInput
                  id="modify-input"
                  value={editTodo.todo}
                  onChange={(e) =>
                    handleChangeEditTodo(e.target.value, todo.isCompleted)
                  }
                />
                <TodoButton id="submit-button">제출</TodoButton>
                <TodoButton
                  type="button"
                  id="cancel-button"
                  onClick={handleClickCancleEdit}
                >
                  취소
                </TodoButton>
              </EditForm>
            )}
          </TodoItem>
        ))}
      </TodoList>
    </Container>
  );
}

const Container = styled.div`
  margin: 0 auto;
`;

const TodoInputForm = styled.form`
  display: flex;
  justify-content: center;
  gap: 10px;
`;

const TodoLabel = styled.label`
  opacity: ${(p) => (p.isEdit ? 0 : 1)};
`;

const TodoAddButton = styled(StyledButton)`
  width: 80px;
  font-size: 14px;
  border-radius: 10px;
`;

const TodoButton = styled(StyledButton)`
  width: 48px;
  padding: 10px;
  font-size: 12px;
  border-radius: 10px;
  margin: 0 5px;
`;

const TodoList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 24px;
`;

const TodoItem = styled.li`
  display: flex;
  justify-content: center;
`;

const EditForm = styled.form`
  position: absolute;
  background-color: var(--black);
`;
