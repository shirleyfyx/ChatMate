import React, {useState, useRef} from 'react';
import './App.css';

import firebase from 'firebase/compat/app'; 
import 'firebase/compat/firestore';
import 'firebase/compat/auth'; 
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

  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header>
       <SignOut />
       <h1>We are ChatMates!</h1>
      </header>


      <section>
        {user ? <ChatRoom /> :<SignIn />}
      </section>
    </div>
  );
}

const SignIn = () => {

  const signInWithGoogle = () => {

    console.log("Sign in")

    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
    //Pop up window to sign in with Google.
  }

  return (
    <>
    <button className="sign-in" onClick={signInWithGoogle}>Sign in with Google</button>
    </>
  )
}

const SignOut = () => {
  return auth.currentUser && (

    <button onClick={() => auth.signOut()}>Sign Out</button>
  )
}

function ChatRoom() {

  const scroll = useRef();

  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createAt').limit(25);

  const [messages] = useCollectionData(query, {idField: 'id'});

  const [formValue, setFormValue] = useState('');

  const sendMessage = async(e) => {

    e.preventDefault();

    const { uid, photoURL } = auth.currentUser;

    await messagesRef.add({
      text: formValue,
      createAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL
    });
    //create new document in firestore.

    setFormValue('');

    scroll.current.scrollIntoView({ behavior:'smooth'});
  }

  return (
  
    <div>

      <main>
        {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}

        <div ref={scroll}>

        </div>

      </main>
      
      <form onSubmit={sendMessage}>

        <input value={formValue} onChange={(e) => setFormValue(e.target.value)}/>

        <button type="submit">🕊️</button>

      </form>
    </div>
  )
}

const ChatMessage = (props) => {
  const { text, uid, photoURL } = props.message;

  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'recieved';

  return (
    <div className = {`message ${messageClass}`}>
      <img src={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'} />
      <p>{text}</p> 
    </div>
  )
}

export default App;