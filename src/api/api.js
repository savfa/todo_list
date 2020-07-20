import * as axios from "axios";

const API = axios.create({
    //baseURL: "http://api.evgeniysavin.ru/api/todoList/",
    baseURL: "http://localhost:3000/api/todoList/",
    withCredentials: true,
    responseType: "json",
    mode: 'no-cors',
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
    }
});

export const authAPI = {
    login(data) {
        return API.post('/auth', data);
    },
    registration(data) {
        return API.post('/registration', data);
    },
    userIDTodoData(id) {
        return API.get(`/auth/${id}`);
    }
};

export const todoAPI = {
    addItem(user_id, data) {
        return API.post('/', {"user_id": user_id, ...data});
    },
    updateItem(id, data, user_id, parametr) {
        return API.put(`/${user_id}`, {"id_todo": id, "parametr": parametr, "data": data});
    },
    deleteItem(id_todo) {
        return API.delete(`/${id_todo}`);
    }
};

/*export const getAllTask = () => {
    return API.post('/').then(response=>response.data);
}


export const addTask = (newTask) => {
    return API.post('/', {"label" : newTask});
};*/

// export const getAuth = (name, password) => {
//     return API.post( '/auth',{"login" : name, "password" : password}).then(response=>response.data);
// };



/*

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 5) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`).then(response => {
            return response.data;
        });
    }
}*/
