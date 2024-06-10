import { CloudArrowUp } from "phosphor-react";
import { Button, Modal, Input } from "keep-react";
import { useState } from "react";

export default function NewRecordModal({ isOpen, onClose, fields, collection }) {
    const [formData, setFormData] = useState({});
    const [fileData, setFileData] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setFileData(files[0]); // Assuming only one file is selected
        setFormData({
            ...formData,
            [name]: files[0], // This will be replaced by FormData processing
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form Data Submitted: ", formData);
        
        const formSubmission = new FormData();
        Object.keys(formData).forEach(key => {
            formSubmission.append(key, formData[key]);
        });

        try {
            const response = await fetch('http://localhost:8000/api/collections/' + collection + '/records', {
                method: 'POST',
                body: formSubmission,
            });
            
            if (response.ok) {
                console.log("Record successfully added!");
                // Aquí puedes realizar acciones adicionales después de enviar los datos
                onClose(); // Cerrar la ventana de Add Record
            } else {
                console.error("Failed to add record:", response.status);
                // Aquí puedes manejar errores en caso de que la solicitud no sea exitosa
            }
        } catch (error) {
            console.error("Error adding record:", error);
        }
    };

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <Modal.Body className="space-y-3">
                    <Modal.Icon>
                        <CloudArrowUp size={28} color="#1B4DFF" />
                    </Modal.Icon>
                    <Modal.Content>
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
