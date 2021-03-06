import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';

import { faSync } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// import TextField from '@material-ui/core/TextField';

import axios from 'axios';


export class NewContact extends Component {
    state = {
        id: '',
        name: '',
        nameError:"",
        phone: '',
        phoneError:"",
        title: '',
        avatar: '',
        completed: false
    }

    randGender = () => {
        let r = Math.floor(Math.random() * 2);
        return r?"men":"women";
    }

    // componentWillMount(){
    //     this.setState({
    //         id: '',
    //         name: this.props.contact.name,
    //         nameError:"",
    //         phone: this.props.contact.phone,
    //         phoneError:"",
    //         title: this.props.contact.title,
    //         avatar: this.props.contact.avatar,
    //         completed: false
    //     })

    // }

    componentDidMount() {
        let GENDER = this.randGender();
        let NUMBER = Math.floor(Math.random() * 100);
        
        axios.get(`https://randomuser.me/api/portraits/${GENDER}/${NUMBER}.jpg`)
          .then(res => this.setState({avatar: res.data}));

        //   console.log(this.state)
        //   console.log(this.props.contacts)
        
          let filteredContact = this.props.contacts.filter((contact) => {
            return contact.id.toString() === this.props.match.params.id.substring(1,);
          });

        //   console.log(filteredContact)
          this.setState({
            id:filteredContact[0].id,
            name:filteredContact[0].name,
            phone:filteredContact[0].phone,
            title:filteredContact[0].title,
            avatar:filteredContact[0].avatar,
        })
        //   console.log(this.props.match.params.id.substring(1,))
    }

    getPhoto = () => {
        let GENDER = this.randGender();
        let NUMBER = Math.floor(Math.random() * 100);
        
        this.setState({avatar:`https://randomuser.me/api/portraits/${GENDER}/${NUMBER}.jpg`});
        console.log(this.state.avatar)
    }

    onChange = (e) => this.setState({ [e.target.name]: e.target.value })
    
    validate = () => {
        const phoneRegex = RegExp('/^\d{10}-\d{3}-\d{4}$/','gm'); //eslint-disable-line

        let isError = false;

        const errors = {};

        if(this.state.name.length > 30) {
            isError = true;
            errors.nameError = "Name needs to be under 30 characters";
        }
        // console.log("this.state.phone = " + this.state.phone)
        // console.log("simple regex test result = " + phoneRegex.test("052-545-7476"));
        // console.log("regex test result = " + phoneRegex.test(this.state.phone));

        if(phoneRegex.test(this.state.phone)) {
            errors.phoneError = "";
        } else {
            isError = true;
            errors.phoneError = "The phone must only contain numbers and dashes";
        }

        if(isError){
            this.setState({
                ...this.state,
                ...errors
            })
        } else {
            this.setState({
                nameError:"",
                phoneError:"",
            })
        }
        // console.log(this.state.nameError);
        // console.log(this.state.phoneError);
        // console.log(isError);
        
        return isError;
    }
    
    
    onSubmit = (e) => {
        e.preventDefault();
        // console.log(this.props.contact);
        // console.log(this.props.match.params.id.substring(1,));
        
        this.setState({ name: '', nameError:'', phone: '', phoneError:'', title: '', avatar: ''});
        
        // const err = this.validate();

        // if(!err) {
        if(true) {
            this.props.changeContact(this.state);
            this.setState({ name: '', nameError:'', phone: '', phoneError:'', title: '', avatar: ''});
            this.setState({redirect: true});
        }
        
        this.props.history.push("/");

    }

    
    
    render() {
        if (this.state.redirect) {
            return <Redirect push to="/" />;
        }
        
        return (
            <div className="contact-container">
            <div className="new-contact-container">
                <div className="new-contact-avatar">
                        {/* <img src="https://randomuser.me/api/portraits/men/81.jpg"/> */}
                        <img src={this.state.avatar} alt={this.state.name}/>
                        <button onClick={this.getPhoto}><FontAwesomeIcon icon={faSync} /></button>
                </div>
                <form onSubmit={this.onSubmit}>
                    <div className="new-contact-inputs">
                        <div className="new-contact-input">
                            <label>Name</label>
                            <input 
                                type="text" 
                                name="name" 
                                style={{flex: 10, padding: '5px'}}
                                placeholder="Add name..."
                                value={this.state.name}
                                onChange={this.onChange}
                            />
                            <div>{this.nameError}</div>
                            
                            {/* <TextField
                                name="name"
                                style={{flex: 10}}
                                hintText="Add name..."
                                value={this.state.name}
                                // value={this.props.contact.name}
                                onChange={this.onChange}
                                errorText={this.state.nameError}
                                floatingLabelFixed
                            /> */}



                        </div>
                        <div className="new-contact-input">
                            <label>Phone</label>
                            <input 
                                type="text" 
                                name="phone" 
                                style={{flex: 10, padding: '5px'}}
                                placeholder="Add phone..."
                                value={this.state.phone}
                                onChange={this.onChange}


                            />
                        </div>
                        <div className="new-contact-input">
                            <label>Title</label>
                            <input 
                                type="text" 
                                name="title" 
                                style={{flex: 10, padding: '5px'}}
                                placeholder="Add title..."
                                value={this.state.title}
                                onChange={this.onChange}
                            />
                        </div>
                    </div>
                    <div className="new-contact-buttons">
                    {/* <button type="submit" className="button-ok"><Link to="/">Save</Link></button> */}
                        <button onClick={this.onSubmit} type="submit" className="button-ok">Save</button>
                        <button className="button-cancel"><Link to="/">Cancel</Link></button>
                    </div>
                </form>
            </div>
        </div>
        )
    }
}

export default NewContact
