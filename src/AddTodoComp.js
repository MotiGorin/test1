import React, { Component } from 'react';


export default class AddTodoComp extends Component {
    constructor() {
        super();
        this.state = {
            addTitle: ""
        }
    }

    // to ADD a new Todo //
    addNewTodo = () => {
        const newTodo = {
            userId: this.props.userId,
            id: this.props.todosArray.length + 1,
            title: this.state.addTitle,
            completed: false
        }
        // Update display state//
        this.props.changeDisplay(true);
        // Add the New todo obj//
        this.props.addTodo(newTodo);
    }

    render() {
        return (<div style={{ border: "2px black solid", width: "200px", height: "200px", position: "absolute", top: "50px", borderRadius: "10px", padding: "15px" }}>
            Title:<br /><input type="text" onChange={(e) => this.setState({ addTitle: e.target.value })} /><br /><br /><br /><br /><br /><br />
            <button onClick={this.addNewTodo}>Add</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <button style={{ marginLeft: "10px", marginTop: "10px" }} onClick={() => this.props.changeDisplay(false)}>Cancel</button>
        </div>)
    }
}