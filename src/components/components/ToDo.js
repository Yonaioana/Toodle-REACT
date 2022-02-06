import React from 'react';
import '../../styles/ToDoStyle.css';
import List from './List'
import {auth} from './firebase';
import '../../styles/Text.css';

function ToDo() { 
    return (
     
 
           
           <div className="toDoBackground" id="scroll"> <List taskSTATUS="To do" userid={auth.currentUser.uid}/></div>

       
    );
}

export default ToDo;
