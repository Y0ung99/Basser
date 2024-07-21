import { useQuery } from '@tanstack/react-query';
import { useAuthContext } from '../context/AuthContext';
import { getUserOrder } from '../api/firebase';

export function useOrder() {
  const { uid } = useAuthContext();
  const orderQuery = useQuery({
    queryKey: ['orders', `${uid}`],
    queryFn: () => getUserOrder(uid),
    enabled: !!uid,
  })

  return { orderQuery }
}