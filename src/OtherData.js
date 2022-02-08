import React, { Component } from 'react';
import { GetUserAddressData } from "./Utils";

export default class OtherData extends Component {
    constructor() {
        super();
        this.state = {
            street: "",
            city: "",
            zip: "",
            id: "",
            checkUpdated: false,
        }
    }
    // Update users ID to get the current address //
    async componentDidUpdate() {
        if (this.state.id !== this.props.id) {
            const data = await GetUserAddressData(this.props.array, this.props.id);
            this.setState({ id: this.props.id, street: data.street, city: data.city, zip: data.zip });
        }

        // Update user obj  //
        if (this.state.checkUpdated) {
            const updatedUser = {
                street: this.state.street,
                city: this.state.city,
                zipcode: this.state.zip
            }
            this.props.callback(updatedUser);
            this.setState({ checkUpdated: false })
        }
    }

    // Update the states on input change //
    handleChange = (e) => {
        const { value } = e.target;
        this.setState({ [e.target.name]: value, checkUpdated: true })
    }

    render() {
        return (<div className={this.props.hideOtherDataClass}>

            <div>
                Street:
                <input type="text" name="street" value={this.state.street} onChange={this.handleChange} />
            </div>
            <div>
                City:
                <input type="text" name="city" value={this.state.city} onChange={this.handleChange} />
            </div>
            <div>
                Zip Code:
                <input type="text" name="zip" value={this.state.zip} onChange={this.handleChange} />
            </div>

        </div>)
    }
}