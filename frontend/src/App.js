import React from 'react';
import uuid from 'uuid';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';

import './App.css';

import Contacts from './components/Contacts';
import AddContact from './components/AddContact';
import Header from './components/layout/Header';

import About from './components/Pages/About';
import NewContact from './components/Pages/NewContact';
import EditContact from './components/Pages/EditContact';

import Search from './components/layout/Search';

import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class App extends React.Component {

  state = {
    contacts: [],
    search: ""
  }
  
  // contact object example - it's a part from array of contacts, retrived from an API
  // {
  //   id: uuid.v4(),
  //   name: 'Netanel Madar',
  //   phone: '5555555555',
  //   title: 'Jr',
  //   avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
  //   completed: false
  // }

  // GET from api to state
  componentDidMount() {
    axios.get('http://localhost:8000/api/contacts/')
      .then(res => this.setState({contacts: res.data}))
  }

  

  // toggle completed
  markComplete = (id) => {
    console.log(id)
    this.setState({ contacts: this.state.contacts.map(contact => {
      if(contact.id === id){
        contact.completed = !contact.completed;
      }

      return contact;
    }) });
  }

  // delete contact
  delContact = (id) => {

    axios.delete(`http://localhost:8000/api/contacts/${id}`)
      .then(res => this.setState({ contacts: [...this.state.contacts.filter(contact => contact.id !== id)]}))
    
    
    // this.setState({ contacts: [...this.state.contacts.filter(contact => contact.id !== id)]})
  }

    // change contact
    changeContact = (id) => {

      axios.put(`http://localhost:8000/api/contacts/${id}`)
        .then(res => this.setState({ contacts: res.data }))
      
      // this.setState({ contacts: [...this.state.contacts.filter(contact => contact.id !== id)]})
    }

  // add contact
  addContact = (contact) => {
    axios.post('http://localhost:8000/api/contacts/', { 
      name: contact.name,
      phone: contact.phone,
      avatar: contact.avatar,
      title: contact.title, 
      completed: false
    })
    .then(res => this.setState({ contacts: [...this.state.contacts, res.data]}))
    // const newContact = {
    //   id: uuid.v4(),
    //   title: title,
    //   completed: false
    // }
    // this.setState({ contacts: [...this.state.contacts, newContact]})
    console.log(contact.name)
  }

  // Search contacts
  updateSearch(event) {
    this.setState({search: event.target.value});
  }

  render() {    
    let filteredContacts = this.state.contacts.filter((contact) => {
      return contact.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 || contact.phone.indexOf(this.state.search) !== -1;
    });

    let c = axios.get('http://localhost:8000/api/contacts/').then(res => res).then(function (res){ return res.data})


    return (
      <Router>
        <div className="App">
          <div className="container">            
            <Route exact path="/(|contacts)" render={props => (
              <React.Fragment>
                <div className="contact-container">
                  


                  {/* <div class="search-input">
                    <input type="text" value={this.state.search} onChange={this.updateSearch.bind(this)} placeholder="search in contacts..."/>
                    <div class="search-icon">
                      <FontAwesomeIcon icon={faSearch} />
                    </div>
                  </div> */}

                  <Search value={this.state.search} onChange={this.updateSearch.bind(this)} placeholder="search in contacts..."/>
                  
                  
                  <Contacts 
                    contacts={filteredContacts} 
                    // contacts={this.state.contacts} 
                    markComplete={this.markComplete}
                    delContact={this.delContact}
                  />
                </div>
                <AddContact addContact={this.addContact}/>
                {/* <AddContact /> */}
              </React.Fragment>
            )} />
            
            {/* <Route path="/contacts/new" component={NewContact} /> */}
            <Route path="/contacts/new" render={(props) => <NewContact {...props} addContact={this.addContact} />} />
            
            <Route path="/contact/:id" render={(props) => <EditContact 
              {...props} 
              // contact={this.state.contacts.filter((contact) => {
              //   return contact.id === props.match.params.id.substring(1,)
              // })}
              contacts={this.state.contacts}
              changeContact={this.changeContact} 
            />} />
            
            <Route path="/about" component={About} />

          </div>
        </div>
      </Router>
    );
  }
}

export default App;
