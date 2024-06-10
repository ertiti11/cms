import { CloudArrowUp } from "phosphor-react";
import { Button, Modal, Input } from "keep-react";
import { useState } from "react";
export default function NewRecordModal({ isOpen, onClose, fields, collection }) {
    const [formData, setFormData] = useState({});
    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log("Name:", name, "Value:", value);
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
                                    <Input
                                        type="text"
                                        name={field}
                                        value={formData[field]}
                                        onChange={handleChange}
                                    />
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
