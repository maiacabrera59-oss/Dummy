import { create } from 'zustand';
{/**Es un store global de Zustand que se encarga de guardar el usuario logueado*/ }
type User = {
  id: number;
  username: string;

};

type UserStore = {
  user: User | null; // El usuario puede no existir al principio
  setUser: (user: User | null) => void; // Función para actualizar el usuario
};

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (newUser) => set({ user: newUser }), // crea store y devuelve hook reutilizable
}));