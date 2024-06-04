import './App.css';

import './components/SideBar/SideBar.jsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SideBar from './components/SideBar/SideBar.jsx';
import EmployeeList from './components/EmployeeData/EmployeeList.jsx';
import LabList from './components/LabData/LabList.jsx';
import Search from './components/SearchEmployee/searchEmp.jsx';

function App() {
    return (
      <Router>
          <div className="App">
              <SideBar />
              <div className="content">
                  <Routes>
                      <Route path="/employee" element = {<EmployeeList />} />
                      <Route path="/lab" element={<LabList />} />
                      <Route path="/search" element={<Search/>} />
                  </Routes>
              </div>
          </div>
      </Router>
  );
}

export default App;
