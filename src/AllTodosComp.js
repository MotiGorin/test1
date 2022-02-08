import React, { Component } from 'react';
import { GetAllTodosById } from "./Utils";
import TodoComp from "./TodoComp";
import AddTodoComp from "./AddTodoComp";

export default class AllTodosComp extends Component {
    constructor() {
        super();
        this.state = {
            AllTodos: [],
            userId: "",
            displayAddTodo: false,
            isAdded: false
        }
    }

    async componentDidMount() {
        const AllTodos = await GetAllTodosById(this.props.AllTodos, this.props.userId);
        this.setState({ userId: this.props.userId, AllTodos, isAdded: false, displayAddTodo: false })
    }

    // Checking if the props send is diffrent from the last//
    async componentDidUpdate() {
        if (this.state.userId !== this.props.userId || this.state.isAdded) {
            const AllTodos = await GetAllTodosById(this.props.AllTodos, this.props.userId);
            this.setState({ userId: this.props.userId, AllTodos, isAdded: false, displayAddTodo: false })

        }
    }

    // Update Display by bollean state's if user was add //
    changeDisplay = (added) => {
        if (added)
            this.setState({ isAdded: true })
        this.setState({ displayAddTodo: !this.state.displayAddTodo })
    }

    render() {

        return (<div style={{ display: this.props.visibility ? "block" : "none", position: "absolute", top: "10px" }}>
            {(this.state.displayAddTodo) ? <AddTodoComp todosArray={this.props.AllTodos} userId={this.state.userId} changeDisplay={this.changeDisplay} addTodo={this.props.addTodo} /> :
                <div>
                    <div id="TitleStyle">
                        User {this.props.userId} todos
                        <button style={{ marginLeft: "16rem", marginBottom: "3px" }} onClick={() => this.changeDisplay()}>Add</button>
                    </div>
                    <div style={{ overflow: "scroll", overflowX: "hidden", display: "flex", flexDirection: "column", alignItems: "center", border: "1px black solid", width: "400px", height: "325px" }}>
                        {this.state.AllTodos.map((todo, index) => {
                            return (<TodoComp key={index} todo={todo} markComplete={this.props.markComplete} />)
                        })}
                    </div>
                </div>
            }

        </div>)
    }
}