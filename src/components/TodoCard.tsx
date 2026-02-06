"use client";

import { useState } from "react";
import { CardShell } from "./CardShell";
import { useTodos } from "@/hooks/useTodos";

export function TodoCard() {
  const [value, setValue] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingValue, setEditingValue] = useState("");
  const { todos, addTodo, deleteTodo, editTodo, toggleTodo } = useTodos();

  return (
    <CardShell>
      <h2 className="text-xl font-semibold text-slate-900">Sticky To-Do</h2>
      <p className="mb-4 text-sm text-slate-500">Local-only MVP persistence (browser storage).</p>

      <form
        className="mb-4 flex gap-2"
        onSubmit={(event) => {
          event.preventDefault();
          if (!value.trim()) return;
          addTodo(value.trim());
          setValue("");
        }}
      >
        <input
          value={value}
          onChange={(event) => setValue(event.target.value)}
          className="flex-1 rounded-xl border border-slate-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none"
          placeholder="Add a task"
        />
        <button className="rounded-xl bg-brand-500 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700">Add</button>
      </form>

      <ul className="space-y-2">
        {todos.map((todo) => (
          <li key={todo.id} className="flex items-center gap-2 rounded-xl bg-slate-50 p-2">
            <input checked={todo.done} onChange={() => toggleTodo(todo.id)} type="checkbox" />
            {editingId === todo.id ? (
              <input
                className="flex-1 rounded border border-slate-300 px-2 py-1 text-sm"
                value={editingValue}
                onChange={(event) => setEditingValue(event.target.value)}
                onBlur={() => {
                  editTodo(todo.id, editingValue.trim() || todo.text);
                  setEditingId(null);
                }}
                autoFocus
              />
            ) : (
              <button
                className={`flex-1 text-left text-sm ${todo.done ? "text-slate-400 line-through" : "text-slate-800"}`}
                onClick={() => {
                  setEditingId(todo.id);
                  setEditingValue(todo.text);
                }}
              >
                {todo.text}
              </button>
            )}
            <button
              className="rounded-md px-2 py-1 text-xs text-red-600 hover:bg-red-50"
              onClick={() => deleteTodo(todo.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </CardShell>
  );
}
