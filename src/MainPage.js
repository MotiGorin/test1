import React, { Component } from 'react';
import User from "./User";
import AddUserComp from "./AddUserComp";
import AllTodosComp from "./AllTodosComp";
import AllPostsComp from "./AllpostsComp";
import './MainStyles.css'
import { GetAllUsers, SearchFunc, UpdateUser, AddtoArray, DeleteArray, GetAllTodos, GetAllPosts, AddUser, MarkTaskComplete } from "./Utils";



export default class MainPage extends Component {
    constructor() {
        super();
        this.state = {
            AllUsers: [],
            Search: [],
            AllTodos: [],
            AllPosts: [],
            CurrentID: "",
            SearchData: "",
            IdClickStatus: false,
            ShowNewUserData: false,
        }
    }

    // Get All URLS Data into variables,  Also duplicate theusers into Search at the Mount */
    async componentDidMount() {
        const AllUsers = await GetAllUsers();
        const AllTodos = await GetAllTodos();
        const AllPosts = await GetAllPosts();
        this.setState({ Search: AllUsers, AllUsers, AllTodos, AllPosts });
    }

    // Take the value of the textbox and filter it, then update the states //
    handleChange = async (e) => {
        const { value } = e.target;
        const AllUsers = await SearchFunc(this.state.AllUsers, value);
        this.setState({ Search: AllUsers, SearchData: value });
    }

    //When click on update will send the user object value and update it in the states  */
    updateUser = (userObj) => {
        const newUsersSearch = UpdateUser(this.state.Search, userObj);
        const newUsers = UpdateUser(this.state.AllUsers, userObj)
        this.setState({ Search: newUsersSearch, AllUsers: newUsers });
    }

    // When click on Add User will take the user object then add it to the array, and then update the states  */
    handleAddUser = async (obj) => {
        const newUsers = AddUser(this.state.AllUsers, obj)
        const Search = await SearchFunc(newUsers, this.state.SearchData);
        this.setState({ AllUsers: newUsers, Search, ShowNewUserData: false, IdClickStatus: false })
    }

    // Change the states - will show the todos&post, also update user background color //
    displayDetails = (id) => {
        this.setState({ IdClickStatus: true, CurrentID: id, ShowNewUserData: false });
    }
    //remove user//
    cancelAddUser = () => {
        this.setState({ ShowNewUserData: false, IdClickStatus: false })
    }

    // When clicking on Mark Complete button Will update the finish tasks//
    markCompleteTask = (id) => {
        const AllTodos = MarkTaskComplete(this.state.AllTodos, id);
        this.setState({ AllTodos });
    }
    // When clicking will add the new obj to the array by func//
    addTodo = (newTodo) => {
        const AllTodos = AddtoArray(this.state.AllTodos, newTodo);
        this.setState({ AllTodos })
    }
    // When clicking will add the new obj to the array by func ///
    addPost = (newPost) => {
        const AllPosts = AddtoArray(this.state.AllPosts, newPost);
        this.setState({ AllPosts })
    }


    // Delete the current array from users and Serach states. Also hide the user when delete, and then update the state//
    deleteUser = (id) => {
        const AllUsers = DeleteArray([...this.state.AllUsers], id);
        const Search = DeleteArray([...this.state.Search], id)
        if (this.state.CurrentID === id)
            this.setState({ IdClickStatus: false })
        this.setState({ AllUsers, Search })
    }

    render() {
        const allUsers = this.state.Search.map((user, index) => {
            return (<User key={index} data={user} CurrentID={this.state.CurrentID} todosArray={this.state.AllTodos} delete={this.deleteUser} update={this.updateUser} idOnClick={this.displayDetails} array={this.state.Search} />)
        })

        return (<div id="MainCompStyle">

            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="text" placeholder="Type here for Searching" onChange={this.handleChange} />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <button onClick={() => this.setState({ ShowNewUserData: true, CurrentID: "", IdClickStatus: false })}>Add New User</button>

            <div id="AllUsersStyle">
                {allUsers}
            </div>

            {/* Will show/hide by true/false */}
            {this.state.ShowNewUserData ? <AddUserComp hide={this.cancelAddUser} add={this.handleAddUser} display={this.state.ShowNewUserData} /> :
                <div style={{ width: "500px", height: "400px", position: "absolute", top: "5px", left: "400px" }}>
                    <AllTodosComp AllTodos={this.state.AllTodos} markComplete={this.markCompleteTask} userId={this.state.CurrentID} visibility={this.state.IdClickStatus} addTodo={this.addTodo} />
                    <AllPostsComp AllPosts={this.state.AllPosts} visibility={this.state.IdClickStatus} userId={this.state.CurrentID} addPost={this.addPost} />
                </div>}

        </div>)
    }
}