
import Login from './Pages/LoginPage'
import React, { useRef, useState } from 'react';
import './App.css';

import * as firebase from 'firebase/app';
import * as fstore from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import * as Flytics from 'firebase/analytics';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

const app = firebase.initializeApp({
  //gere
})

const auth = getAuth(app);
// const firestore = app.firestore();
// const analytics = Flytics;



function App() {
  const [user] = useAuthState(auth);

  return (
    <>
      <Login />
    </>
  )
}

export default App
