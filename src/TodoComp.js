import React, { Component } from 'react';

export default class TodoComp extends Component {

    render() {
        return (
            <div style={{ textAlign: "left", border: "1.5px solid black", width: "350px", margin: "5px", padding: "5px" }}>
                <span style={{ fontWeight: "bold" }}> Title:&nbsp;&nbsp; </span> {this.props.todo.title}
                <div>
                    <br />
                    <span style={{ fontWeight: "bold" }}>Completed:&nbsp;&nbsp;</span>
                    {this.props.todo.completed ? <span style={{ color: "green" }}>True</span> : <span style={{ color: "red" }}>False</span>}
                    {this.props.todo.completed ? null : <button style={{ marginLeft: "100px" }} onClick={() => this.props.markComplete(this.props.todo.id)}>Mark Complete</button>}
                </div>
            </div>
        )
    }
}