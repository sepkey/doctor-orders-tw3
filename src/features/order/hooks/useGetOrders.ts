import { useQuery } from '@tanstack/react-query';
import { getOrders } from '../service';
import type { OrderStatus } from '../type';

export const getOrdersKey = () => ['orders'];

export function useGetOrders(status: OrderStatus) {
  return useQuery({
    queryKey: getOrdersKey(),
    queryFn: getOrders,

    select: (orders) => {
      if (status === 'duringOrder') {
        return orders.filter((order) => order.type === 'duringOrder');
      }
      return orders.filter((order) => order.type === 'outOfOrder');
    },
  });
}
