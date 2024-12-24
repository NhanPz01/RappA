import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Components from '../assets/Components';

const MainPage: React.FC = () => {
    const navigate = useNavigate();
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    const [width, setWidth] = useState(window.innerWidth);
    const [height, setHeight] = useState(window.innerHeight);
    const cent = useRef<HTMLAnchorElement | null>(null);

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            setX(event.clientX);
            setY(event.clientY);
        };

        const handleResize = () => {
            setWidth(window.innerWidth);
            setHeight(window.innerHeight);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const dx = Math.abs(x - width / 2);
    const dy = Math.abs(y - height / 2);
    const distance = Math.sqrt(dx * dx + dy * dy);
    const size = Math.max(300 - distance / 3, 150);
    const opacity = Math.min(Math.max(size / 300, 0.7), 1);

    const centGradient = () => {
        const rect = cent.current?.getBoundingClientRect();
        const xPos = x - (rect?.left ?? 0);
        const yPos = y - (rect?.top ?? 0);
        return `radial-gradient(circle at ${xPos}px ${yPos}px, black 30%, transparent 100%)`;
    };

    return (
        <div>
            <div style={{ pointerEvents: 'none' }}></div>
            <div
                style={{
                    height: '100vh',
                    width: '100vw',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    overflow: 'hidden'
                }}
            >
                <div
                    style={{
                        position: 'absolute',
                        backgroundColor: '#404040',
                        borderRadius: '50%',
                        transform: 'translate(-50%, -50%)',
                        filter: 'blur(3rem)',
                        pointerEvents: 'none',
                        opacity: opacity,
                        left: `${x}px`,
                        top: `${y}px`,
                        width: `${size}px`,
                        height: `${size}px`
                    }}
                ></div>
                <a
                    ref={cent}
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 4,
                        WebkitMaskImage: centGradient()
                    }}
                >
                    <div style={{ maxWidth: '40vw', justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
                        <Components.GradientTitle style={{fontSize: '2rem', textAlign: 'center', marginBottom: 20}}>
                            HÃY CÙNG KHÁM PHÁ TIỀM NĂNG RAP CỦA BẠN
                        </Components.GradientTitle>
                        <Components.GradiantButton onClick={() => {navigate('/login');}}>
                            Đăng nhập ngay
                        </Components.GradiantButton>
                    </div>
                </a>
            </div>
        </div>
    );
};

export default MainPage;