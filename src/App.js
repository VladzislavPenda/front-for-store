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
import AddModal from './components/modals/AddModal/AddModal';
import UpdateModal from './components/modals/UpdateModal/UpdateModal';
import { fetchCarsList } from './api';
import Car from './pages/Car/Car';
import AdminPanel from './pages/AdminPanel/AdminPanel';


function App() {
  const [carsList, setCarsList] = useState([])
  const [pagination, setPagination] = useState()
  const [role, setRole] = useState('')
  const [id, setId] = useState()
  const [typeValue, setTypeValue] = useState()
  const [type, setType] = useState()
  const [loginOpen, setLoginOpen] = useState(false)
  const [regOpen, setRegOpen] = useState(false)
  const [updateOpen, setUpdateOpen] = useState(false)
  const [addOpen, setAddOpen] = useState(false)


  useEffect(() => {
    setRole(localStorage.getItem("role"))
    const fetchData = async () => {
      const data = await fetchCarsList()
      setPagination(data['responseData'])
      setCarsList(data['data'])
    }
    fetchData()
  }, [])

  const toggleLogin = () => {
    setLoginOpen(!loginOpen)
  }

  const toggleReg = () => {
    setRegOpen(!regOpen)
  }

  const toggleUpdate = (id, typeValue, type) => {
    setId(id)
    setTypeValue(typeValue)
    setType(type)
    setUpdateOpen(!updateOpen)
  }

  const toggleAdd = (type) => {
    setType(type)
    setAddOpen(!addOpen)
  }
  
  return (
    <Router>
      <NavBar setRole={setRole} role={role} reg={toggleReg} login={toggleLogin}/>
        <Route path="/" exact>
          <Main carsList={carsList} setCarsList={setCarsList} pagination={pagination} setPagination={setPagination}/>
        </Route>
        <Route path="/admin" exact>
          <AdminPanel setRole={setRole} role={role} update={toggleUpdate} add={toggleAdd}/>
        </Route>
        <Route path="/car/:id">
          <Car role={role} />
        </Route>
      {updateOpen && <UpdateModal setRole={setRole} close={toggleUpdate} setId={id} type={typeValue} setType={type} data={typeValue}/>}
      {addOpen && <AddModal setRole={setRole} close={toggleAdd} setId={id} type={typeValue} setType={type} data={typeValue}/>}
      {loginOpen && <LogModal setRole={setRole} close={toggleLogin} />}
      {regOpen && <RegModal setRole={setRole} close={toggleReg} />}
    </Router>
  );
}

export default App;
