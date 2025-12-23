/* import { Cover } from "../components/ui/Cover"; */
import { useAllUsers } from "../hooks/useAllUsers";

export function Users() {
  const { data, isPending } = useAllUsers();

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
  const usersList = response?.users || (Array.isArray(data) ? data : []);

  return (
    <div className="min-h-screen bg-[#f9f8f3] py-20">
      <section className="max-w-7xl mx-auto px-6">
        <div className="mb-20 text-center">
          <h1 className="text-6xl font-bold text-black tracking-tight mb-2">
            Nuestra Comunidad
          </h1>
          <h4 className="text-2xl font-medium text-gray-500 tracking-tight">
            Personas que confían en nosotros
          </h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {usersList?.map((user: any) => (
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
                  {/* Ciudad */}
                  <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">
                    {user.address?.city || "Remote"}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
