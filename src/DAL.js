import axios from 'axios';

//The addresses internet with all information//

const urlUsers = 'https://jsonplaceholder.typicode.com/users';
const urlTodos = 'https://jsonplaceholder.typicode.com/todos';
const urlPosts = 'https://jsonplaceholder.typicode.com/posts';


// Gets All Users & Users by the ID //

const getAllUsers = async () => (await axios.get(urlUsers)).data;
const getUserByID = async (arr, id) => {
    const newArr = arr.filter((user) => user.id === id)
    return newArr[0]
}


// Gets All TODOS & TODO by the ID //

const getAllTodos = async () => (await axios.get(urlTodos)).data;
const getTodoByID = async (id) => (await axios.get(`${urlTodos}?userId=${id}`)).data;

// Gets All POSTS & POST by the ID //

const getAllPosts = async () => (await axios.get(urlPosts)).data;
const getPostsByID = async (id) => await axios.get(`${urlPosts}/${id}`);




export { getAllUsers, getUserByID, getAllTodos, getTodoByID, getAllPosts, getPostsByID  }
