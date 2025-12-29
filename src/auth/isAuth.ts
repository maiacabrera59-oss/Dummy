export function isAuth() {
  // No solo verifica el token, también podrías verificar si hay un usuario en el store
  const token = localStorage.getItem("token");
  return Boolean(token);
}
