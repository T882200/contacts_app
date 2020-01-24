import React from "react";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class RandomContact extends React.Component {
    
    state = {
        loading: true,
        person: null,
    }
    async componentDidMount(){
        const url = "https://randomuser.me/api/";
        const response = await fetch(url);
        const data = await response.json();
        this.setState((prevState, props) => ({
            loading: false,
            person: data.results[0]
        }));
        
        console.log(data.results[0]);
        
        fetch('http://localhost:8000/api/contacts/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                {
                    name: `${this.state.person.name.first} ${this.state.person.name.last}`,
                    phone: this.state.person.phone,
                    title: this.state.person.name.title,
                    avatar: this.state.person.picture.large,
                }
            )
        })
    }

    render() {
        
        if(this.state.loading || !this.state.person){
            return <div>lodaing...</div>
        }

        return (
            <div className="contact">
                <div className="contact-avatar">
                    <img src={this.state.person.picture.large} alt={this.state.person.name.first}/>
                </div>
                <div className="contact-details">
                    <div className="contact-name">{this.state.person.name.first} {this.state.person.name.last}</div>
                    <div className="contact-phone">{this.state.person.phone}</div>
                </div>
                <div className="contact-buttons">
                    <button><FontAwesomeIcon icon={faPhone} /></button>
                </div>
                <div className="contact-button-close">
                    <FontAwesomeIcon icon={faTimes} />
                </div>
		    </div>
        );
    }
}