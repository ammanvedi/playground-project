import { Link } from 'react-router-dom';
import type { Todo, TodoStatus } from '../lib/store';

const STATUS_CLASS: Record<TodoStatus, string> = {
  'todo': 'status--todo',
  'in-progress': 'status--progress',
  'completed': 'status--done',
  'archived': 'status--archived',
};

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

export default function TodoItem({ todo }: { todo: Todo }) {
  return (
    <Link to={`/todo/${todo.id}`} className="todo-row">
      <span className={`todo-status ${STATUS_CLASS[todo.status]}`} />
      <span className="todo-name">{todo.name}</span>
      <span className="todo-date">{formatDate(todo.dueDate)}</span>
      <span className="todo-arrow">&rarr;</span>
    </Link>
  );
}
