import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createBrowserRouter, RouterProvider } from 'react-router';
import Toaster from './components/toaster';
import Layout from './layout/inedx';
import { Error, NotFound, OrderDetailPage, OrdersPage } from './pages';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <OrdersPage />,
      },
      {
        path: '/order/:id',
        element: <OrderDetailPage />,
      },
      { path: '*', element: <NotFound /> },
    ],
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
