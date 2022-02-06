import React from 'react';
import '../../styles/DoneStyle.css';
import '../../styles/StickyNote.css';
import {useState} from 'react';
import firebase from 'firebase/app';

import {useEffect} from 'react';
import StickyNote from './StickyNote';
function List({taskSTATUS, userid}) {
    const [taskList,
        setTaskList] = useState([]);
    
    const getList = () => {
        const db = firebase
            .firestore()
            .collection("/Tasks");
        db.onSnapshot((elem) => {
            const dblist = [];
            elem.forEach((doc) => {
                dblist.push(doc.data());
            });
            setTaskList(dblist);
        });
    };


    
    useEffect(() => {
        getList();
    }, [""]);
    return (

        <div style={{
            marginTop: '150px'
        }}>
            <ul>
                {taskList
                    .filter(function (x) {
                        return (((x.taskstatus) == (taskSTATUS)) && ((x.userid) == (userid)))
                    })
                    .map((x) => {return(<StickyNote {...x} />)})}
            </ul>
        </div>

    )
}
export default List;