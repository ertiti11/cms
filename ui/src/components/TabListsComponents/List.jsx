import React, { useState, useEffect } from 'react';

// URL de la API
const API_URL = "http://127.0.0.1:8000/api/collections/all";

// Nombres de las colecciones a excluir
const EXCLUDED_COLLECTIONS = [
    "cache",
    "cache_locks",
    "categories",
    "comments",
    "failed_jobs",
    "job_batches",
    "jobs",
    "logs",
    "migrations",
    "password_reset_tokens",
    "personal_access_tokens",
    "sessions",
    "settings"
];

const List = ({ onCollectionClick }) => {
    const [collections, setCollections] = useState([]);

    // Función para obtener las colecciones desde la API
    const fetchCollections = async () => {
        try {
            const response = await fetch(API_URL);
            const data = await response.json();
            // Filtra las colecciones excluidas
            const filteredCollections = data.filter(
                collection => !EXCLUDED_COLLECTIONS.includes(collection)
            );
            setCollections(filteredCollections);
        } catch (error) {
            console.error("Error fetching collections:", error);
        }
    };

    // Llama a fetchCollections cuando el componente se monta
    useEffect(() => {
        fetchCollections();
    }, []);

    return (
        <div className='list'>
            {collections.map((collection, index) => (
                <p key={index} onClick={() => onCollectionClick(collection)}>
                    {collection}
                </p>
            ))}
        </div>
    );
};

export default List;