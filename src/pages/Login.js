import {useContext, useState, useRef} from 'react';
import {Redirect, Link} from 'react-router-dom';
import AuthContext from '../utils/AuthContext';
import {auth} from '../components/components/firebase';
import '../styles/LoginStyle.css';

export default function Login() {
    const [isAuthenticated,
        setAuthentication] = useContext(AuthContext);
    const [isButtonDisabled,
        setButtonState] = useState(false);
    const emailRef = useRef('');
    const passwordRef = useRef('');

    async function login(event) {
        event.preventDefault();
        setButtonState(true);

        const email = emailRef
            .current
            .value
            .trim();
        const password = passwordRef.current.value;

        // try {
        await auth.signInWithEmailAndPassword(email, password);
        setAuthentication(true);
        // } catch (error) {   let message = '';   switch (error.code) {     case
        // 'auth/user-not-found':       message = 'There is no account associated with
        // this email address.';       break;     case 'auth/wrong-password': message =
        // 'Wrong password. Try again.';       break;     default: message =
        // error.message;   }   passwordRef.current.value = ''; setButtonState(false);
        // toast.error(message); }
    }

    if (isAuthenticated === null) 
        return null;
    if (isAuthenticated === true) 
        return <Redirect to='/'/>;
    return (
        <div >
                    <p  className="coolStyle" style={{marginLeft:"44%"}}>Login</p><br></br>

            <form onSubmit={login} style={{marginTop:"200px",marginBottom:"300px",marginLeft:"40%"}} className="noteRegister"><br></br><br></br>
                <label htmlFor="email">Email address</label><br></br>
                <input type="email" name="email" required ref={emailRef}/><br></br><br></br>
                <label htmlFor="password">Password</label><br></br>
                <input
                    type="password"
                    name="password"
                    autoComplete="current-password"
                    required
                    ref={passwordRef}/><br></br>
                <button style={{marginTop:"100px"}} disabled={isButtonDisabled}>Login</button>
            </form>
            <p>Don't have an account?
                <Link to="/register">Register</Link>
            </p>

        </div>
    );
}
