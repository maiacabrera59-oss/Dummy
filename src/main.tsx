import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

import "./index.css";
import { router } from "./Routes";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}> {/* permite usar usequery/usemutation en cualquier Componente */}
      <RouterProvider router={router} /> {/* lee rutas definidas en routes */}
    </QueryClientProvider>
  </StrictMode>
);
