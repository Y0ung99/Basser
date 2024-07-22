import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addOrUpdateToCart, getCart, removeFromCart } from '../api/firebase';
import { useAuthContext } from '../context/AuthContext';

export default function useCart() {
  const queryClient = useQueryClient();
  const { uid } = useAuthContext();
  const cartQuery = useQuery({
    queryKey: ['carts', uid || ''], queryFn: () => getCart(uid),
    enabled: !!uid,
  });
  const addProductToCart = useMutation({
    mutationFn: (product) => addOrUpdateToCart(product, uid),
    onSuccess: () => queryClient.invalidateQueries({
      queryKey: ['carts', uid],
    }),
    onError: (e) => alert(e), 
  });
  const removeProductFromCart = useMutation({
    mutationFn: (productId) => removeFromCart(productId, uid),
    onSuccess: () => queryClient.invalidateQueries({
      queryKey: ['carts', uid],
    }),
  });

  return {cartQuery, addProductToCart, removeProductFromCart}
}