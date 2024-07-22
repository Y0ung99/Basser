import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuthContext } from '../context/AuthContext';
import { getAllOrder, getUserOrder, orderStateChange } from '../api/firebase';

export function useOrder() {
  const queryClient = useQueryClient();
  const {user, uid } = useAuthContext();
  
  const orderQuery = useQuery({
    queryKey: ['orders', uid],
    queryFn: () => getUserOrder(uid),
    enabled: !!uid,
  });

  const ordersForAdminQuery = useQuery({
    queryKey: ['ordersForAdmin', uid],
    queryFn: () => getAllOrder(),
    enabled: user.isAdmin,
  });

  const orderStateChangeForAdmin = useMutation({
    mutationFn: ({order, status}) => orderStateChange(order, status),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['ordersForAdmin', uid]
      })
    },
  })
  return { orderQuery, ordersForAdminQuery, orderStateChangeForAdmin }
}