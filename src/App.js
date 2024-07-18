import {QueryClient, QueryClientProvider } from '@tanstack/react-query'; 
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import { AuthContextProvider } from './context/AuthContext';

const client = new QueryClient()

function App() {
  return (

    <AuthContextProvider>
      
        <QueryClientProvider client={client}>
          <Header />
          <Outlet />
        </QueryClientProvider>
      
    </AuthContextProvider>

  );
}

export default App;
