import Login from "./Pages/LoginPage";
import { auth, provider } from "./config";
import ChatRoom from "./components/ChatRoom"
import { signInWithPopup, signOut } from "firebase/auth";

import { useAuthState } from "react-firebase-hooks/auth";

import { useEffect, useState } from "react";

const LogOut = () => {
  signOut(auth)
    .then(() => {
      localStorage.clear();
    })
    .catch((error) => {
      console.error(error);
    });
};

function App() {
  const [user, loading] = useAuthState(auth);
  const [userPhoto, setUserPhoto] = useState(null);
  const [name, setName] = useState(null);
  const [theme,setTheme] = useState(true)

  useEffect(() => {
    if(user){
      setUserPhoto(user.photoURL);
      setName(user.displayName);
    }
  }, [user])

  if(loading){
    return <div className="loader"></div>
  }
  return (
    <>{
      user ? 
      <ChatRoom theme={theme} setTheme={setTheme}/>
      :
      <Login loginWithGoogle={() =>{
        signInWithPopup(auth, provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          // const credential = GoogleAuthProvider.credentialFromResult(result);
          // const token = credential.accessToken;
          // The signed-in user info.
          const user = result.user;
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
