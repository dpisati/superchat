import React from 'react';
import './App.css';

import { useAuthState } from 'react-firebase-hooks/auth';

import ChatRoom from './components/ChatRoom';
import SignIn from './components/SignIn';
// import SignOut from './components/SignOut';

import auth from './assets/firestore';

function App() {
  const [user] = useAuthState(auth);
  console.log(auth);
  // console.log(auth);
  return (
    <div className="App">
      <header>
        <h1>ChatApp</h1>
        {auth.currentUser ? <button onClick={() => auth.signOut()}>Sign Out</button> : ''}
        {/* <SignOut /> */}
      </header>

      <section>
        {user ? <ChatRoom /> : <SignIn />}
      </section>

    </div>
  );
}

export default App;
