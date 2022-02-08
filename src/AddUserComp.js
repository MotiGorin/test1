import React, { Component } from 'react';

export default class AddUserComp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
        }
    }

    // Put in the state the Name //
    handleChange = (e) => {
        const { value } = e.target
        this.setState({
            [e.target.name]: value
        })
    }

    //  To add a newUser //
    addUser = () => {
        const createNewUser = {
            id: "",
            name: this.state.name,
            email: this.state.email,
            address: {
                city: "",
                street: "",
                zipcode: ""
            }
        }
        this.props.add(createNewUser)
    }

    render() {
        return (
            <div style={{ display: this.props.display ? "block" : "none" }}>
                <div id="AddNewUserStyle">
                    <div id="TitleStyel"> Add New User </div>
                    Name: <input type="text" name="name" onChange={this.handleChange} /> <br />
                    Email: <input type="text" name="email" onChange={this.handleChange} /> <br /> <br />
                    <button onClick={() => this.props.hide()}>Cancel</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <button onClick={this.addUser}> Add </button> </div>

            </div>
        )
    }
}