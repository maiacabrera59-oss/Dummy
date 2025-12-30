export function isAuth() {
  // verifica el token y si hay un usuario en el store
  const token = localStorage.getItem("token");
  return Boolean(token);
}
