import { useMutation } from '@tanstack/react-query';
import { useAuthContext } from '../context/AuthContext';
import { productsPayment } from '../api/portone';

export default function usePayment() {
  const { uid } = useAuthContext();

  const payment = useMutation({
    mutationFn: async ({products, form, price}) => {
      return await productsPayment(products, form, price, uid);
    },
    onError: (error) => alert(error)
  });

  return { payment }
}