import './App.scss';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import NavBar from './components/NavBar/NavBar';
import Main from './pages/Main/Main';
import { useEffect, useState } from 'react';
import RegModal from './components/modals/RegModal/RegModal';
import LogModal from './components/modals/LogModal/LogModal';
import { fetchCarsList } from './api';
import Car from './pages/Car/Car';


function App() {
  const [carsList, setCarsList] = useState([])
  const [role, setRole] = useState('')
  const [loginOpen, setLoginOpen] = useState(false)
  const [regOpen, setRegOpen] = useState(false)


  useEffect(() => {
    setRole(localStorage.getItem("role"))
    const fetchData = async () => {
      setCarsList(await fetchCarsList())
    }
    fetchData()
  }, [])

  const toggleLogin = () => {
    setLoginOpen(!loginOpen)
  }

  const toggleReg = () => {
    setRegOpen(!regOpen)
  }

  return (
    <Router>
      <NavBar setRole={setRole} role={role} reg={toggleReg} login={toggleLogin} />
        <Route path="/" exact>
          <Main carsList={carsList} setCarsList={setCarsList} />
        </Route>
        <Route path="/car/:id">
          <Car role={role} />
        </Route>
      {loginOpen && <LogModal setRole={setRole} close={toggleLogin} />}
      {regOpen && <RegModal setRole={setRole} close={toggleReg} />}
    </Router>
  );
}

export default App;
