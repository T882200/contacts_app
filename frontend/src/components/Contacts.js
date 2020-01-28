import React, { Component } from 'react';
import ContactItem from './ContactItem';
import propTypes from 'prop-types';

class Contacts extends Component { 
      
    
    render() {
    
    console.log(this.props.contacts)
    
    return this.props.contacts.map((contact) => (
        <ContactItem 
            key={contact.id} 
            contact={contact} 
            markComplete={this.props.markComplete}
            delContact={this.props.delContact} 
        />
    ));
  }
}

// propTypes
Contacts.propTypes = {
    contacts: propTypes.array.isRequired,
    markComplete: propTypes.func.isRequired,
    delContact: propTypes.func.isRequired
}

export default Contacts;
