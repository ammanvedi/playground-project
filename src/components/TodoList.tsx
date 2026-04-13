import type { Todo } from '../lib/store';
import TodoItem from './TodoItem';

interface Props {
  todos: Todo[];
  emptyMessage?: string;
  title: string;
}

export default function TodoList({ todos, emptyMessage = 'No tasks yet.', title }: Props) {
  return (
    <div className="section">
      <div className="section-header">
        <span className="section-title">{title}</span>
        <span className="section-count">{todos.length} {todos.length === 1 ? 'item' : 'items'}</span>
      </div>
      {todos.length === 0 ? (
        <div className="empty-state">{emptyMessage}</div>
      ) : (
        <div className="todo-list">
          {todos.map(todo => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </div>
      )}
    </div>
  );
}
