import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useState} from 'react';
import pin from "../../styles/pin.svg";
import ColorPicker from './ColorPicker';
import firebase from 'firebase/app';
import doc from "firebase/firestore"
function StickyNote(props) {
    const [count,
        setCount] = useState(0);
        const [TaskDescription,
            SetTaskDescription] = useState("");
        const [color, setColor] = useState('#000000');

    const hide = () => {
        setCount(count + 1);
        
    }
    const colorChange =(colorChoice,e)=>{e.preventDefault();setColor(colorChoice.hex); 
            const db = firebase.firestore()
            db
                .collection('/Tasks')
                .get()
                .then((query) => {
                    query.forEach((doc) => {
                        if (doc.id == taskid) {
                            db.collection("/Tasks").doc(doc.id).update({taskcolor:toString(color)}).then(() => {
                                console.log("ok!");
                            }).catch((error) => {
                                console.error("not ok! ", error);
                            });
                        }}
                    )
                })
            }
// const onChangeDescription = (event) => {    event.preventDefault();
//     const db = firebase.firestore()
//     db
//         .collection('/Tasks')
//         .get()
//         .then((query) => {
//             query.forEach((docs) => {
//                 if (docs.id == taskid) {SetTaskDescription(event.target.value)
//                     var db = firebase
//             .firestore()
//             .collection("/Tasks").get()

//                     .then((response)=>response.update({
//                         taskdescription: TaskDescription
//                     }))
                   
//                 }})})}
                        
                
            
    const deleteTask = (event) => {
        event.preventDefault();
        const db = firebase.firestore()
        db
            .collection('/Tasks')
            .get()
            .then((query) => {
                query.forEach((doc) => {
                    console.log({"id1": doc.id, "id2": taskid})
                    if (doc.id == taskid) 
                        db.collection("/Tasks").doc(doc.id).delete().then(() => {
                            console.log("Document successfully deleted!");
                        }).catch((error) => {
                            console.error("Error removing document: ", error);
                        });
                    }
                )
            })

    }

    let {
        taskdescription,
        assignedto,
        taskstatus,
        taskid,
        taskcolor,
        userid
    } = {
        ...props
    }

    return (
        <div className="note">
            <button
                id="grad"
                style={{
                width: '70px',
                position: 'absolute',
                indexZ: '1000',
                marginLeft: '200px',
                marginTop: '35px',
                borderRadius: '10px'
            }}
                onClick={hide}>Color</button>
            {count % 2 == 1
                ? <ColorPicker 
                // color={colorHexCode}
                // onChange={(e) => {e.preventDefault();setColorHexCode(e.target.value); 
                //     const db = firebase.firestore()
                //     db
                //         .collection('/Tasks')
                //         .get()
                //         .then((query) => {
                //             query.forEach((doc) => {
                //                 if (doc.id == taskid) {
                //                     db.collection("/Tasks").doc(doc.id).update({taskcolor:toString(colorHexCode)}).then(() => {
                //                         console.log("ok!");
                //                     }).catch((error) => {
                //                         console.error("not ok! ", error);
                //                     });
                //                 }}
                //             )
                //         })
                //     }}
                onChange={colorChange}
                        style={{
                        height: '20px',
                        width: '20px',zIndex:"-1"
                    }}/>
                : null}
            <button
                onClick={deleteTask}
                style={{
                marginLeft: '230px',
                marginTop: '-10px',
                backgroundColor: 'transparent',
                border: 'none'
            }}>
                <img src={pin}/>
            </button>
            <p
                style={{
                color: 'black',
                marginLeft: '0px',
                marginTop: '-12px',
                fontWeight: 'bold'
            }} >Task description:
            </p>
            <style>
                {
                    'body { color: black; }'
                }
</style>
           {taskdescription} 
            <br/>
            <p
                style={{
                color: 'black',
                marginLeft: '0px',
                fontWeight: 'bold'
            }}>Assigned to:
            </p>{assignedto} {/* <br/>
                <p
                    style={{
                    color: 'black',
                    marginLeft: '0px',
                    fontWeight: 'bold'
                }}>Task status:
                </p>{taskstatus}<br/> */}
        </div>
    )
}
export default StickyNote;