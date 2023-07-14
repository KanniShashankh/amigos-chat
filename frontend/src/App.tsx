import  Login  from './components/Login'
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
// import { config } from 'dotenv';
// config();
// console.log(process);
firebase.initializeApp({
  // apiKey : process.env.REACT_APP_APIKEY,
  // authDomain: process.env.REACT_APP_AUTHDOMAIN,
  // projectId: process.env.REACT_APP_PROJECTID,
  // storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  // messagingSenderId: process.env.REACT_APP_MESSAGESENDERID,
  // appId: process.env.REACT_APP_APPID,
  // measurementId: process.env.REACT_APP_MEASUREMENTID,
})
const auth = firebase.auth();
const firestore = firebase.firestore();
const analytics = firebase.analytics();



function App() {
  const [user] = useAuthState(auth);
  return (
    <>
      <div className="w-screen h-screen bg-slate-900">
        <Login />
      </div>
      {user ? "Logged in" : "Logged out"}
    </>
  )
} 

export default App
