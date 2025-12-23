import { createBrowserRouter, ScrollRestoration } from "react-router-dom";

import { Layouts } from "./components/layouts/Layouts";
import { Home } from "./pages/Home";
import { Users } from "./pages/Users";
import { ProductDetails } from "./pages/ProductsDetails";
import { Form } from "./pages/Form";
import { Login } from "./pages/Login";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Cart } from "./pages/Cart";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <ScrollRestoration />
        <Layouts />
      </>
    ),
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: "/products",
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "/:id",
        element: <ProductDetails />,
      },
      {
        path: "/new-product",
        element:
        <ProtectedRoute>
          <Form />
          </ProtectedRoute>
        
      },
      {
        path: "/users",
        element:
        <ProtectedRoute>
           <Users />
        </ProtectedRoute> 
       
      },
      {
        path: "/cart",
        element: 
        <ProtectedRoute>
          <Cart />
        </ProtectedRoute>
        
      },
    ],
  },
]);
