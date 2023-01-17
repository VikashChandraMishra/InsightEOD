import '@progress/kendo-theme-default/dist/all.css';
import Navbar from "./components/navigation/Navbar";
import Home from "./components/forms/Home";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import Register from "./components/forms/Register";
import SubmitEOD from "./components/forms/SubmitEOD";
import UserDashboard from "./components/dashboards/UserDashboard";
import EODAssessmentPanel from './components/tables/EODAssessmentPanel';
import Profile from './components/detail/Profile';
import AdminDashboard from './components/dashboards/AdminDashboard';
import SubordinateEODTable from './components/tables/SubordinateEODTable';


function App() {
  return (
    <div>
      <Router>
        <Navbar />
      
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/admin/dashboard" element={<AdminDashboard />} />
          <Route exact path="/admin/subordinate-eod-list" element={<SubordinateEODTable />} />

          <Route exact path="/register" element={<Register />} />
          <Route exact path="/user/dashboard" element={<UserDashboard />} />

          <Route exact path="/user/submit-eod" element={<SubmitEOD />} />
          <Route exact path="/user/eod-assessment-panel" element={<EODAssessmentPanel />} />
          <Route exact path="/user/profile" element={<Profile />} />


        </Routes>
      
      </Router>
    </div>
  );
}

export default App;
