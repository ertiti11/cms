
import React from 'react';

// RECIBIR DEL BACKEND LAS COLECCIONES

// Objeto de ejemplo:

let collections = [
    {
        title: "users",
    }
]

class List extends React.Component {
    render() {
        return (
            <div className='list'>
                <p>Users</p>
                <p>Products</p>
                <p>Comments</p>
                <p>Log</p>
                <p>Post</p>
                <p>Settings</p>
                <p>Category</p>
            </div>
        );
    }
}

export default List;