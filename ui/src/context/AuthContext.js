import create from 'zustand';
import { registerRequest, loginRequest } from "../api/auth";

const useStore = create(set => ({
  user: null,
  isRegistered: false,
  error: null,
  signup: async ({ name, email, password }) => {
    const data = {
      name: name,
      email: email,
      password: password,
      password_confirmation: password,
    };
    try {
      const response = await registerRequest(data);
      set({ user: response, isRegistered: true });
    } catch (error) {
      set({ error: error.response.message });
    }
  },
  sigIn: async (data) => {
    try {
      const usuario = await loginRequest(data);
      set({ user: usuario });
    } catch (error) {
      set({ error: error.response.message });
    }
  },
  setError: (error) => set({ error }),
}));

export default useStore;