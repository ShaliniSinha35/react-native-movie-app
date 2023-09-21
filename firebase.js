import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/storage";
import "firebase/compat/firestore";
import {GoogleAuthProvider} from "firebase/auth"




const firebaseConfig = {
    apiKey: "AIzaSyD4dh-UC5fQpg5ggB9bpTuef6SuDCfKZKU",
    authDomain: "loginpage-908b1.firebaseapp.com",
    projectId: "loginpage-908b1",
    storageBucket: "loginpage-908b1.appspot.com",
    messagingSenderId: "312413891659",
    appId: "1:312413891659:web:50ff125098e23b9e9971ce"
  };
  firebase.initializeApp(firebaseConfig);
  export const auth=firebase.auth();
  export const firestore=firebase.firestore()


 export const  provider=new GoogleAuthProvider()

  export const storage=firebase.storage()