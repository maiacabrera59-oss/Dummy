import { useState } from "react";
import { useAllUsers } from "../hooks/useAllUsers";

export function Users() {
  const { data, isPending } = useAllUsers();
  const [currentPage, setCurrentPage] = useState(1);

  const USERS_PER_PAGE = 6;

  if (isPending) {
    return (
      <section className="h-[70vh] flex flex-col justify-center items-center gap-4">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-[#607d55] rounded-full animate-spin" />
        <h2 className="text-lg font-semibold text-gray-600 tracking-wide">
          Cargando...
        </h2>
      </section>
    );
  }

  const response = data as any;
  const usersList = response?.users || [];

  const totalPages = Math.ceil(usersList.length / USERS_PER_PAGE);
  const startIndex = (currentPage - 1) * USERS_PER_PAGE;
  const currentUsers = usersList.slice(
    startIndex,
    startIndex + USERS_PER_PAGE
  );

  return (
    <div className="min-h-screen bg-[#f9f8f3] py-20">
      <section className="max-w-7xl mx-auto px-6">
        {/* TÍTULO */}
        <div className="mb-20 text-center">
          <h1 className="text-6xl font-bold text-black tracking-tight mb-2">
            Nuestra Comunidad
          </h1>
          <h4 className="text-2xl font-medium text-gray-500 tracking-tight">
            Personas que confían en nosotros
          </h4>
        </div>

        {/* CONTENEDOR GRID + FLECHAS */}
        <div className="relative">
          {/* Flecha izquierda */}
         <button
  onClick={() => setCurrentPage((p) => p - 1)}
  disabled={currentPage === 1}
  className="
    hidden md:flex
    absolute left-[-2.5rem] top-1/2 -translate-y-1/2
    bg-white shadow-xl
    w-16 h-16
    rounded-[1.5rem]
    items-center justify-center
    disabled:opacity-40
    hover:scale-105 transition
  "
>
  <span className="text-2xl text-gray-600 font-bold">‹</span>
</button>


          {/* GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {currentUsers.map((user: any) => (
              <div
                key={user.id}
                className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 group border border-gray-100 flex flex-col"
              >
                <div className="bg-[#607d55] h-40 relative flex justify-center items-end">
                  <div className="w-32 h-32 rounded-full border-4 border-white overflow-hidden translate-y-12 shadow-lg bg-gray-100">
                    <img
                      src={user.image}
                      alt={user.firstName}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                </div>

                <div className="pt-16 pb-10 px-8 text-center flex flex-col grow">
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                      {user.firstName} {user.lastName}
                    </h2>
                    <p className="text-[#607d55] font-black uppercase tracking-widest text-[10px] mt-1">
                      {user.role || "Professional"}
                    </p>
                  </div>

                  <div className="space-y-1 mb-8">
                    <p className="text-gray-500 text-sm font-medium">
                      {user.email}
                    </p>
                    <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">
                      {user.address?.city || "Remote"}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Flecha derecha */}
          <button
  onClick={() => setCurrentPage((p) => p + 1)}
  disabled={currentPage === totalPages}
  className="
    hidden md:flex
    absolute right-[-2.5rem] top-1/2 -translate-y-1/2
    bg-white shadow-xl
    w-16 h-16
    rounded-[1.5rem]
    items-center justify-center
    disabled:opacity-40
    hover:scale-105 transition
  "
>
  <span className="text-2xl text-gray-600 font-bold">›</span>
</button>

        </div>
      </section>
    </div>
  );
}
