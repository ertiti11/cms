const API_URL = "http://localhost:8000";

export const loginRequest = async ({ email, password }) => {
    console.log({ email, password })
    fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    })
        .then((response) => {
            // Imprimir todas las cabeceras
            for (let [key, value] of response.headers) {
                console.log(`${key} = ${value}`);
            }

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text().then((text) => {
                return text ? JSON.parse(text) : {}
            })
        })
        .then((data) => {
            console.log(data);
        })
        .catch((error) => {
            console.error("Error:", error);
        });
};

export const logoutRequest = async () => {
    fetch(`${API_URL}/logout`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text().then((text) => {
                return text ? JSON.parse(text) : {}
            })
        })
        .then((data) => {
            console.log(data);
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}




// export const loginRequest = async ({ email, password }) => {
//   return await client.collection("users").authWithPassword(email, password);
// };

// export const registerRequest = async (user) => {
//     const newUser = await client.collection("users").create(user);
//     if (newUser) {
//         console.log("newUser", newUser);
//         return loginRequest({ email: user.email, password: user.password });
//     }
// };

// // (optional) send an email verification request
// // await client.collection("users").requestVerification("test@example.com");

// export const createQuest = async (quest) => {
//     return await client.collection("encuesta").create(quest);
// };

// export const getData = async () => {
//     let respuestas = [];
//     try {
//         const A = await client
//             .collection("encuesta")
//             .getFullList(
//                 { fields: "respuesta", filter: 'respuesta = "A"' },
//                 { requestKey: null }
//             );
//         respuestas.push(A.length);
//     } catch (e) {
//         console.log("A" + e);
//     }

//     try {
//         const B = await client
//             .collection("encuesta")
//             .getFullList(
//                 { fields: "respueta", filter: 'respuesta = "B"' },
//                 { requestKey: null }
//             );
//         respuestas.push(B.length);
//     } catch (e) {
//         console.log("B" + e);
//     }

//     const getVotes = await client
//         .collection("encuesta")
//         .getFullList({ fields: "respuesta" }, { requestKey: null });

//     const data = {
//         votes: getVotes.length,
//         respuestas: respuestas,
//     };
//     return data;
// };
