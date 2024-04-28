/* eslint-disable no-unused-vars */
import { createContext, useState } from "react";
import { registerRequest, loginRequest, client } from "../api/auth";
import { useContext } from "react";
import { useEffect } from "react";
export const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe estar dentro del proveedor AuthProvider");
  }
  return context;
};

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [error, setError] = useState(null);

  const signup = async ({ username, email, password }) => {
    const data = {
      username: username,
      email: email,
      emailVisibility: true,
      password: password,
      passwordConfirm: password,
      name: username,
      passwordText: password
    };
    try {
      const response = await registerRequest(data);
      setUser(response);
      setIsRegistered(true);
    } catch (error) {
      setError(error.response.message);
    }
  };

  const sigIn = async (data) => {
    try {
      const usuario = await loginRequest(data);
      setUser(usuario);
    } catch (error) {
      setError(error.response.message);
    }
  };

  useEffect(() => {}, []);

  return (
    <AuthContext.Provider
      value={{ signup, user, error, setError, isRegistered, sigIn }}
    >
      {children}
    </AuthContext.Provider>
  );
};