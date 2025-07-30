import { useSearchStore } from '@/store/search-store';
import { useQuery } from '@tanstack/react-query';
import { getOrders } from '../service';
import type { OrderStatus } from '../type';

export const getOrdersKey = () => ['orders'];

export function useGetOrders(status: OrderStatus) {
  const { debouncedSearch } = useSearchStore();
  return useQuery({
    queryKey: getOrdersKey(),
    queryFn: getOrders,

    select: (orders) => {
      const searchedOrders = orders.filter((order) =>
        order.title.includes(debouncedSearch)
      );
      if (status === 'duringOrder') {
        return searchedOrders.filter((order) => order.type === 'duringOrder');
      }
      return searchedOrders.filter((order) => order.type === 'outOfOrder');
    },
  });
}
