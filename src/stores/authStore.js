import { create } from "zustand";
import axios from "axios";

const authStore = create((set) => ({
  user: JSON.parse(localStorage.getItem("woofles-user")) || null,

  login: (user) => {
    localStorage.setItem("woofles-user", JSON.stringify(user));
    set({ user });
  },

  logout: () => {
    localStorage.removeItem("woofles-user");
    set({ user: null });
  },

  setUser: (user) => {
    localStorage.setItem("woofles-user", JSON.stringify(user));
    set({ user });
  },

  fetchUser: async (id) => {
    try {
      const res = await axios.get(`http://localhost:3000/api/user/${id}`);
      localStorage.setItem("woofles-user", JSON.stringify(res.data));
      set({ user: res.data });
    } catch (err) {
      console.error("Failed to fetch user:", err);
    }
  },
}));

export default authStore;
