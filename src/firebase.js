import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import {addDoc , collection, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBaAtzWHmyO8-l-JD2VhZixLIrk01lUg0g",
  authDomain: "netfix-clone-e1ed7.firebaseapp.com",
  projectId: "netfix-clone-e1ed7",
  storageBucket: "netfix-clone-e1ed7.firebasestorage.app",
  messagingSenderId: "596588198217",
  appId: "1:596588198217:web:b81ef2d1ec946acb89c298",
  measurementId: "G-MPY89HQKZS"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app)



const signUp = async (name , email , password) =>{
   try {
  const res =  await createUserWithEmailAndPassword(auth,email,password)
  const user = res.user;
  await addDoc(collection(db,"user"),{
    uid:user.uid,
    name,
    authProvider:"local",
    email
  })
    
   } catch (error) {
    console.log(error.message);
    alert(error)
   }
}

const login =  async (email,password) =>{
    try {
        signInWithEmailAndPassword(auth,email,password)
    } catch (error) {
        console.log(error.message);
        
    }
}

const logout = () =>{
    signOut(auth)
}

export {
    auth,
    db,
    login,
    signUp,
    logout
}