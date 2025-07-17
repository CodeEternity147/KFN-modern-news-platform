import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './Dashboard';
import CreateNews from './CreateNews';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-news" element={<CreateNews />} />
      </Routes>
    </Router>
  );
}

export default App;
