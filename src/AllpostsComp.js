import React, { Component } from 'react';
import { GetAllPostsById } from "./Utils";
import SinglePostComp from "./PostComp_1";
import AddPostComp from "./AddPostComp";

export default class AllPostsComp extends Component {
    constructor() {
        super();
        this.state = {
            AllPosts: [],
            userId: "",
            displayAddPost: false,
            isAdded: false
        }
    }

    async componentDidMount() {
        const AllPosts = await GetAllPostsById(this.props.AllPosts, this.props.userId);
        this.setState({ userId: this.props.userId, AllPosts, isAdded: false, displayAddPost: false })
    }

    async componentDidUpdate() {
        if (this.state.userId !== this.props.userId || this.state.isAdded) {
            const AllPosts = await GetAllPostsById(this.props.AllPosts, this.props.userId);
            this.setState({ userId: this.props.userId, AllPosts, isAdded: false, displayAddPost: false })
        }
    }

    // Update Display by bollean states //
    changeDisplay = (isAdded) => {
        if (isAdded)
            this.setState({ isAdded: true })
        this.setState({ displayAddPost: !this.state.displayAddPost })
    }

    render() {
        return (<div style={{ display: this.props.visibility ? "block" : "none", position: "absolute", top: '380px' }}>

            {this.state.displayAddPost ? <AddPostComp postsArray={this.props.AllPosts} userId={this.state.userId} addPost={this.props.addPost} changeDisplay={this.changeDisplay} /> :
                <div>
                    <div id="TitleStyle">
                        User {this.props.userId} posts
                        <button style={{ marginLeft: "16rem", marginBottom: "3px" }} onClick={() => this.changeDisplay()}>Add</button>
                    </div>
                    <div style={{ textAlign: "left", overflow: "scroll", overflowX: "hidden", display: "flex", flexDirection: "column", alignItems: "center", border: "1px black solid", width: "400px", height: "300px" }}>
                        {this.state.AllPosts.map((post, index) => {
                            return (<SinglePostComp key={index} AllPosts={post} />)
                        })}
                    </div>
                </div>}
        </div>)
    }
}