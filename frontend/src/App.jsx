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
  const [theme, setTheme] = useState(true);

  useEffect(() => {
    if (user) {
      setUserPhoto(user.photoURL);
      setName(user.displayName);
    }
  }, [user]);

  if (loading) {
    return <div className="loader"></div>;
  }
  return (
    <>
      {user ? (
        <ChatRoom
          theme={theme}
          logout={LogOut}
          photo={userPhoto}
          username={name}
          setTheme={setTheme}
        />
      ) : (
        <Login
          loginWithGoogle={() => {
            signInWithPopup(auth, provider)
              .then((result) => {
                const user = result.user;
              })
              .catch((error) => {
                console.error(error);
              });
          }}
        />
      )}
    </>
  );
}

export default App;
