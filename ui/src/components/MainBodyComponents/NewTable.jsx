import { Badge, Button, Table, Input, Label } from "keep-react";
import { Cube, Pencil, Trash } from "phosphor-react";
import { useState, useEffect } from "react";

import NewRecordModal from "./NewRecordModal";
import axios from "axios";

export default function NewTable({ collection }) {
    const [records, setRecords] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [formfields, setFormFields] = useState([]);
    const [searchTimeout, setSearchTimeout] = useState(null);
    const [fields, setFields] = useState([]);
    const EXCLUDED_KEYS = [
        "email_verified_at",
        "remember_token",
        "created_at",
        "updated_at",
    ];
    const handleNewRecord = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    console.log("Collection in TableComponent:", collection);

    useEffect(() => {
        const fetchRecords = async () => {
            try {
                const response = await fetch(
                    `http://localhost:8000/api/collections/${collection}/records`
                );
                const data = await response.json();
                setRecords(data);
                const keys = await fetch(
                    `http://localhost:8000/api/collections/${collection}/fields`
                );
                const fields = await keys.json();
                // Filtrar los campos excluidos
                const filteredFields = fields.filter(
                    (field) => !EXCLUDED_KEYS.includes(field)
                );
                setFields(filteredFields);
            } catch (error) {
                console.error("Error fetching records:", error);
            }
        };

        fetchRecords();
    }, [collection]);

    const filteredRecords = records.filter((record) =>
        Object.values(record).some(
            (value) =>
                value !== null &&
                value
                    .toString()
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
        )
    );

    const handleDelete = async (recordId) => {
        try {
            const response = await axios.delete(
                `http://localhost:8000/api/collections/${collection}/records/${recordId}`
            );
            if (response.status === 200) {
                // Actualizar el estado para eliminar el registro de la tabla
                setRecords(records.filter((record) => record.id !== recordId));
            }
        } catch (error) {
            console.error("Error deleting record:", error);
        }
    };

    records
        ? console.log("Records in TableComponent:", records)
        : console.log("No records in TableComponent");

    return (
        <>
        
        <NewRecordModal isOpen={isModalOpen} onClose={handleCloseModal} fields={fields} collection={collection} />
        <Table showCheckbox={true} className="w-[calc(100%-300px)] ">
            <Table.Caption>
                <div className="my-5 flex items-center justify-between px-6">
                    <div className="flex items-center gap-5">
                        <p className="text-body-1 font-semibold text-metal-600">
                            {collection}
                        </p>
                        <Badge size="sm" color="secondary">
                            {filteredRecords.length} records
                        </Badge>
                    </div>
                    <div className="flex items-center align-center gap-5">
                        <fieldset className="max-w-md space-y-1">
                            <Input
                                id="name"
                                placeholder="find records..."
                                type="text"
                            />
                        </fieldset>
                        <Button variant="outline" size="sm" onClick={handleNewRecord}>
                            <span className="pr-2">
                                <Cube size={24} />
                            </span>
                            New record
                        </Button>
                    </div>
                </div>
            </Table.Caption>
            <Table.Head>
                {fields.map((column, index) => (
                    <Table.HeadCell key={index} className="min-w-[152px]">
                        {column}
                    </Table.HeadCell>
                ))}
                <Table.HeadCell className="min-w-[152px]">
                    actions
                </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-gray-25 divide-y">
                {filteredRecords.map((record, rowIndex) => (
                    <Table.Row className="bg-white h-auto" key={rowIndex}>
                        {fields.map((field, columnIndex) => (
                            <Table.Cell key={columnIndex}>
                                {record[field]}
                            </Table.Cell>
                        ))}
                        <Table.Cell>
                            <div className="flex items-center gap-3">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    shape="circle"
                                    onClick={() => handleEdit(record)}
                                >
                                    <Pencil size={15} />
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    shape="circle"
                                    onClick={() => handleDelete(record.id)}
                                >
                                    <Trash size={15} />
                                </Button>
                            </div>
                        </Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>
        </>
    );
}
