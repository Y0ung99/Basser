import { useMutation } from '@tanstack/react-query';
import { useAuthContext } from '../context/AuthContext';
import { productsPayment } from '../api/portone';

export default function usePayment() {
  const { uid } = useAuthContext();

  const payment = useMutation({
    mutationFn: async ({products, form, price}) => await productsPayment(products, form, price, uid),
  });

  return { payment }
}