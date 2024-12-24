import React from "react";
import * as Components from '../assets/Components';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/AuthService';

interface CustomError {
    response?: {
      status: number;
      data: string;
    };
  }

function Login() {
    const [signIn, toggle] = React.useState<boolean>(true);
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const navigate = useNavigate();

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
        if (!username || specialCharRegex.test(username)) {
            message.error('Tên tài khoản không được để trống hoặc chứa kí tự đặc biệt.');
            return;
        }
        if (password.length < 8) {
            message.error('Mật khẩu phải có ít nhất 8 kí tự.');
            return;
        }
        try {
            const response = await AuthService.signin({ username, password });
            localStorage.setItem('user', JSON.stringify(response));
            console.log('Sign in successful:', response);
            if (response.role === 'ROLE_ADMIN') {
                navigate('/admin');
            } else {
                navigate('/home');
            }
        } catch (error) {
            message.error('Đăng nhập thất bại. Vui lòng thử lại.');
            console.error("Sign up failed:", error);
        }
    };

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
        if (!username || specialCharRegex.test(username)) {
            message.error('Tên tài khoản không được để trống hoặc chứa kí tự đặc biệt.');
            return;
        }
        if (password.length < 8) {
            message.error('Mật khẩu phải có ít nhất 8 kí tự.');
            return;
        }
        if (password !== confirmPassword) {
            message.error('Nhập lại mật khẩu không khớp.');
            return;
        }
        try {
            const response = await AuthService.signup({ username, password });
            console.log('Sign up successful:', response);
            // Handle successful sign-up (e.g., redirect, show success message)
        } catch (error: unknown) {
            if (isCustomError(error) && error.response && error.response.status === 400) {
              const errorMessage = error.response.data;
          
              if (errorMessage === "Username already exists") {
                message.error("Tên người dùng đã tồn tại!");
              } else {
                message.error(errorMessage); // Display other 400 errors
              }
            } else {
              message.error('Đăng ký thất bại. Vui lòng thử lại.');
            }
        }
    };

    function isCustomError(error: unknown): error is CustomError {
        return (
          typeof error === 'object' &&
          error !== null &&
          (error as CustomError).response !== undefined
        );
    }

    return (
        <div style={{height: '100vh', width: '100vw', alignItems:'center', display: 'flex',justifyContent: 'center', backgroundColor: '#ffffff'}}>
            <Components.Container>
                <Components.SignUpContainer signinIn={signIn}>
                    <Components.Form onSubmit={handleSignUp}>
                        <Components.Title style={{color: '#0088ff', fontSize: '40px'}}>Đăng ký</Components.Title>
                        <Components.Input 
                            type='text' 
                            placeholder='Tên tài khoản' 
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)}
                            style={{color: '#000000'}}
                        />
                        <Components.Input 
                            type='password' 
                            placeholder='Mật khẩu' 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)}
                            style={{color: '#000000'}}
                        />
                        <Components.Input 
                            type='password' 
                            placeholder='Nhập lại mật khẩu' 
                            value={confirmPassword} 
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            style={{color: '#000000'}}
                        />
                        <Components.Button>Đăng ký</Components.Button>
                    </Components.Form>
                </Components.SignUpContainer>

                <Components.SignInContainer signinIn={signIn}>
                    <Components.Form onSubmit={handleSignIn}>
                        <Components.Title style={{color: '#7700ff', fontSize: '40px'}}>Đăng nhập</Components.Title>
                        <Components.Input 
                            type='text' 
                            placeholder='Tên tài khoản' 
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)}
                            style={{color: '#000000'}}
                        />
                        <Components.Input 
                            type='password' 
                            placeholder='Mật khẩu' 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)}
                            style={{color: '#000000'}}
                        />
                        <Components.Button style={{background:'#7700ff'}}>Sign In</Components.Button>
                    </Components.Form>
                </Components.SignInContainer>

                <Components.OverlayContainer signinIn={signIn}>
                    <Components.Overlay signinIn={signIn}>
                        <Components.LeftOverlayPanel signinIn={signIn}>
                            <Components.Title>RappA</Components.Title>
                            <Components.Paragraph>
                                Bạn đã có tài khoản? Hãy đăng nhập vào tài khoản tại đây.
                            </Components.Paragraph>
                            <Components.GhostButton onClick={() => toggle(true)}>
                                Đăng nhập
                            </Components.GhostButton>
                        </Components.LeftOverlayPanel>

                        <Components.RightOverlayPanel signinIn={signIn}>
                            <Components.Title>RappA</Components.Title>
                            <Components.Paragraph>
                                Bạn chưa có tài khoản? Đăng ký một tài khoản mới tại đây.
                            </Components.Paragraph>
                            <Components.GhostButton onClick={() => toggle(false)}>
                                Đăng ký
                            </Components.GhostButton>
                        </Components.RightOverlayPanel>
                    </Components.Overlay>
                </Components.OverlayContainer>
            </Components.Container>
        </div>
    );
}

export default Login;