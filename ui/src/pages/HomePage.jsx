import { login, logout } from "../api/Auth";
export default function HomePage() {
    const fetchData = async () => {
        try {
            const response = await login("adri@gmail.com", "hola123!");
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div>
            <button onClick={fetchData}>login</button>
            <button onClick={logout}>logout</button>
        </div>
    );
}
