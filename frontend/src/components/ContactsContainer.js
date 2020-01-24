import React from 'react';
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Contact from "./Contact";

export default class ContactsContainer extends React.Component {

    state = {
        contacts: []
    }

    async componentDidMount(){
        const url = "http://localhost:8000/api/contacts/";
        const response = await fetch(url);
        const data = await response.json();
        this.setState((prevState, props) => ({
            contacts: data
        }));
        
        console.log(this.state.contacts);
        
    }

    async renderContacts() {
        await this.state.contacts.map(contact => {
            return <Contact key={contact.id} name={contact.name} phone={contact.phone} title={contact.title} avatar={contact.avatar}/>
        });
        console.log(this.state.contacts);
    }
    
    render() {
        return <div></div>
    }
    // render() {
    //     return this.state.contacts.map(contact => {
    //         return <Contact key={contact.id} name={contact.name} phone={contact.phone} title={contact.title} avatar={contact.avatar}/>
    //     });
    // }

}
