import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUserStore } from "../store/useUserStore";
import { useNavigate } from "react-router-dom";

const loginSchema = z.object({
  username: z.string().min(3, "El usuario es requerido"),
  password: z.string().min(6, "Mínimo 6 caracteres"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function Login() {
  const [loading, setLoading] = useState(false);
  const setUser = useUserStore((state) => state.setUser);
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    try {
      const response = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: data.username,
          password: data.password,
        })
      });

      const resData = await response.json();

      if (response.ok) {
        setUser({ id: resData.id, username: resData.username });
        localStorage.setItem("token", resData.token);
        navigate("/products");
      } else {
        alert("Credenciales incorrectas (Prueba con: emilys / emilyspass)");
      }
    } catch (error) {
      alert("Error de conexión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-xl bg-white p-16 border border-gray-900 shadow-2xl rounded-3xl">
        <h3 className="text-4xl font-bold text-center mb-12">Bienvenid@ a Dummy</h3>
        <div className="mb-7">
          <input {...register("username")} placeholder="Username" className="w-full border rounded-xl px-5 py-4 border-gray-300" />
          {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>}
        </div>
        <div className="mb-10">
          <input type="password" {...register("password")} placeholder="Password" className="w-full border rounded-xl px-5 py-4 border-gray-300" />
          {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
        </div>
        <button disabled={loading} className="w-full bg-gray-900 text-white py-4 rounded-xl font-semibold hover:bg-gray-950 disabled:opacity-50">
          {loading ? "Ingresando..." : "Iniciar Sesión"}
        </button>
      </form>
    </div>
  );
}