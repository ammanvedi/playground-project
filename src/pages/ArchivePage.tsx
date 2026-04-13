import { useTodos } from '../lib/store';
import TodoItem from '../components/TodoItem';

export default function ArchivePage() {
  const { archivedTodos, updateTodo } = useTodos();

  return (
    <div className="page">
      <div className="hero-section" style={{ paddingBottom: 0 }}>
        <div className="hero-text">
          <h1>Archive.</h1>
          <p className="hero-sub">
            Completed and decommissioned tasks. Restore any item to move it back to the active queue.
          </p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div className="hero-accent">{archivedTodos.length}</div>
          <div className="hero-accent-label">Archived</div>
        </div>
      </div>

      <div className="section">
        <div className="section-header">
          <span className="section-title">Archived tasks</span>
          <span className="section-count">{archivedTodos.length} {archivedTodos.length === 1 ? 'item' : 'items'}</span>
        </div>
        {archivedTodos.length === 0 ? (
          <div className="empty-state">No archived tasks yet.</div>
        ) : (
          <div className="todo-list">
            {archivedTodos.map(todo => (
              <div key={todo.id} className="archive-row">
                <TodoItem todo={todo} />
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    updateTodo(todo.id, { status: 'todo' });
                  }}
                  className="btn btn--ghost btn--small"
                >
                  Restore
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
