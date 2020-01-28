import React, { Component } from 'react'
import propTypes from 'prop-types';

import { Link } from 'react-router-dom';

import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export class ContactItem extends Component {
    
    // getStyle = () => {
    //     return {
    //         background: '#f4f4f4',
    //         padding: '10px',
    //         borderBottom: '1px #ccc dotted',
    //         textDecoration: this.props.contact.completed ? 'line-through' : 'none'
    //     }
    // }

    randGender = () => {
        let r = Math.floor(Math.random() * 2);
        return r?"men":"women";
    }
    
    GENDER = this.randGender();
    NUMBER = Math.floor(Math.random() * 100);


    
    render() {
        
        const {id, name, phone, title, avatar} = this.props.contact;
        
        return (
            
            <div className="contact">
                <div className="contact-avatar">
                    <img src={avatar ? avatar : `https://randomuser.me/api/portraits/${this.GENDER}/${this.NUMBER}.jpg`} alt="contact"/>
                </div>
                <div className="contact-details">
                    <div className="contact-name"><Link to={`/contact/:${id}`}>{name}</Link></div>
                    <div className="contact-phone">{phone}</div>
                </div>
                <div className="contact-buttons">
                    <button><FontAwesomeIcon icon={faPhone} /></button>
                </div>
                <div onClick={this.props.delContact.bind(this, id)} className="contact-button-close">
                    <FontAwesomeIcon icon={faTimes} />
                </div>
            </div>
            
            
            
            
            
            
            
            // <div style={this.getStyle()}>
            //     <p>
            //         <input 
            //             type="checkbox" 
            //             onChange={this.props.markComplete.bind(this, id)} 
            //         /> {' '}
            //         {title}
            //         <button onClick={this.props.delContact.bind(this, id)} style={btnStyle}>X</button>
            //     </p>
            // </div>
        )
    }
}

// const itemStyle ={
//     backgroundColor:'#222'
// }

const btnStyle = {
    background: "#ff0000",
    color: "#fff",
    border:"none",
    padding:"5px 9px",
    borderRadius:"50%",
    cursor:"pointer",
    float:"right"
}



// propTypes
ContactItem.propTypes = {
    contact: propTypes.object.isRequired,
    markComplete: propTypes.func.isRequired,
    delContact: propTypes.func.isRequired
}

export default ContactItem
