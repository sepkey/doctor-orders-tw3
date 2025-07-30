import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { createOrder } from '../service';
import { getOrdersKey } from './useGetOrders';

export default function useCreateOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getOrdersKey() });
    },
    onError: (error: unknown) => {
      toast.error(
        'ایجاد نسخه پزشکی با خطا مواجه شد.' + (error as Error).message
      );
    },
  });
}
