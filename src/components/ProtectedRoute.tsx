import { Navigate } from "react-router-dom";
import { isAuth } from "../auth/isAuth";

type Props = {
  children: React.ReactNode;
};

export function ProtectedRoute({ children }: Props) {
  // Verifico autenticación del usuario 
  if (!isAuth()) {
    return <Navigate to="/" replace />;
  }
 // Si está autenticado, renderiza la ruta protegida
  return children;
}
