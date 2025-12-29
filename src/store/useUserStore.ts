import { create } from 'zustand';

type User = {
  id: number;
  username: string;
  // Puedes agregar más campos si la API te los da (email, image, etc.)
};

type UserStore = {
  user: User | null; // El usuario puede no existir al principio
  setUser: (user: User | null) => void; // Función para iniciar o cerrar sesión
};

export const useUserStore = create<UserStore>((set) => ({
  user: null, // Estado inicial vacío
  setUser: (newUser) => set({ user: newUser }), // Actualiza el estado con el nuevo usuario
}));