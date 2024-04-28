import { loginRequest, logoutRequest } from "./api/auth";

function App() {
  const test = loginRequest({ email: "titi@gmail.com", password: "hola123!" });
  // const test = logoutRequest();
  console.log(test);

  return (
    <div>
      hola
    </div>
  )
}

export default App
