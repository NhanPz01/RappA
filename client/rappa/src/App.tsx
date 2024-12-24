import 'antd/dist/reset.css';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import Login from './pages/Login';
import Record from './pages/Record';
import Home from './pages/Home';
import Admin from './pages/Admin';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<MainPage />} />
                <Route path="/record/:id" element={<Record />} />
                <Route path="/home" element={<Home />} />
                <Route path="/admin" element={<Admin />} />
            </Routes>
        </Router>
    );
}

export default App;