import { useState, useEffect } from "react";
import { Modal, Input, Button } from "keep-react";
import axios from "axios";

export default function EditRecordModal({ isOpen, onClose, fields, collection, record, onRecordUpdated }) {
    const [formData, setFormData] = useState({});

    useEffect(() => {
        if (isOpen && record) {
            setFormData(record);
        }
    }, [isOpen, record]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setFormData({ ...formData, [name]: files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = { data: formData }; // Anidar los datos dentro de 'data'
        console.log("Submitting form data:", payload); // Agrega esta línea para depuración
        try {
            const response = await axios.patch(
                `http://localhost:8000/api/collections/${collection}/records/${record.id}`,
                payload
            );
            if (response.status === 200) {
                onRecordUpdated(); // Call the callback to fetch updated records
                onClose(); // Close the modal
            }
        } catch (error) {
            console.error("Error updating record:", error.response?.data || error.message);
        }
    };

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <Modal.Body className="space-y-3">
                    <Modal.Content>
                        <h3 className="mb-2 text-body-1 font-medium text-metal-900">Edit Record</h3>
                        <form onSubmit={handleSubmit}>
                            {fields.map((field, index) => (
                                <div key={index}>
                                    <label>{field}</label>
                                    {field === 'thumbnail' ? (
                                        <Input
                                            type="file"
                                            name={field}
                                            onChange={handleFileChange}
                                        />
                                    ) : (
                                        <Input
                                            type="text"
                                            name={field}
                                            value={formData[field] || ''}
                                            onChange={handleChange}
                                        />
                                    )}
                                </div>
                            ))}
                        </form>
                    </Modal.Content>
                    <Modal.Footer>
                        <Button
                            onClick={onClose}
                            size="sm"
                            variant="outline"
                            color="secondary"
                        >
                            Cancel
                        </Button>
                        <Button onClick={handleSubmit} size="sm" color="primary">
                            Confirm
                        </Button>
                    </Modal.Footer>
                </Modal.Body>
            </Modal>
        </>
    );
}
