import '../../styles/MainBodyStyles/Table.css';
import React, { useState, useEffect } from 'react';
import PocketBase from 'pocketbase';

let tab = {
    cols: [
        { title: "id" },
        { title: "name" },
        { title: "email" },
    ],
};

const TableComponent = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    /* useEffect(() => {
        // URL de la API que deseas consultar
        const apiUrl = 'http://localhost:8000/api/collections/users/records';

        // Función para obtener datos de la API
        const fetchData = async () => {
            try {
                const response = await fetch(apiUrl);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const result = await response.json();
                console.log(result); // Imprimir los datos obtenidos en la consola
                setData(result); // Guardar los datos obtenidos en el estado
            } catch (error) {
                console.error('Error fetching data:', error); // Imprimir el error en la consola
                setError(error.message); // Guardar el error en el estado si ocurre alguno
            } finally {
                setLoading(false); // Desactivar el estado de carga
            }
        };

        fetchData();
    }, []); */ // El array vacío [] hace que useEffect se ejecute solo una vez
    const [posts, setPosts] = useState(null);
    useEffect(() => {
        const fetchPosts = async () => {
          const pb = new PocketBase("https://esciclismomalaga.pockethost.io");
          const resultList = await pb.collection("posts").getFullList();
          setPosts(resultList.items);
          console.log(resultList);
        };
        fetchPosts();
      }, []);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredData = data.length > 0 ? data : [];
    const displayedData = filteredData.filter(row => {
        return Object.values(row).some(val =>
            String(val).toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    if (loading) {
        return <div>Cargando...</div>; // Mostrar un mensaje de carga
    }

    if (error) {
        return <div>Error: {error}</div>; // Mostrar un mensaje de error si ocurre
    }

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
                        <th><input type='checkbox' /></th>
                        {tab.cols.map((col, index) => (
                            <th key={index}>{col.title}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {displayedData.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            <td><input type='checkbox' /></td>
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
