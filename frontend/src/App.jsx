
import Login from './Pages/LoginPage'
import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useEffect, useState } from 'react';
import ChatRoom from './components/ChatRoom';

const firebaseConfig = {
  apiKey: "AIzaSyDBNJJ2Ey-tVRm0IPbgJO0d_S6yXcDowXc",
  authDomain: "amigos-chat-1.firebaseapp.com",
  projectId: "amigos-chat-1",
  storageBucket: "amigos-chat-1.appspot.com",
  messagingSenderId: "636112292833",
  appId: "1:636112292833:web:6d25743b0014944fac20a0",
  measurementId: "G-590LNKHYWX"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const provider = new GoogleAuthProvider();
const auth = getAuth();

const LogOut = () => {
  signOut(auth).then(() => {
    localStorage.clear();
  }).catch((error) => {
    console.error(error);
  });
}


function App() {
  const [user] = useAuthState(auth);
  const [userPhoto, setUserPhoto] = useState(null);
  const [name, setName] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if(user){
      setUserPhoto(user.photoURL);
      setName(user.displayName);
    }
  })
  return (
    <>{
      user ? 
      <ChatRoom />
      // <div className='bg-violet-400 h-screen w-screen'>
      //   <p className='text-center	hover:'> Hello {name} </p>
      //   <img className="w-10 h-10 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500" src={userPhoto ?? "public/default.jpeg"} alt="Bordered avatar" />
      // </div>
      :
      <Login loginWithGoogle={() =>{
        signInWithPopup(auth, provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          // const credential = GoogleAuthProvider.credentialFromResult(result);
          // const token = credential.accessToken;
          // The signed-in user info.
          const user = result.user;
          localStorage.setItem('user', JSON.stringify(user));
          // IdP data available using getAdditionalUserInfo(result)
          // ...
        }).catch((error) => {
          console.error(error);

          // Handle Errors here.
          // const errorCode = error.code;
          // const errorMessage = error.message;
          // // The email of the user's account used.
          // const email = error.customData.email;
          // // The AuthCredential type that was used.
          // const credential = GoogleAuthProvider.credentialFromError(error);
          // ...
        });
      }} /> 
    }
      
    </>
  )
}

export default App
