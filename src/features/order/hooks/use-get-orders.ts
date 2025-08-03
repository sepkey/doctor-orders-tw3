import { useQuery } from '@tanstack/react-query';
import { getOrders } from '../service';

export const getOrdersKey = () => ['orders'];

export function useGetOrders() {
  return useQuery({
    queryKey: getOrdersKey(),
    queryFn: getOrders,
  });
}
