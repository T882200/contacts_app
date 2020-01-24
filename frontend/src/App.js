import React from 'react';
import './App.css';
import Contact from './components/Contact';
import ContactsContainer from './components/ContactsContainer';
import RandomContact from './components/RandomContact';

function App() {
  return (
    <div className="App contact-container">
      <ContactsContainer/>
      <Contact/>
      {/* <RandomContact/> */}
    </div>
  );
}

export default App;
