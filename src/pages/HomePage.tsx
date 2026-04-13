import { useState } from 'react';
import { useSettings, useTodos } from '../lib/store';
import TodoList from '../components/TodoList';

export default function HomePage() {
  const { settings } = useSettings();
  const { activeTodos, addTodo } = useTodos();
  const [newTask, setNewTask] = useState('');

  const activeCount = activeTodos.filter(t => t.status !== 'completed').length;
  const completedCount = activeTodos.filter(t => t.status === 'completed').length;
  const inProgressCount = activeTodos.filter(t => t.status === 'in-progress').length;

  const handleAdd = () => {
    const name = newTask.trim();
    if (!name) return;
    const due = new Date(Date.now() + 7 * 86400000).toISOString();
    addTodo(name, '', due);
    setNewTask('');
  };

  return (
    <div className="page">
      <div className="hero-section">
        <div className="hero-text">
          <h1>Manage<br />everything.</h1>
          <p className="hero-sub">
            Unified task tracking for {settings.name.toLowerCase() || 'you'}. Queue, execute, and archive with zero friction.
          </p>
          <div className="hero-actions">
            <button onClick={() => document.getElementById('new-task-input')?.focus()} className="btn">
              New task &rarr;
            </button>
            <span className="hero-sub" style={{ margin: 0 }}>{activeTodos.length} in queue</span>
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div className="hero-accent">{activeTodos.length}</div>
          <div className="hero-accent-label">Active tasks &nbsp; Explore &rarr;</div>
        </div>
      </div>

      <div className="stat-bar">
        <div className="stat-cell">
          <div className="stat-label">Pending</div>
          <div className="stat-value">{activeCount}</div>
        </div>
        <div className="stat-cell">
          <div className="stat-label">In progress</div>
          <div className="stat-value">{inProgressCount}</div>
        </div>
        <div className="stat-cell">
          <div className="stat-label">Completed</div>
          <div className="stat-value">{completedCount}</div>
        </div>
      </div>

      <TodoList
        todos={activeTodos}
        title="Task queue"
        emptyMessage="No active tasks. Create one below."
      />

      <div className="section">
        <div className="section-header">
          <span className="section-title">New task</span>
        </div>
        <div className="input-row">
          <input
            id="new-task-input"
            type="text"
            value={newTask}
            onChange={e => setNewTask(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleAdd()}
            placeholder="Task name..."
            className="text-input"
            autoComplete="off"
            spellCheck={false}
          />
          <button onClick={handleAdd} className="btn">
            Add &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}
