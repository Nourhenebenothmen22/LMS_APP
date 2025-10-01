import { create } from "zustand";
import { LoginUser,registerUser,logoutUser } from "../api/Auth";
const useAuthStore=create((set)=>({
    login: async (credentials) => {
    set({ loading: true, error: null });
    try {
      const data = await LoginUser(credentials);
      set({ user: data.user, loading: false });
      return data;
    } catch (err) {
      set({ error: err.response?.data?.message || err.message, loading: false });
      throw err;
    }
  },
  register: async (userData) => {
    set({ loading: true, error: null });
    try {
      const data = await registerUser(userData);
      set({ user: data.user, loading: false });
      return data;
    } catch (err) {
      set({ error: err.response?.data?.message || err.message, loading: false });
      throw err;
    }
  },
  logout: async () => {
    set({ loading: true, error: null });
    try {
      await logoutUser();
      set({ user: null, loading: false });
    } catch (err) {
      set({ error: err.response?.data?.message || err.message, loading: false });
      throw err;
    }
  },

  setUser: (user) => set({ user }),
}));
export default useAuthStore;

