import { Button, Card, Input, Layout, Space, Tag, Typography, message } from 'antd';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import * as Components from '../assets/Components';
import WordService from '../services/WordService';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/AuthService';

const { Header, Content } = Layout;

const StyledHeader = styled(Header)`
    position: absolute;
    width: 100vw;   
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: white;
    margin-top: 0px;
    padding: 0 50px;
    z-index: 5;
`;

const MainContainer = styled(Content)`
    display: flex;
    flex-direction: column;
    padding: 24px 50px;
    background: -webkit-linear-gradient(to right, #0088ff, #7700ff);
    background: linear-gradient(to right, #0088ff, #7700ff);
    gap: 24px;
    margin: 0 auto;
    margin-top: 65px;
    height: 90vh;
    width: 100vw;
    overflow: auto;
`;

const IndexDiv = styled.div`
    position: relative;
    padding: 20px;
    height :100%;
    max-height: 20px;
    width: 65vw;
    margin-bottom: 10px;
`;

const StyledLayout = styled(Layout)`
    min-height: 100vh;
    width: 100vw;
    overflow: hidden;
`;

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

    const handleLogout = async () => {
        try {
            await AuthService.logout(); // Call the logout function from AuthService
            localStorage.removeItem('user');
            setIsLoggedIn(false);
            navigate('/login');
        } catch (error) {
            console.error("Logout failed:", error);
            message.error("Đăng xuất thất bại. Vui lòng thử lại.");
        }
    };

    return (
        <StyledLayout>
            <StyledHeader>
                <Components.GradientTitle style={{ color: '#47B5FF', marginTop: '0px' }}>RappA</Components.GradientTitle>
                <Components.GradiantButton
                    style={{ padding: '20px', maxHeight: '40px', alignItems: 'center', justifyContent: 'center', display: 'flex' }}
                    onClick={() => {
                        handleLogout;
                        navigate('/login')
                    }}
                >
                    Đăng xuất
                </Components.GradiantButton>
            </StyledHeader>

            <MainContainer style={{alignItems:'center'}}>
            <IndexDiv>
                    <Components.ColoredBackground/>
                    <Components.Bg/>
                </IndexDiv>
                <IndexDiv>
                    <Components.ColoredBackground/>
                    <Components.Bg/>
                </IndexDiv>
                <IndexDiv>
                    <Components.ColoredBackground/>
                    <Components.Bg/>
                </IndexDiv>
            </MainContainer>
        </StyledLayout>
    );
};

export default Home;