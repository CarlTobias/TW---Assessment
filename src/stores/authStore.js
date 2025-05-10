import { create } from 'zustand'

const authStore = create((set) => ({
  user: JSON.parse(localStorage.getItem("woofles-user")) || null,

  // Login
  login: (user) => {
    localStorage.setItem("woofles-user", JSON.stringify(user));
    set({ user });
  },

  // Logout
  logout: () => {
    localStorage.removeItem("woofles-user");
    set({ user: null });
  },
}));

export default authStore