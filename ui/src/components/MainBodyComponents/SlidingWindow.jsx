import React, { useState, useEffect } from "react";
import "../../styles/MainBodyStyles/SlidingWindow.css";

const SlidingWindow = ({ isOpen, onClose, collection, onRecordAdded }) => {
    const [formData, setFormData] = useState({});
    const [formFields, setFormFields] = useState([]);

    const EXCLUDED_KEYS = [
        "email_verified_at",
        "remember_token",
        "created_at",
        "updated_at",
    ];

    useEffect(() => {
        const fetchFormFields = async () => {
            if (!collection) {
                console.log("No collection provided");
                return;
            }
            try {
                console.log(`Fetching fields for collection: ${collection}`);
                const response = await fetch(
                    `http://localhost:8000/api/collections/${collection}/records`
                );
                const data = await response.json();
                console.log("Fetched data:", data);

                const keys = await fetch(
                    `http://localhost:8000/api/collections/${collection}/fields`
                );
                const fields = await keys.json();
                console.log("Fetched fields:", fields);
                setFormFields(fields);

                setFormData(
                    keys.reduce((acc, key) => ({ ...acc, [key]: "" }), {})
                );
            } catch (error) {
                console.error("Error fetching form fields:", error);
            }
        };

        fetchFormFields();
    }, [collection, isOpen]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form Data Submitted: ", formData);
        
        try {
            const response = await fetch('http://localhost:8000/api/collections/' + collection + '/records', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ data: formData }),
            });
            
            if (response.ok) {
                console.log("Record successfully added!");
                // Aquí puedes realizar acciones adicionales después de enviar los datos
                onClose(); // Cerrar la ventana de Add Record
                onRecordAdded(); // Notificar al componente padre que se agregó un registro
            } else {
                console.error("Failed to add record:", response.status);
                // Aquí puedes manejar errores en caso de que la solicitud no sea exitosa
            }
        } catch (error) {
            console.error("Error adding record:", error);
        }
    };

    console.log("SlidingWindow collection:", collection);

    return (
        <>
            <div
                className={`overlay ${isOpen ? "visible" : ""}`}
                onClick={onClose}
            ></div>
            <div className={`sliding-window ${isOpen ? "open" : ""}`}>
                <button className="close-button" onClick={onClose}>
                    X
                </button>
                <form onSubmit={handleSubmit}>
                    <h2>Add new record</h2>
                    {formFields.map((field, index) => (
                        <div key={index}>
                            <label>{field}</label>
                            <input
                                type="text"
                                name={field}
                                value={formData[field]}
                                onChange={handleChange}
                            />
                        </div>
                    ))}
                    <button type="submit">Enviar</button>
                </form>
            </div>
        </>
    );
};

export default SlidingWindow;
