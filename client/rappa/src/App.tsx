import 'antd/dist/reset.css';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import Login from './pages/Login'
function App() {

  return (
    <Router>
     <Routes>
       <Route path="/login" element={<Login />} />
       <Route path="/" element={<MainPage />} />
     </Routes>
   </Router>
  )
}

export default App
