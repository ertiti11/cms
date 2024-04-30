import { login, logout } from "../api/Auth";
import { useEffect } from "react";
export default function HomePage() {
    
        console.log("HomePage mounted");
        const fetchData = async () => {
            try {
                const response = await login("adri@gmail.com", "hola123!");
                console.log(response);
            } catch (error) {
                console.error(error);
            }
        };
    

    return(
      <div>
        <button onClick={fetchData}>login</button>
        <button onClick={logout} >logout</button>
      </div>
    )
}
