import {QueryClient, QueryClientProvider } from '@tanstack/react-query'; 
import { Outlet } from 'react-router-dom';
import Header from './components/Header';

const client = new QueryClient()

function App() {
  return (
    <>
      <QueryClientProvider client={client}>
        <Header />
        <Outlet />
      </QueryClientProvider>
    </>
  );
}

export default App;
