import 'antd/dist/reset.css';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './pages/Record';
import Login from './pages/Login'
import Record from './pages/Record'
import Home from './pages/Home'
function App() {

  return (
    <Router>
     <Routes>
       <Route path="/login" element={<Login />} />
       <Route path="/" element={<MainPage />} />
       <Route path="/record/:id" element={<Record />} />
       <Route path="/home" element={<Home />} />
     </Routes>
   </Router>
  )
}

export default App
