import './App.scss';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import NavBar from './components/NavBar/NavBar';
import Main from './pages/Main/Main';
import { useState } from 'react';
import RegModal from './components/modals/RegModal/RegModal';
import LogModal from './components/modals/LogModal/LogModal';


function App() {
  const [loginOpen, setLoginOpen] = useState(false)
  const [regOpen, setRegOpen] = useState(false)

  const toggleLogin = () => {
    setLoginOpen(!loginOpen)
  }

  const toggleReg = () => {
    setRegOpen(!regOpen)
  }

  return (
    <Router>
      <NavBar reg={toggleReg} login={toggleLogin} />
      <Switch>
        <Route path="/">
          <Main/>
        </Route>
      </Switch>
      {loginOpen && <LogModal close={toggleLogin} />}
      {regOpen && <RegModal close={toggleReg} />}
    </Router>
  );
}

export default App;
