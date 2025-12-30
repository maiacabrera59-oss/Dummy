import { Navigate } from "react-router-dom";
import { isAuth } from "../auth/isAuth";

type Props = {
  children: React.ReactNode;
};
// Componente que protege rutas según si el usuario está autenticado
export function ProtectedRoute({ children }: Props) {
  // Verifico autenticación del usuario ,si el usuario no está autenticado, redirige al login
  if (!isAuth()) {
    return <Navigate to="/" replace />;
  }
 // Si está autenticado, renderiza la ruta protegida
  return children;
}
