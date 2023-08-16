import { accessInstance } from "./axiosInstance";

export const postTodo = async (data) => {
  const response = await accessInstance.post(`/todos`, data);
  return response.data;
};

export const getTodo = async () => {
  const response = await accessInstance.get(`/todos`);
  return response.data;
};

export const putTodo = async (id, newData) => {
  const response = await accessInstance.put(`/todos/${id}`, newData);
  return response.data;
};

export const deleteTodo = async (id) => {
  const response = await accessInstance.delete(`/todos/${id}`);
  return response.data;
};
