// src/App.jsx
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import StudentDashboard from './pages/StudentDashboard';
import InstructorDashboard from './pages/InstructorDashboard';
import AdminDashboard from './pages/AdminDashboard';
import Unauthorized from './pages/Unauthorized';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* Protected Routes by Role */}
      <Route element={<ProtectedRoute allowedRoles={['student']} />}>
        <Route path="/student-dashboard" element={<StudentDashboard />} />
      </Route>

      <Route element={<ProtectedRoute allowedRoles={['instructor']} />}>
        <Route path="/instructor-dashboard" element={<InstructorDashboard />} />
      </Route>

      <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Route>

      {/* Catch-all route */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
