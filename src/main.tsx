import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Protected from './components/Protected.tsx';
import Public from './components/public.tsx';
import Dashboard from './pages/Dashboard.tsx';
import Login from './pages/login.tsx';
import Properties from './pages/Properties.tsx';
import Room from './pages/Room.tsx';
import Rooms from './Rooms.tsx';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <Public />,
    children: [
      {
        path: "",
        element: <Login />,
      },
    ],
  },
  {
    path: "rooms",
    element: <Protected />,
    children: [
      {
        path: "",
        element: <Rooms />,
      },
      {
        path: ":id",
        children: [
          {
            path: "",
            element: <Room />,
          },
          {
            path: "dashboard",
            element: <Dashboard />,
          },
          {
            path: "properties",
            element: <Properties />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
