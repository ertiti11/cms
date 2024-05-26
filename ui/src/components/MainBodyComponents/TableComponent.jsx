import React, { useState } from 'react';
import '../../styles/MainBodyStyles/Table.css'

let tab = {
    cols: [
        { title: "id" },
        { title: "name" },
        { title: "email" },
        { title: "edad" },
    ],
    data: [
        { id: 1, name: "Usuario 1", email: "usuario1@example.com", edad: 20 },
        { id: 2, name: "Usuario 2", email: "usuario2@example.com", edad: 20 },
        { id: 3, name: "Diego", email: "diego@example.com", edad: 30 },
        { id: 4, name: "Julio", email: "julio@example.com", edad: 30 },
        { id: 5, name: "Francisco", email: "paco@example.com", edad: 40 },
        { id: 6, name: "Jose", email: "pepe@example.com", edad: 40 },
    ],
}

const TableComponent = () => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredData = tab.data.filter(row => {
        return Object.values(row).some(val =>
            String(val).toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    return (
        <div className='table'>
            <input
                type="text"
                placeholder="Buscar..."
                value={searchTerm}
                onChange={handleSearchChange}
            />
            <table className="customTable">
                <thead>
                    <tr>
                        <th><input type='checkbox'/></th>
                        {tab.cols.map((col, index) => (
                            <th key={index}>{col.title}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            <td><input type='checkbox'/></td>
                            {tab.cols.map((col, colIndex) => (
                                <td key={colIndex}>{row[col.title]}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TableComponent;
