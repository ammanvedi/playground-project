import { useState, useCallback, useMemo } from 'react';

export type TodoStatus = 'todo' | 'in-progress' | 'completed' | 'archived';

export interface Todo {
  id: string;
  name: string;
  description: string;
  status: TodoStatus;
  dueDate: string;
  createdAt: string;
}

export interface Settings {
  name: string;
}

const TODOS_KEY = 'sysop-todos';
const SETTINGS_KEY = 'sysop-settings';

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

const DEFAULT_TODOS: Todo[] = [
  {
    id: generateId(),
    name: 'INIT_SYSTEM_AUDIT',
    description: 'Run full system diagnostic and generate compliance report for Q2. Verify all endpoints respond within SLA thresholds and flag anomalies in the event log.',
    status: 'todo',
    dueDate: new Date(Date.now() + 7 * 86400000).toISOString(),
    createdAt: new Date(Date.now() - 3 * 86400000).toISOString(),
  },
  {
    id: generateId(),
    name: 'PATCH_AUTH_MODULE',
    description: 'Apply security patch to authentication subsystem. Token rotation interval needs to be reduced from 24h to 4h per new security policy directive SEC-2026-041.',
    status: 'in-progress',
    dueDate: new Date(Date.now() + 2 * 86400000).toISOString(),
    createdAt: new Date(Date.now() - 5 * 86400000).toISOString(),
  },
  {
    id: generateId(),
    name: 'MIGRATE_DB_POOL',
    description: 'Database connection pool migration from legacy driver to async pooler. Benchmark throughput under load and verify zero-downtime switchover procedure.',
    status: 'completed',
    dueDate: new Date(Date.now() - 1 * 86400000).toISOString(),
    createdAt: new Date(Date.now() - 10 * 86400000).toISOString(),
  },
  {
    id: generateId(),
    name: 'DECOM_LEGACY_CACHE',
    description: 'Decommission legacy cache layer (CACHE_X). Data has been migrated to new distributed cache cluster. Requires final verification and DNS record cleanup.',
    status: 'archived',
    dueDate: new Date(Date.now() - 14 * 86400000).toISOString(),
    createdAt: new Date(Date.now() - 30 * 86400000).toISOString(),
  },
];

const DEFAULT_SETTINGS: Settings = { name: 'OPERATOR' };

function readStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function writeStorage<T>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value));
}

function initTodos(): Todo[] {
  const existing = readStorage<Todo[] | null>(TODOS_KEY, null);
  if (existing !== null) return existing;
  writeStorage(TODOS_KEY, DEFAULT_TODOS);
  return DEFAULT_TODOS;
}

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>(initTodos);

  const persist = useCallback((next: Todo[]) => {
    setTodos(next);
    writeStorage(TODOS_KEY, next);
  }, []);

  const addTodo = useCallback((name: string, description: string, dueDate: string) => {
    const todo: Todo = {
      id: generateId(),
      name,
      description,
      status: 'todo',
      dueDate,
      createdAt: new Date().toISOString(),
    };
    setTodos(prev => {
      const next = [todo, ...prev];
      writeStorage(TODOS_KEY, next);
      return next;
    });
    return todo;
  }, []);

  const updateTodo = useCallback((id: string, patch: Partial<Omit<Todo, 'id' | 'createdAt'>>) => {
    setTodos(prev => {
      const next = prev.map(t => (t.id === id ? { ...t, ...patch } : t));
      writeStorage(TODOS_KEY, next);
      return next;
    });
  }, []);

  const deleteTodo = useCallback((id: string) => {
    setTodos(prev => {
      const next = prev.filter(t => t.id !== id);
      writeStorage(TODOS_KEY, next);
      return next;
    });
  }, []);

  const archiveTodo = useCallback((id: string) => {
    updateTodo(id, { status: 'archived' });
  }, [updateTodo]);

  const activeTodos = useMemo(() => todos.filter(t => t.status !== 'archived'), [todos]);
  const archivedTodos = useMemo(() => todos.filter(t => t.status === 'archived'), [todos]);
  const latestTodo = useMemo(() => {
    const sorted = [...todos].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    return sorted[0] ?? null;
  }, [todos]);

  return {
    todos,
    activeTodos,
    archivedTodos,
    latestTodo,
    addTodo,
    updateTodo,
    deleteTodo,
    archiveTodo,
    resetTodos: () => persist(DEFAULT_TODOS),
  };
}

export function useSettings() {
  const [settings, setSettings] = useState<Settings>(() => readStorage(SETTINGS_KEY, DEFAULT_SETTINGS));

  const updateName = useCallback((name: string) => {
    const next = { ...settings, name: name || DEFAULT_SETTINGS.name };
    setSettings(next);
    writeStorage(SETTINGS_KEY, next);
  }, [settings]);

  return { settings, updateName };
}
