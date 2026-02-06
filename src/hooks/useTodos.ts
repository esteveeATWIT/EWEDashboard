"use client";

import { useEffect, useState } from "react";

export interface Todo {
  id: string;
  text: string;
  done: boolean;
}

const STORAGE_KEY = "dashboard.todos.v1";

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setTodos(JSON.parse(saved) as Todo[]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text: string) => {
    setTodos((current) => [{ id: crypto.randomUUID(), text, done: false }, ...current]);
  };

  const toggleTodo = (id: string) => {
    setTodos((current) => current.map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo)));
  };

  const editTodo = (id: string, text: string) => {
    setTodos((current) => current.map((todo) => (todo.id === id ? { ...todo, text } : todo)));
  };

  const deleteTodo = (id: string) => {
    setTodos((current) => current.filter((todo) => todo.id !== id));
  };

  return { todos, addTodo, toggleTodo, editTodo, deleteTodo };
}
