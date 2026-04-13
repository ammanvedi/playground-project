import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import SettingsPage from './pages/SettingsPage';
import ArchivePage from './pages/ArchivePage';
import TodoDetailPage from './pages/TodoDetailPage';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/archive" element={<ArchivePage />} />
        <Route path="/todo/:id" element={<TodoDetailPage />} />
      </Route>
    </Routes>
  );
}
