import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../TodoPage';
import classes from './Fetch.module.scss';
import axios from 'axios';


const Fetch = () => {
    const [ students, setStudents ] = useState([]);
    console.log(students, 'students');
    const BASE_URL = 'http://localhost:5000';
    const getApi = async(API) => {
        const response = await fetch(`${BASE_URL}/${API}`);
        const data = await response.json();
        return data;
    };

    const PostApi = async(API) => {
        const response = await fetch(`${BASE_URL}/${API}`, {
            method: 'POST',
            headers: {
                'Content-type': 'application-json'
            },
            body: JSON.stringify({
                id: students.length > 0 ? String(Number(students[ students.length - 1 ].id) + 1) : '1',
                surname: 'Акунов',
                name: 'Нурислан',
                groupId: 2
            })
        });
        await getApi('student').then(students => setStudents(students));
        console.log(response);
    };

    const getApiAxios = async(API) => {
        const response = await axios(`${BASE_URL}/${API}`);
        console.log(response.data);
    };
    const postApiAxios = async(API) => {
        try {
            const response = await axios.post(`${BASE_URL}/${API}`,
                {
                    id: students.length > 0 ? String(Number(students[ students.length - 1 ].id) + 1) : '1',
                    surname: 'Акунов',
                    name: 'Нурислан',
                    groupId: 2
                }
            );
            await getApi('student').then(students => setStudents(students));
        } catch(e) {
            console.log(e.message);
        }
    };

    const putAxios = async (id) => {
        await axios.put(`http://localhost:5000/student/${id}`, {
            surname: 'Акунов',
            name: 'Нурислан',
            groupId: 2
        })
        await getApi('student').then(students => setStudents(students));
    }
    const patchAxios = async (id) => {
        await axios.patch(`http://localhost:5000/student/${id}`, {
            name: 'Нурислан555',
        })
        await getApi('student').then(students => setStudents(students));
    }
    const deleteAxios = async (id) => {
        await axios.delete(`http://localhost:5000/student/${id}`)
        await getApi('student').then(students => setStudents(students));
    }


    useEffect(() => {
        getApi('student').then(students => setStudents(students));
        getApiAxios('student');
    }, []);

    return (
        <div>
            <button onClick={() => PostApi('student')}>send</button>
            <button onClick={() => postApiAxios('student')}>postApiAxios</button>
            {
                students.map(student => <div className={classes.student}>
                    <p>id: {student.id}</p>
                    <p>name: {student.name}</p>
                    <p>surname: {student.surname}</p>
                    <button onClick={()=>putAxios(student.id)}>put</button>
                    <button onClick={()=>patchAxios(student.id)}>patchAxios</button>
                    <button onClick={()=>deleteAxios(student.id)}>deleteAxios</button>
                </div>)
            }
        </div>
    );
};

export default Fetch;