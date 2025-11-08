import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { Toaster } from "react-hot-toast";
import "./index.css";

import { routeTree } from "./routeTree.gen";

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      networkMode: "always",
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: true,
      retry: 1,
    },
    mutations: {
      networkMode: "always",
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />

      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={20}
        toastOptions={{
          style: {
            background: "#1f2937",
            color: "#ffffff",
            borderRadius: "8px",
            padding: "16px",
            fontSize: "14px",
          },
          success: {
            style: {
              background: "#10b981",
              color: "#ffffff",
            },
            duration: 3000,
          },
          error: {
            style: {
              background: "#ef4444",
              color: "#ffffff",
            },
            duration: 3000,
          },
        }}
      />
    </QueryClientProvider>
  </React.StrictMode>,
);
