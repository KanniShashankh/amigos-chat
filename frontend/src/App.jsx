
import Login from './Pages/LoginPage'
import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";

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

function App() {
  return (
    <>
      <Login />
    </>
  )
}

export default App
