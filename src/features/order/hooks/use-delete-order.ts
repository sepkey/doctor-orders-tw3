import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { deleteOrder } from '../service';
import { getOrdersKey } from './use--get-orders';

export default function useDeleteOrder() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getOrdersKey() });
      toast.success('نسخه پزشکی با موفقیت حذف شد.');
    },
    onError: (error: unknown) =>
      toast.error('حذف نسخه پزشکی با خطا مواجه شد.' + (error as Error).message),
  });
}
