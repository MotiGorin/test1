import React, { Component } from 'react';


export default class PostComp_1 extends Component {
    render() {
        return (
            <div style={{ border: "1.5px solid black", width: "350px", margin: "5px", padding: "6px" }}>

                <h4>Title:&nbsp;&nbsp;</h4>{this.props.AllPosts.title}

                <h4> Body:&nbsp;&nbsp;</h4> {this.props.AllPosts.body}
            </div>
        )
    }
}