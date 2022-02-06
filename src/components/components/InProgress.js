import React from 'react';
import '../../styles/InProgressStyle.css';
import List from './List'
import {auth} from './firebase';
import '../../styles/Text.css';

function InProgress() {
    return (
         
<div className="inProgressStyle" id="scroll">
   <List taskSTATUS="In progress" userid={auth.currentUser.uid}></List></div>
       
    )
}
export default InProgress;