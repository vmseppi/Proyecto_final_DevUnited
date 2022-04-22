import firebase from "firebase/app"; 
import { firebaseConfig } from "./firebaseConfig";
import "firebase/firestore"
import "firebase/auth"

firebase.initializeApp(firebaseConfig);

//modulo de autenticacion
export const auth = firebase.auth();
//el proveedor de autenticacion
export const provider = new firebase.auth.GoogleAuthProvider();
//la utilidad para hacer login con el pop-up
export const loginConGoogle= ()=>auth.signInWithPopup(provider);
//la utilidad para hacer logout
export const logout=()=>auth.signOut();

export const firestore = firebase.firestore();

export default firebase