import React from 'react';
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";



const Contact = (props) => {
    const randGender = () => {
        let r = Math.floor(Math.random() * 2);
        return r?"men":"women";
    }
    
    let GENDER = randGender();
    let NUMBER = Math.floor(Math.random() * 100);
    
    return (
        <div className="contact">
            <div className="contact-avatar">
                <img src={`https://randomuser.me/api/portraits/${GENDER}/${NUMBER}.jpg`} alt="contact"/>
            </div>
            <div className="contact-details">
                <div className="contact-name">{props.name}</div>
                <div className="contact-phone">{props.phone}</div>
            </div>
            <div className="contact-buttons">
                <button><FontAwesomeIcon icon={faPhone} /></button>
            </div>
            <div className="contact-button-close">
                <FontAwesomeIcon icon={faTimes} />
            </div>
		</div>
    )
}

export default Contact;