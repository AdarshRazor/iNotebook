import './App.css';
import Home from './components/Home';
import About from './components/About';
import Navbar from './components/Navbar';
import { Routes, Route } from 'react-router-dom';
import NoteState from './context/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
import { useState } from 'react';

function App() {

  // eslint-disable-next-line
  const [alert, setAlert] = useState(null)

  const showAlert = (message, alert) => {
    setAlert({msg: message, type: alert})
    setTimeout(() => setAlert(null), 3000)
  }

  return (
    <>
     <Navbar showAlert={showAlert}/>
     {alert && <Alert alert={alert} />}
     <NoteState>
     <Routes>
          <Route path="/" element={<Home showAlert={showAlert} />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login showAlert={showAlert} />} />
          <Route path="/signup" element={<Signup showAlert={showAlert} />} />
        </Routes>
      </NoteState>

    </>
  );
}

export default App;
