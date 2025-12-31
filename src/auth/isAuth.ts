export function isAuth() {
  const token = localStorage.getItem("token");
  return Boolean(token);
}
