import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { updateOrderType } from '../service';
import { Order } from '../type';
import { getOrderKey } from './use-get-order';
import { getOrdersKey } from './use-get-orders';

type Mutation = {
  id: string;
  orderType: 'duringOrder' | 'outOfOrder';
};

export default function useUpdateOrderType() {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation<Order, unknown, Mutation>({
    mutationFn: ({ id, orderType }) => updateOrderType(id, orderType),
    onSuccess: (data) => {
      toast.success(
        `وضعیت نسخه به ${data.type === 'outOfOrder' ? 'لغو شده' : 'فعال'}  تغییر یافت.`
      );
      queryClient.invalidateQueries({ queryKey: getOrdersKey() });
      queryClient.invalidateQueries({ queryKey: getOrderKey(data.id) });
    },
    onError: (error: unknown) =>
      toast.error(
        'به‌روزرسانی نسخه پزشکی با خطا مواجه شد.' + (error as Error).message
      ),
  });

  return { mutate, isPending };
}
