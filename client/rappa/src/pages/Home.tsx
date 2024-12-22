import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        const checkLoginStatus = () => {
            const user = localStorage.getItem('user');
            if (user) {
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
                navigate('/login');
            }
        };

        checkLoginStatus();
    }, [navigate]);

    if (!isLoggedIn) {
        return null; // or a loading spinner
    }

    return (
        <div>
            <h1>Welcome to the Home Page</h1>
            <p>You are logged in!</p>
        </div>
    );
};

export default Home;