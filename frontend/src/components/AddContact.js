import React, { Component } from 'react'
import propTypes from 'prop-types'
import { Link } from 'react-router-dom';

import axios from 'axios';

import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { faRandom } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export class AddContact extends Component {
    state = {
        id: '',
        name: '',
        phone: '',
        title: '',
        avatar: '',
        completed: false
    }

    onChange = (e) => this.setState({ [e.target.name]: e.target.value })
    
    onSubmit = (e) => {
        e.preventDefault();
        this.props.addContact(this.state.title);
        this.setState({ title: ''})
    }

    onClick = () => {
        axios.get('https://randomuser.me/api/')
    //   .then(res => console.log(res));
      .then(res => this.setState({
        name: `${res.data.results[0].name.first} ${res.data.results[0].name.first}`,
        phone: res.data.results[0].phone,
        title: res.data.results[0].name.title,
        avatar: res.data.results[0].picture.large,
      }));
      this.props.addContact(this.state);
      this.setState({ name: '', phone: '', title: '', avatar: ''})
    }
    
    render() {
        return (
            <div className="contact-new">
				<button>
                    <Link to="/contacts/new/">
                        <FontAwesomeIcon icon={faUserPlus} style= {{ marginLeft : "15px" }} />
                    </Link>
				</button>
				<button onClick={this.onClick}>
                    <FontAwesomeIcon icon={faRandom} style= {{ marginLeft : "15px" }} />
				</button>
			</div>
            
            
            // <div>
            //     <form onSubmit={this.onSubmit} style={{display: 'flex'}}>
            //         <input 
            //             type="text" 
            //             name="title" 
            //             style={{flex: 10, padding: '5px'}}
            //             placeholder="Add contact..."
            //             value={this.state.title}
            //             onChange={this.onChange}
            //         />
            //         <input
            //             type="submit"
            //             value="Submit"
            //             className="btn"
            //             style={{flex: 1}}
            //         />
            //     </form>
            // </div>
        )
    }
}

// propTypes
AddContact.propTypes = {
    // addContact: propTypes.func.isRequired,
    // markComplete: propTypes.func.isRequired,
    // delContact: propTypes.func.isRequired
}

export default AddContact
