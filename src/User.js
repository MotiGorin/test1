import React, { Component } from 'react';
import OtherData from "./OtherData";
import './MainStyles.css'
import { CheckTodos } from "./Utils";
export default class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            id: "",
            name: "",
            email: "",
            address: {},
            CompletedStatus: false,
            display: false,
            HideOtherData: false
        }
    }

    // Every User on Mounting Gets his data 
    componentDidMount() {
        this.setState({ user: this.props.data, name: this.props.data.name, email: this.props.data.email, id: this.props.data.id })
    }

    // Every State Change The Function occures 
    componentDidUpdate() {
        const isCompleted = CheckTodos(this.state.id, this.props.todosArray); /* Returns if All the todos Completed */

        // Changing the completed state to the current 
        if (this.state.CompletedStatus !== isCompleted)
            this.setState({ CompletedStatus: isCompleted })
        //Checking if the id state is diff from the props 
        if (this.state.id !== this.props.data.id)
            this.setState({ email: this.props.data.email, name: this.props.data.name, id: this.props.data.id, backGround: false })
    }

    // Changing the states Name onChange of the inputs 
    handleChange = (e) => {
        const { name } = e.target;
        this.setState({ [name]: e.target.value });
    }

    // Calls Delete callback function with the current id 
    deleteUser = () => {
        this.props.delete(this.props.data.id);
    }

    // Update the address state if there was an update 
    updateAddress = (obj) => {
        this.setState({ address: obj })
    }

    // show When clicking on update user //
    updateUser = () => {
        const user = { ...this.state.user };
        // Updating the User Data //
        user.address = this.state.address;
        user.name = this.state.name;
        user.email = this.state.email;
        this.props.update(user);
    }

    // show Todos And Posts  //
    ChangeDisplay = () => {
        this.props.idOnClick(this.state.id);
    }

    render() {
        const borderColor = this.state.CompletedStatus ? "green" : "red";
        const backGroundColor = this.props.CurrentID === this.state.id ? "rgb(219, 167, 127)" : "white";

        return (
            <div id="UserStyle" style={{ borderColor: borderColor, backgroundColor: backGroundColor, width: '95%' }}>
                <span id="TitleStyle" onClick={this.ChangeDisplay}> ID: {this.props.data.id} </span><br />
                Name: <input type="text" name="name" value={this.state.name} onChange={this.handleChange} /><br />
                Email: <input type="text" name="email" value={this.state.email} onChange={this.handleChange} />

                <div >
                    <button onMouseOver={() => this.setState({ HideOtherData: true })} onClick={() => this.setState({ HideOtherData: false })}>Other Data</button>
                    <OtherData id={this.props.data.id} callback={this.updateAddress} hideOtherDataClass={this.state.HideOtherData ? "show" : "hide"} array={this.props.array} />
                    <button onClick={this.deleteUser} style={{ float: 'right' }}>Delete</button>
                    <button onClick={this.updateUser} style={{ float: 'right' }}>Update</button>
                </div>
            </div>
        )
    }
}