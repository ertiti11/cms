import React, { useState, useEffect } from 'react';
import '../../styles/MainBodyStyles/Table.css';
import axios from 'axios';

const TableComponent = ({ collection }) => {
    const [records, setRecords] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchTimeout, setSearchTimeout] = useState(null);
    const [fields, setFields] = useState([]);
    const EXCLUDED_KEYS = ['email_verified_at', 'remember_token', 'created_at', 'updated_at'];

    console.log("Collection in TableComponent:", collection);

    useEffect(() => {
        const fetchRecords = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/collections/${collection}/records`);
                const data = await response.json();
                setRecords(data);
                const keys = await fetch(`http://localhost:8000/api/collections/${collection}/fields`);
                const fields = await keys.json();
                // Filtrar los campos excluidos
                const filteredFields = fields.filter(field => !EXCLUDED_KEYS.includes(field));
                setFields(filteredFields);
            } catch (error) {
                console.error("Error fetching records:", error);
            }
        };
    
        fetchRecords();
    }, [collection]);

    records? console.log("Records in TableComponent:", records): console.log("No records in TableComponent");

    const handleSearchChange = (event) => {
        const newSearchTerm = event.target.value;
        setSearchTerm(newSearchTerm);

        if (searchTimeout) {
            clearTimeout(searchTimeout);
        }

        const timeout = setTimeout(() => {
            // Realizar la búsqueda después del tiempo de espera
            console.log("Realizar búsqueda con término:", newSearchTerm);
        }, 500); // Esperar 500 milisegundos antes de realizar la búsqueda

        setSearchTimeout(timeout);
    };

    const handleDelete = async (recordId) => {
        try {
            const response = await axios.delete(`http://localhost:8000/api/collections/${collection}/records/${recordId}`);
            if (response.status === 200) {
                // Actualizar el estado para eliminar el registro de la tabla
                setRecords(records.filter(record => record.id !== recordId));
            }
        } catch (error) {
            console.error('Error deleting record:', error);
        }
    };

    const filteredRecords = records.filter((record) =>
        Object.values(record).some((value) =>
            value !== null && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    if (filteredRecords.length === 0) {
        return <div>No records found.</div>;
    }



    return (
        <div className='table'>
            <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearchChange}
            />
            <table className='customTable'>
                <thead>
                    <tr>
                        {fields.map((column, index) => (
                            <th key={index}>{column}</th>
                        ))}
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {filteredRecords.map((record, rowIndex) => (
                        <tr key={rowIndex}>
                            {fields.map((column, colIndex) => (
                                <td key={colIndex}>{record[column]}</td>
                            ))}
                            <td>
                                <button className='delete' onClick={() => handleDelete(record.id)}>X</button>
                            </td>
                            <td>
                                <button className='edit' onClick={() => handleEdit(record)}>Edit</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TableComponent;
