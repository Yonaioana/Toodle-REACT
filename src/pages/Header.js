import {useContext} from 'react';
import {Link} from 'react-router-dom';
import toast from 'react-hot-toast';
import AuthContext from '../utils/AuthContext';
import {auth} from '../components/components/firebase';
import logout from "../styles/logout.svg";

export default function Header() {
    const [isAuthenticated,
        setAuthentication] = useContext(AuthContext);

    async function signOut() {
        await auth.signOut();
        setAuthentication(false);
        toast.success('You have successfully signed out.');
    }

    function renderButtons() {

        if (isAuthenticated === true) {
            return (
                <nav > 

                <button style={{marginLeft:"1700px", backgroundColor: 'transparent',
                border: 'none'}} onClick={signOut}>
                                <img src={logout}/>
                           
                    </button>
                </nav>
            );
        } else {
            return null;
        }
    }

    return (
        <header>
            <div>
                <Link to="/">
                    {/* <span>Authentication</span>
          <span>Example</span> */}
                </Link>
                {renderButtons()}
            </div>
        </header>
    );
}
