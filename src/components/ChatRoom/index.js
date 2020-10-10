import React, { useState, useRef } from 'react';
import './index.css';

import ChatMessage from '../ChatMessage';

import { useCollectionData } from 'react-firebase-hooks/firestore';
import firestore from '../../assets/firestore';
import firebase from '../../assets/firestore';
import auth from '../../assets/firestore';

export default function ChatRoom() {
    
    const dummy = useRef();
    const [formValue, setFormValue] = useState('');
  
    const messagesRef = firestore.collection('messages');
    const query = messagesRef.orderBy('createdAt').limit(25);
  
    const [messages] = useCollectionData(query, { idField: 'id' });
  
  
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
  