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
        if (files.length > 0) {
            setFileData(files[0]); // Assuming only one file is selected
            setFormData({
                ...formData,
                [name]: files[0],
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form Data Submitted: ", formData);

        const formSubmission = new FormData();
        const nestedData = { data: { ...formData } };

        Object.keys(nestedData.data).forEach(key => {
            formSubmission.append(`data[${key}]`, nestedData.data[key]);
        });

        try {
            const response = await fetch(`http://localhost:8000/api/collections/${collection}/records`, {
                method: 'POST',
                body: formSubmission,
            });
            
            if (response.ok) {
                console.log("Record successfully added!");
                onClose(); // Close the Add Record modal
            } else {
                console.error("Failed to add record:", response.status);
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
                        <h3 className="mb-2 text-body-1 font-medium text-metal-900">Create new Record</h3>
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
