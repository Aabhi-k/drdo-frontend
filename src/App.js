import './App.css';

import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

import SideBar from './components/SideBar/SideBar.jsx';
import EmployeeList from './components/EmployeeData/EmpMaster/EmployeeList.jsx';
import EmployeeDesignation from './components/EmployeeData/EmpDesignation/EmployeeDesignation.jsx';
import LabList from './components/LabData/LabList.jsx';
import CreateEmpList from './components/EmployeeData/EmpMaster/CreateEmpList.jsx';
import UserLogin from './components/UserLogin/UserLogin.jsx';
function App() {
    return (
      <Router>
          <div className="App">
              <SideBar />
              <div className="content">
                  <Routes>
                      <Route path="/employee" element = {<EmployeeList />} />
                      <Route path="/lab" element={<LabList />} />
                      <Route path='/empdes' element={<EmployeeDesignation/>} />
                      <Route path = "/employee/create" element= {<CreateEmpList />}/>
                      <Route path ="/" element= {<UserLogin/>} />
                  </Routes>
              </div>
          </div>
      </Router>
  );
}
const SidebarWithRoutes = () => {
    const location = useLocation();
    const hideSidebarRoutes = ['/'];

    return hideSidebarRoutes.includes(location.pathname) && <SideBar/>;
};


export default App;
