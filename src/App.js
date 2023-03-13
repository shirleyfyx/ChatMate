import React from 'react';
import './App.css';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

firebase.initializeApp({
  apiKey: "AIzaSyCXfjjROq6Ft2xjzx5PVSHr93uo1UMC-p0",
  authDomain: "chatmate-aab26.firebaseapp.com",
  projectId: "chatmate-aab26",
  storageBucket: "chatmate-aab26.appspot.com",
  messagingSenderId: "856607855518",
  appId: "1:856607855518:web:1ee36885ac9a591600fc8f",
  measurementId: "G-VKQDYQF6RN"
})

const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {

  return (
    <div className="App">
      <header className="App-header">
       
      </header>

    </div>
  );
}

export default App;
