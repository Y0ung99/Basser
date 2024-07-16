import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFound from './pages/NotFound';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import ProductAdd from './pages/ProductAdd';
import Home from './pages/Home';
import ProtectedRoute from './pages/ProtectedRoute';
import ProductAll from './pages/ProductAll';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        path: '/',
        element: <Home />
      },
      {
        path: '/products',
        element: <ProductAll />
      },
      {
        path: '/products/add',
        element: (
          <ProtectedRoute requireAdmin={true}>
            <ProductAdd />
          </ProtectedRoute>
        )
      },
      {
        path: '/products/:productId',
        element: <ProductDetail />
      },
      {
        path: '/cart',
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        )
      },
    ]
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
