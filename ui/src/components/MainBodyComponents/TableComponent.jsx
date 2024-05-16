
import React from 'react';

class TableComponent extends React.Component {
    render() {
        return (
            <div className='table'>
                <table className="customTable">
                    <thead>
                    <tr>
                        <th><input type='checkbox'/></th>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Edad</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td><input type='checkbox'/></td>
                        <td>1</td>
                        <td>Usuario 1</td>
                        <td>usuario1@example.com</td>
                        <td>30</td>
                    </tr>
                    <tr>
                        <td><input type='checkbox'/></td>
                        <td>2</td>
                        <td>Usuario 2</td>
                        <td>usuario2@example.com</td>
                        <td>25</td>
                    </tr>
                    <tr>
                        <td><input type='checkbox'/></td>
                        <td>3</td>
                        <td>Usuario 3</td>
                        <td>usuario3@example.com</td>
                        <td>30</td>
                    </tr>
                    <tr>
                        <td><input type='checkbox'/></td>
                        <td>4</td>
                        <td>Usuario 4</td>
                        <td>usuario4@example.com</td>
                        <td>25</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default TableComponent;