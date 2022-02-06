import React from 'react';
import '../../styles/DoneStyle.css';
import List from './List'
import '../../styles/Text.css';
import {auth} from './firebase';

function Done() {
    return (

       
          
            <div className="doneStyle" id="scroll">  <List taskSTATUS="Done" userid={auth.currentUser.uid}/></div>
        

    )
}
export default Done;