import React, { useState, useEffect } from 'react';
import '../../styles/MainBodyStyles/Table.css';
import axios from 'axios';

const TableComponent = ({ collection }) => {
    const [records, setRecords] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchTimeout, setSearchTimeout] = useState(null);

    console.log("Collection in TableComponent:", collection);

    useEffect(() => {
        const fetchRecords = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/collections/${collection}/records`);
                const data = await response.json();
                setRecords(data);
            } catch (error) {
                console.error("Error fetching records:", error);
            }
        };

        fetchRecords();
    }, [collection]);

    const handleSearchChange = (event) => {
        const newSearchTerm = event.target.value;
        setSearchTerm(newSearchTerm);

        if (searchTimeout) {
            clearTimeout(searchTimeout);
        }

        const timeout = setTimeout(() => {
            // Realizar la búsqueda después del tiempo de espera
            // Aquí puedes realizar la llamada a la API con el término de búsqueda actualizado
            console.log("Realizar búsqueda con término:", newSearchTerm);
        }, 500); // Esperar 500 milisegundos antes de realizar la búsqueda

        setSearchTimeout(timeout);
    };

    const filteredRecords = records.filter((record) =>
        Object.values(record).some((value) =>
            value !== null && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
    );
   
    if (filteredRecords.length === 0) {
        return <div>No records found.</div>;
    }

    const columns = Object.keys(filteredRecords[0]);

    const handleEdit = async (record) => {
        try {
            const response = await axios.patch('/api/edit', record); // Asegúrate de reemplazar '/api/edit' con la URL de tu API
            if (response.status === 200) {
                // Aquí puedes manejar la respuesta exitosa, por ejemplo, puedes actualizar el registro en la lista de registros en el estado del componente
            }
        } catch (error) {
            console.error('Error al editar el registro:', error);
        }
    }

    const handleDelete = async (recordId) => {
        try {
            const response = await axios.post('/api/delete', { id: recordId }); // Asegúrate de reemplazar '/api/delete' con la URL de tu API
            if (response.status === 200) {
                // Aquí puedes manejar la respuesta exitosa, por ejemplo, puedes eliminar el registro de la lista de registros en el estado del componente
            }
        } catch (error) {
            console.error('Error al eliminar el registro:', error);
        }
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
                        {columns.map((column, index) => (
                            <th key={index}>{column}</th>
                        ))}
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {filteredRecords.map((record, rowIndex) => (
                        <tr key={rowIndex}>
                            {columns.map((column, colIndex) => (
                                <td key={colIndex}>{record[column]}</td>
                            ))}
                            <td>
                                <button className='delete'>X</button>
                            </td>
                            <td>
                                <button className='edit'>Edit</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TableComponent;
