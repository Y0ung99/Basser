import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { readProductData, writeProductData } from '../api/firebase';

export default function useProducts() {
  const queryClient = useQueryClient();
  const productsQuery = useQuery({
    queryKey: ['products'], queryFn: readProductData, staleTime: 1000 * 60,
  });
  const addProduct = useMutation({
    mutationFn: ({product, cld}) => writeProductData(product, cld),
    onSuccess: () => queryClient.invalidateQueries(['products']),
  });

  return {productsQuery, addProduct};
}