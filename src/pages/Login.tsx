import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

//  validación con Zod
const loginSchema = z.object({
  email: z.string().email("El correo electrónico no es válido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function Login() {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(data: LoginFormData) {
    setLoading(true);
    console.log("Enviando datos:", data);

    try {
      
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const fakeResponse = {
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      };

      localStorage.setItem("token", fakeResponse.token);
   
      window.location.href = "/products";
    } catch (error) {
      console.error(error);
      alert("Credenciales incorrectas");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[90vh] flex items-center justify-center bg-gray-50 px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-white p-10 border border-gray-900 shadow-xl rounded-2xl"
      >
        <h3 className="text-2xl font-bold text-center mb-8 text-gray-800">
          Bienvenid@ a Dummy
        </h3>

        {/*  Email */}
        <div className="mb-5">
          <input
            type="email"
            placeholder="Email"
            {...register("email")}
            className={`w-full border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 transition-all
            ${
              errors.email
                ? "border-red-500 focus:ring-red-100"
                : "border-gray-300 focus:ring-blue-100 focus:border-blue-400"
            }`}
          />
          {errors.email && (
            <p className="text-xs text-red-500 mt-1.5 ml-1">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div className="mb-8">
          <input
            type="password"
            placeholder="Password"
            {...register("password")}
            className={`w-full border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 transition-all
            ${
              errors.password
                ? "border-red-500 focus:ring-red-100"
                : "border-gray-300 focus:ring-blue-100 focus:border-blue-400"
            }`}
          />
          {errors.password && (
            <p className="text-xs text-red-500 mt-1.5 ml-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Botón de Acción */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gray-900 text-white py-3 rounded-lg font-semibold text-sm hover:bg-gray-950 transition-colors disabled:opacity-70 flex justify-center items-center"
        >
          {loading ? (
            <>
              <svg
                className="animate-spin h-5 w-5 mr-3 text-white"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Ingresando...
            </>
          ) : (
            "Iniciar Sesión"
          )}
        </button>
      </form>
    </div>
  );
}
