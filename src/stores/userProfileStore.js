import { create } from "zustand";

const userProfileStore = create((set) => ({
  profile: { followers: [], following: [] },
  setProfile: (profile) => set({ profile }),
  clearProfile: () => set({ profile: { followers: [], following: [] } }),
}));

export default userProfileStore;
