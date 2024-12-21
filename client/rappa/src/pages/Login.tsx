import React from "react";
    import * as Components from '../assets/Components';
import { message } from 'antd';

function Login() {
    const [signIn, toggle] = React.useState<boolean>(true); // Specify state type
    const [username, setUsername] = React.useState(''); // Add state for username
    const [password, setPassword] = React.useState(''); // Add state for password
    const [confirmPassword, setConfirmPassword] = React.useState('');

    const handleSignIn = (e: React.FormEvent) => {
        e.preventDefault();
        // Validation for username
        const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/; // Regex for special characters
        if (!username || specialCharRegex.test(username)) {
            message.error('Tên tài khoản không được để trống hoặc chứa kí tự đặc biệt.'); // Show error message
            return;
        }
        // Validation for password
        if (password.length < 8) {
            message.error('Mật khẩu phải có ít nhất 8 kí tự.'); // Show error message
            return;
        }
        // Handle sign-in logic here
        console.log('Username:', username);
        console.log('Password:', password);
    };

    const handleSignUp = (e: React.FormEvent) => {
        e.preventDefault();
        // Validation for username
        const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/; // Regex for special characters
        if (!username || specialCharRegex.test(username)) {
            message.error('Tên tài khoản không được để trống hoặc chứa kí tự đặc biệt.'); // Show error message
            return;
        }
        // Validation for password
        if (password.length < 8) {
            message.error('Mật khẩu phải có ít nhất 8 kí tự.'); // Show error message
            return;
        }
        // Validation for password confirmation
        if (password !== confirmPassword) {
            message.error('Nhập lại mật khẩu không khớp.'); // Show error message
            return;
        }
        // Handle sign-up logic here
        console.log('Username:', username);
        console.log('Password:', password);
    };
     return (
        <div style={{height: '100vh', width: '100vw', alignItems:'center', display: 'flex',justifyContent: 'center',}}>
            <Components.Container>
           <Components.SignUpContainer signinIn={signIn}>
               <Components.Form onSubmit={handleSignUp}>
                   <Components.Title style={{color: '#0088ff', fontSize: '40px'}}>Đăng ký</Components.Title>
                   <Components.Input 
                       type='text' 
                       placeholder='Tên tài khoản' 
                       value={username} 
                       onChange={(e) => setUsername(e.target.value)}
                   />
                   <Components.Input 
                       type='password' 
                       placeholder='Mật khẩu' 
                       value={password} 
                       onChange={(e) => setPassword(e.target.value)}
                   />
                   <Components.Input 
                       type='password' 
                       placeholder='Nhập lại mật khẩu' 
                       value={confirmPassword} 
                       onChange={(e) => setConfirmPassword(e.target.value)}
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
                    />
                    <Components.Input 
                        type='password' 
                        placeholder='Mật khẩu' 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
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