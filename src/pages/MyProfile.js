import {useContext} from 'react';
import {Redirect} from 'react-router-dom';
import AuthContext from '../utils/AuthContext';
import ToDo from '../components/components/ToDo';
import InProgress from '../components/components/InProgress';
import Done from '../components/components/Done';
import TaskForm from '../components/components/TaskForm';
import '../styles/Board.css'
import Texts from '../components/components/texts'

export default function Dashboard() {
    const [isAuthenticated,
        setAuthentication] = useContext(AuthContext);
    if (isAuthenticated === false) 
        return <Redirect to='/'/>
    return (
        <div style={{
            backgroundColor: 'transparent'
        }}>
            <TaskForm/>
            <Texts/>
            <ToDo/>
            <InProgress/>
            <Done/>
        </div>
    );
}
