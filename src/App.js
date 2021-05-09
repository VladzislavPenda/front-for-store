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
import UpdateModalModels from './components/modals/UpdateModalModels/UpdateModalModels';
import UpdateMarkModal from './components/modals/UpdateMarkModal/UpdateMarkModal';
import { fetchCarsList, fetchCarsListWithParam } from './api';
import Car from './pages/Car/Car';
import AdminPanel from './pages/AdminPanel/AdminPanel';


function App() {
  const [pagination, setPagination] = useState([])
  const [carsList, setCarsList] = useState([])
  const [role, setRole] = useState('')
  const [id, setId] = useState()
  const [typeValue, setTypeValue] = useState()
  const [type, setType] = useState()
  const [loginOpen, setLoginOpen] = useState(false)
  const [regOpen, setRegOpen] = useState(false)
  const [updateOpen, setUpdateOpen] = useState(false)
  const [updateModelOpen, setUpdateModelOpen] = useState(false)
  const [updateMarksOpen, setUpdateMarksOpen] = useState(false)
  const [markName, setMarkName] = useState(false)
  const [country, setCountry] = useState(false)
  const [addOpen, setAddOpen] = useState(false)
  const [params, setParams] = useState({})
  const [currentPage, setCurrentPage] = useState(1)


  useEffect(() => {
    setRole(localStorage.getItem("role"))
    const fetchData = async () => {
      const data = await fetchCarsList()
      setPagination(data['responseData'])
      setCarsList(data['data'])
    }
    fetchData()
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchCarsListWithParam(params)
      setPagination(JSON.parse(response['responseData']))
      console.log()
      setCarsList(response['data'])
    }
    fetchData()
  }, [currentPage])

  const toggleLogin = () => {
    setLoginOpen(!loginOpen)
  }

  const toggleReg = () => {
    setRegOpen(!regOpen)
  }

  const toggleUpdate = (id, typeValue, type, marknum, country) => {
    setId(id)
    setTypeValue(typeValue)
    setType(type)
    console.log(type)
    if (type === "shopModels")
    {
      console.log("yeap")
      setUpdateModelOpen(!updateModelOpen)
    }
    else if(type === "shopMark")
    {
      setMarkName(marknum)
      setCountry(country)
      setUpdateMarksOpen(!updateMarksOpen)
    } else {
      console.log("no")
      setUpdateOpen(!updateOpen)
    }
    
  }

  const toggleUpdateMarkClose = () => {
    setUpdateMarksOpen(!updateMarksOpen)
  }

  const toggleUpdateModelClose = () => {
    setUpdateModelOpen(!updateModelOpen)
  }

  const toggleAdd = (type) => {
    setType(type)
    setAddOpen(!addOpen)
  }
  
  return (
    <Router>
      <NavBar setRole={setRole} role={role} reg={toggleReg} login={toggleLogin}/>
        <Route path="/" exact>
          <Main currentPage={currentPage} setCurrentPage={setCurrentPage} pagination={pagination} setPagination={setPagination} params={params} setParams={setParams} carsList={carsList} setCarsList={setCarsList} pagination={pagination} setPagination={setPagination}/>
        </Route>
        <Route path="/admin" exact>
          <AdminPanel setRole={setRole} role={role} update={toggleUpdate} add={toggleAdd}/>
        </Route>
        <Route path="/car/:id">
          <Car role={role} />
        </Route>
      {updateMarksOpen && <UpdateMarkModal 
        setRole={setRole}
        close={toggleUpdateMarkClose} 
        setId={id} 
        type={typeValue} 
        setType={type} 
        data={typeValue} 
        markName={markName} 
        country={country}/>} 
      {updateModelOpen && <UpdateModalModels
        setRole={setRole}
        close={toggleUpdateModelClose} 
        setId={id} type={typeValue} 
        setType={type} 
        data={typeValue}/>}
      {updateOpen && <UpdateModal setRole={setRole} close={toggleUpdate} setId={id} type={typeValue} setType={type} data={typeValue}/>}
      {addOpen && <AddModal setRole={setRole} close={toggleAdd} setId={id} type={typeValue} setType={type} data={typeValue}/>}
      {loginOpen && <LogModal setRole={setRole} close={toggleLogin} />}
      {regOpen && <RegModal setRole={setRole} close={toggleReg} />}
    </Router>
  );
}

export default App;
