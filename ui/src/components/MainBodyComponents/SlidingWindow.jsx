import React, { useState, useEffect } from 'react';
import '../../styles/MainBodyStyles/SlidingWindow.css';

const SlidingWindow = ({ isOpen, onClose, collection }) => {
    const [formData, setFormData] = useState({});
    const [formFields, setFormFields] = useState([]);

    useEffect(() => {
        const fetchFormFields = async () => {
            if (!collection) {
                console.log("No collection provided"); 
                return;
            }
            try {
                console.log(`Fetching fields for collection: ${collection}`);
                const response = await fetch(`http://localhost:8000/api/collections/${collection}/records`);
                const data = await response.json();
                console.log("Fetched data:", data);
                if (data.length > 0) {
                    const keys = Object.keys(data[0]);
                    setFormFields(keys);
                    setFormData(keys.reduce((acc, key) => ({ ...acc, [key]: '' }), {}));
                }
            } catch (error) {
                console.error("Error fetching form fields:", error);
            }
        };

        fetchFormFields();
    }, [collection]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Data Submitted: ", formData);
        // Aquí puedes enviar formData a tu API
    };

    return (
        <>
            <div className={`overlay ${isOpen ? 'visible' : ''}`} onClick={onClose}></div>
            <div className={`sliding-window ${isOpen ? 'open' : ''}`}>
                <button className="close-button" onClick={onClose}>X</button>
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
