import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
const firebaseConfig = {
    apiKey: "AIzaSyDE3C0Pr5cLu4Suk2qj51EhsXTBJnjc6yA",
    authDomain: "to-do-list-7540e.firebaseapp.com",
    projectId: "to-do-list-7540e",
    storageBucket: "to-do-list-7540e.appspot.com",
    messagingSensderId: "265183623835",
    appId: "1:265183623835:web:0ab0250814a31acb90e43e"
};
firebase.initializeApp(firebaseConfig);
export default firebase
export const auth = firebase.auth();
