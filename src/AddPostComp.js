import React, { Component } from 'react';


export default class AddPostComp extends Component {
    constructor() {
        super();
        this.state = {
            addTitle: '',
            addBody: '',
        }
    }
    //create a new post//
    AddNewPost = () => {
        const newPost = {
            userId: this.props.userId,
            id: this.props.postsArray.length + 1,
            title: this.state.addTitle,
            body: this.state.addBody
        }
        this.props.changeDisplay(true);
        this.props.addPost(newPost);
    }

    render() {
        return (<div style={{ border: "1px black solid", width: "200px", height: "200px", position: "absolute", borderRadius: "10px", padding: "15px" }}>
            <div>Title:<input type="text" onChange={(e) => this.setState({ addTitle: e.target.value })} /></div><br />
            <div>Body:<input type="text" onChange={(e) => this.setState({ addBody: e.target.value })} /></div><br /><br />
            <div>
                <button onClick={this.AddNewPost}>Add</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button style={{ marginLeft: "10px", marginTop: "10px" }} onClick={() => this.props.changeDisplay(false)}>Cancel</button>
            </div>
        </div>)
    }
}