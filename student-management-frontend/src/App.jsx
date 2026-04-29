import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import StudentsList from './pages/StudentsList';
import StudentForm from './pages/StudentForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LandingPage />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="students" element={<StudentsList />} />
          <Route path="students/add" element={<StudentForm />} />
          <Route path="students/edit/:id" element={<StudentForm />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
