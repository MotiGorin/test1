import { getAllUsers, getUserByID, getAllTodos, getAllPosts } from "./DAL"


// Gets All Users & Posts & Todos 
const GetAllUsers = () => getAllUsers();
const GetAllPosts = () => getAllPosts();
const GetAllTodos = () => getAllTodos();


// Gets The User by the ID 
const GetUserById = (id) => getUserByID(id);


// Gets All TODOS & POSTS by the ID
const GetAllTodosById = (todos, id) => {
    return todos.filter((todo) => todo.userId === id);
}

//Gets All TODOS & POSTS by the ID
const GetAllPostsById = (posts, id) => {
    return posts.filter((post) => post.userId === id);
}

const SearchFunc = (usersArray, string) => {
    return usersArray.filter((user) => (user.name.toLowerCase().includes(string.toLowerCase()) || user.email.toLowerCase().includes(string.toLowerCase())));
}
/* Find Func for getting the Address DATA by user ID */
const GetUserAddressData = (usersArray, id) => {
    const user = usersArray.find((user) => user.id === id);
    return {
        street: user.address.street,
        city: user.address.city,
        zip: user.address.zipcode
    }
}


//The function Checks if All the Tasks Are Completed return true if happened//
const CheckTodos = (id, todos) => {
    const todosUser = GetAllTodosById(todos, id);

    return todosUser.every((todo) => todo.completed);
}

// Add Obj to array //
const AddtoArray = (array, newObj) => {
    array.push(newObj)
    return array;
}
// Delete Obj from Array//
const DeleteArray = (array, id) => {
    const index = FindUserIndex(array, id);
    array.splice(index, 1);
    return array;
}

//  Add the New user(object) to the Array//
const AddUser = (array, newObj) => {
    newObj.id = array[array.length - 1].id + 1;
    return AddtoArray(array, newObj)
}

// Update User obj, finds the User index and update it //
const UpdateUser = (usersArray, newUser) => {
    const userIndex = FindUserIndex(usersArray, newUser.id);
    usersArray[userIndex] = newUser;
    return usersArray;
}
// Function that get Array and id and finds the index of the user in the array//
const FindUserIndex = (usersArray, id) => {
    return usersArray.findIndex((user) => user.id === id);
}



// Mark the Task by id as Completed //
const MarkTaskComplete = (todosArray, idTask) => {
    const todo = todosArray.findIndex((todo) => todo.id === idTask);
    todosArray[todo].completed = true;
    return todosArray;
}



export {
    GetAllUsers,
    GetAllPosts,
    GetAllTodos,
    GetUserById,
    GetAllTodosById,
    GetAllPostsById,
    SearchFunc,
    UpdateUser,
    GetUserAddressData,
    CheckTodos,
    AddUser,
    DeleteArray,
    MarkTaskComplete,
    AddtoArray
}