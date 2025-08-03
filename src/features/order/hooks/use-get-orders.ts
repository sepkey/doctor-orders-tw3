import { useSearchStore } from '@/store/search-store';
import { useQuery } from '@tanstack/react-query';
import { getOrders } from '../service';

export const getOrdersKey = () => ['orders'];

export function useGetOrders() {
  const debouncedSearch = useSearchStore((s) => s.debouncedSearch);
  return useQuery({
    queryKey: getOrdersKey(),
    queryFn: getOrders,
    select: (orders) => {
      return orders.filter((order) => order.title.includes(debouncedSearch));
    },
  });
}
