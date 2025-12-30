import { useQuery } from "@tanstack/react-query";

import { getAllUsers } from "../services";
//Este hook se encarga de obtener todos los usuarios 
export function useAllUsers() {
  return useQuery({
    queryKey: ['all-users'],
    queryFn: getAllUsers, // Función que realiza la petición a la API

  });
}
