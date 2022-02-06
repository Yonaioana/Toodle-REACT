import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useState} from 'react';
import {auth} from './firebase';
import firebase from 'firebase/app';
import plus from "../../styles/plus.svg";

function TaskForm() {

    const [visible,
        setOnVisible] = useState("");
    const [newTaskColor,
        setTaskColor] = useState("");
    const [newTaskDescription,
        setTaskDescription] = useState("");
    const [newAssignedTo,
        setAssignedTo] = useState("");
    const [newTaskStatus,
        setTaskStatus] = useState("");
    const visibileForm = () => {
        setOnVisible(true)
    }
    const notVisibileForm = () => {
        setOnVisible(false)
    }
    const createTask = (event) => {
        event.preventDefault();

        var db = firebase
            .firestore()
            .collection("/Tasks");

        db
            .add({
            taskid: "",
            userid: auth.currentUser.uid,
            taskcolor: newTaskColor,
            taskdescription: newTaskDescription,
            assignedto: newAssignedTo,
            taskstatus: newTaskStatus
        })
            .then((response) => {
                response.update({taskid: response.id})
            })

    }
   
    return (
        <div>

<button
                onClick={visibileForm}
                style={{
                marginLeft: '230px',
                marginTop: '-10px',
                backgroundColor: 'transparent',
                border: 'none'
            }}>
                <img src={plus}/>
            </button>
            <div>
                {visible
                    ? <form onSubmit={createTask} className="noteTaskForm">
                            <label >
                                Task description:
                            </label>
                            <br/>

                            <input
                                type="text"
                                onChange={(event) => setTaskDescription(event.target.value)}/>
                            <br/>
                            <label >
                                Assign to:
                            </label>
                            <br/>
                            <select onChange={(event) => setAssignedTo(event.target.value)}>
                                <option value="Ioana">Ioana</option>
                                <option value="Bogdan">Bogdan</option>
                                <option value="Mihai">Mihai</option>
                            </select><br/>
                            <label >
                                Task status:
                            </label><br/>
                            <select onChange={(event) => setTaskStatus(event.target.value)}>
                                <option value=""></option>

                                <option value="To do">To do</option>
                                <option value="In progress">In progress</option>
                                <option value="Done">Done</option>
                            </select>
                            <br/>

                            <button type="submit">Save</button>
                            <button onClick={notVisibileForm}>Cancel</button>
                        </form>
                    : null}
            </div>
        </div>

    )

}
export default TaskForm;