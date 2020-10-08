import React, { useState, useRef } from 'react';
import './App.css';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

firebase.initializeApp({
  apiKey: "AIzaSyCSuLRKyKntXrGnMSpaAOjMu-hfXb-JZqA",
  authDomain: "superchat-efbc9.firebaseapp.com",
  databaseURL: "https://superchat-efbc9.firebaseio.com",
  projectId: "superchat-efbc9",
  storageBucket: "superchat-efbc9.appspot.com",
  messagingSenderId: "309579726343",
  appId: "1:309579726343:web:6ef1782cae72176fa2f4a2",
  measurementId: "G-8RQ4B946T3"
});

const auth = firebase.auth();
const firestore = firebase.firestore();


function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header>
        <h1>⚛️🔥💬</h1>
        <SignOut />
      </header>

      <section>
        {user ? <ChatRoom /> : <SignIn />}
      </section>

    </div>
  );
}

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }
  
  return(
    <button onClick={signInWithGoogle}>Sign in with Google</button>
  )  
}

function SignOut() {
  return auth.currentUser && (
    <button onClick={() => auth.signOut()}>Sign Out</button>
  )
}

function ChatRoom() {
  const dummy = useRef();

  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt').limit(25);

  const [messages] = useCollectionData(query, { idField: 'id' });

  const [formValue, setFormValue] = useState('');

  const sendMessage = async(e) => {
    e.preventDefault();

    const {uid ,photoURL} = auth.currentUser;
    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(), uid, photoURL
    })
    setFormValue('');
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <>
      <div>
        { messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />) }
        <div ref={dummy}></div>
      </div>
      <form onSubmit={sendMessage}> 
        <input onChange={(e) => setFormValue(e.target.value)} value={formValue}/>
        <button type="submit">Sent</button>
      </form>
    </>
  )
}

function ChatMessage(props) {
    const { text, uid, photoURL } = props.message;
    const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';
    return(
      <div className={`message ${messageClass}`}>
        <img src={photoURL} />
        <p>{text}</p>
      </div>
    )
}

export default App;
