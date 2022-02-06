import {useContext, useState, useRef} from 'react';
import {Redirect, Link} from 'react-router-dom';
import toast from 'react-hot-toast';
import AuthContext from '../utils/AuthContext';
import {auth} from '../components/components/firebase';
import '../styles/StickyNote.css'
import '../styles/Text.css'

function Register() {
    const [isAuthenticated,
        setAuthentication] = useContext(AuthContext);
    const [isButtonDisabled,
        setButtonState] = useState(false);
    const nameRef = useRef('');
    const emailRef = useRef('');
    const passwordRef = useRef('');

    async function signup(event) {
        event.preventDefault();
        setButtonState(true);

        const name = nameRef
            .current
            .value
            .trim();
        const email = emailRef
            .current
            .value
            .trim();
        const password = passwordRef.current.value;

        try {
            const {user} = await auth.createUserWithEmailAndPassword(email, password);
            user.updateProfile({displayName: name});
            await auth.signInWithEmailAndPassword(email, password);
            setAuthentication(true);
            toast.success('Your account has been successfully created.');
        } catch (error) {
            passwordRef.current.value = '';
            setButtonState(false);
            toast.error(error.message);
        }
    }

    if (isAuthenticated === null) 
        return null;
    if (isAuthenticated === true) 
        return <Redirect to='/'/>
    return (
        <div  >
           
                    <p  className="coolStyle" style={{marginLeft:"42%"}}>Register</p><br></br>
                    <form onSubmit={signup} style={{marginTop:"200px",marginBottom:"300px",marginLeft:"40%"}} className="noteRegister" >
                        <label htmlFor="name">Full name</label><br></br>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            maxLength="32"
                            autoComplete="name"
                            spellCheck="false"
                            autoFocus
                            required
                            ref={nameRef}/><br></br>
                        <label htmlFor="email">Email address</label><br></br>
                        <input type="email" name="email" autoComplete="email" required ref={emailRef}/><br></br>
                        <label htmlFor="password">Password</label><br></br>
                        <input
                            type="password"
                            name="password"
                            minLength="8"
                            maxLength="100"
                            autoComplete="new-password"
                            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                            required
                            ref={passwordRef}/>
                        <p style={{color:"red"}}>Password must contain at least one number,
                             one uppercase, one lowercase
                            letter and at least 8 characters</p><br></br>
                        <button disabled={isButtonDisabled}>Create account</button>
                    </form>
                    <p>Already have an account?
                        <Link to="/login">Login</Link>
                    </p>
              
        </div>
    );
}
export default Register;