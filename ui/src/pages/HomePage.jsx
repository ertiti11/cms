import { useState, useEffect } from "react";

export default function HomePage() {
    const [fields, setFields] = useState(); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10
    const url = "http://localhost:8000/api/collections/testadri/records";

    const fieldsurl = "http://localhost:8000/api/collections/testadri/fields";

    // Datos del usuario

    //recoge los fields de fieldsurl

    const fetchDdata = () => {
        fetch(fieldsurl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setFields(data);
            });
    };

    useEffect(() => {
        fetchDdata();
    }, []);

    fields && console.log(fields);
    // Datos del post
    const title = "titulo del post";
    const content = "contenido del post";
    const status = "published";



    // Crear un objeto FormData para enviar datos y archivos binarios
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("status", status);
    
    // Hacer la solicitud POST con los datos y la imagen
    const fetchData = () => {
        formData.append(
            "thumbnail_file",
            document.querySelector('input[type="file"]').files[0]
        );
        fetch(url, {
            method: "POST",
            body: formData,
        })
            .then((response) => response.text())
            .then((data) => {
                console.log(data);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };


    return (
        <div>
            <h1>Home Page</h1>
                <input type="file" name="thumbnail_file"/>
                <button onClick={fetchData}>enviar</button>
        </div>
    );
}
