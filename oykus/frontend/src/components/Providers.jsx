import RouterProvider from "@/services/router";

export default function OkpProviders({ children }) {
  return (
    <RouterProvider>
      {children}
    </RouterProvider>
  );
}
