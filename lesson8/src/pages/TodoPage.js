import React, { useEffect, useState } from 'react';
import TodoList from '../components/TodoList/TodoList';
import Button from '../components/button/Button';
import Modal from '../components/modal/Modal';
import Pagination from '../components/pagination/Pagination';
import axios from 'axios';


export const BASE_URL = 'http://localhost:5000/todo';

const TodoPage = () => {
    const [ show, setShow ] = useState(false);
    const handleShow = () => {
        setShow(prevState => !prevState);
    };
    const [ inputValue, setInputValue ] = useState('');
    // console.log(inputValue);
    const handleChange = (event) => {
        setInputValue(event.target.value);
    };

    const [ todoList, setTodolist ] = useState([]);
    console.log(todoList, 'todoList');
    const handleAdd = () => {
        setTodolist(prev => [ ...prev, {
            id: todoList.length === 0 ? 1 : todoList[ todoList.length - 1 ].id + 1,
            title: inputValue,
            completed: false
        } ]);
        console.log(todoList);
    };

    const handleDone = (id) => {
        // todoList.map(todo => {
        //     if (id === todo.id) {
        //         return todo.completed = !todo.completed;
        //     }
        // });
        // setTodolist([ ...todoList ]);
        const todo = todoList.find(todo => todo.id === id);
        if (todo) {
            patchTodo(id, !todo.completed);
        }
        getApi().then(todos => setTodolist(todos));
    };

    const handleDelete = (id) => {
        // setTodolist(todoList.filter(todo => todo.id !== id));
        deleteTodo(id);
    };

    const handleEdit = (todoEdit) => {
        patchTodo(todoEdit.id, todoEdit.title, true);
        // todoList.map(todo => {
        //     if (todoEdit.id === todo.id) return todo.title = todoEdit.title;
        // });
        // setTodolist([ ...todoList ]);
    };

    // useEffect(() => {
    //     console.log('useEffect');
    // },[show, todoList]);

    // const setItem = () => {
    //     localStorage.setItem('name', 'Bakyt')
    //     localStorage.setItem('todo',  JSON.stringify({
    //         id: 3,
    //         title: 'sleep',
    //         completed: false
    //     }))
    // }
    //
    // const getItem = (name) => {
    //     return localStorage.getItem(name)
    // }

    // useEffect(() => {
    //     setItem()
    //     console.log('setItem');
    //     console.log(JSON.parse(getItem('todo')));
    // }, []);

    // useEffect(() => {
    //     const myLocalStorage = JSON.parse(localStorage.getItem('todo'))
    //     if (myLocalStorage === null) {
    //         return localStorage.setItem('todo', JSON.stringify(todoList))
    //     }
    //     if (myLocalStorage !== 0) {
    //         setTodolist(myLocalStorage)
    //     }
    // }, []);
    //
    // useEffect(() => {
    //     localStorage.setItem('todo', JSON.stringify(todoList))
    // }, [todoList]);


    const [ limit, setLimit ] = useState(2);
    const [ offset, setOffset ] = useState(0);
    console.log(offset);
    const page = (offset / limit) + 1;

    const handlePrev = () => {
        setOffset(prevState => prevState - limit);
    };
    const handleNext = () => {
        setOffset(prevState => prevState + limit);
    };
    const getApi = async() => {
        const response = await fetch(`${BASE_URL}`);
        const data = await response.json();
        return data;
    };
    const deleteTodo = async(id) => {
        await axios.delete(`${BASE_URL}/${id}`);
        getApi().then(todos => setTodolist(todos));
    };
    const patchTodo = async(id, info, isTitle = false) => {
        await axios.patch(`${BASE_URL}/${id}`, {
            [ isTitle ? 'title' : 'completed' ]: info
        });
        getApi().then(todos => setTodolist(todos));
    };

    useEffect(() => {
        getApi().then(todos => setTodolist(todos));
    }, []);

    return (
        <div>
            <input type="number"
                   value={limit}
                   onChange={event => setLimit(Number(event.target.value))}
            />
            <Button title={'Open'} action={handleShow}/>
            <Pagination page={page} prev={handlePrev} next={handleNext}/>
            <TodoList
                todoList={todoList}
                handleDone={handleDone}
                handleDelete={handleDelete}
                handleEdit={handleEdit}/>
            {
                show &&
                <Modal
                    handleShow={handleShow}
                    handleChange={handleChange}
                    handleAdd={handleAdd}/>
            }
        </div>
    );
};

export default TodoPage;