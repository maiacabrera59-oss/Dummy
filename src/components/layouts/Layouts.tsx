import { Link, Outlet } from "react-router-dom";
import { Toaster } from "sonner";
import Cart from "../../assets/cart.svg";

export function Layouts() {
  return (
    <div className="flex flex-col min-h-screen">
      <Toaster position="top-right" richColors />

      <header className="p-8 bg-gray-900  text-2xl text-white ">
        <div className="flex justify-between">
          <Link to="/products" className=" ml-36 text-2xl font-bold pl-6  ">
            Ecommerce Dummy
          </Link>
          <nav>
            <ul className="flex items-center gap-2">
              <li>
                <Link to="/" className=" text-white text-xl font-medium p-8 ">
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/users"
                  className=" text-white text-xl font-medium p-8 "
                >
                  Usuarios
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className=" text-white text-xl font-medium p-8 "
                >
                  Productos
                </Link>
              </li>
              <li>
                <Link
                  to="/new-product"
                  className=" text-white text-xl font-medium p-8"
                >
                  Nuevo Producto
                </Link>
              </li>
              <li>
                <Link to="/cart">
                  <img
                    src={Cart}
                    alt="Carro"
                    className="w-8 h-8 invert brightness-0"
                  />
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <div className="flex-grow">
        <Outlet />
      </div>
      <footer className="bg-gray-900 flex justify-center text-xm  text-white p-10">
        © 2025 Dummy. Todos los derechos reservados.
      </footer>
    </div>
  );
}
