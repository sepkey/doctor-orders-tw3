import Placeholder from '@/components/placeholder';
import Spinner from '@/components/spinner';
import { useSearchStore } from '@/store/search-store';
import { useSearchParams } from 'react-router';
import { useGetOrders } from '../hooks/use-get-orders';
import type { Order, OrderType } from '../type';
import OrdersFilteredListView from './orders-filtered-list-view';

export default function OrdersFilteredListContainer() {
  const { data: orders, error, isError, isLoading } = useGetOrders();
  const debouncedSearch = useSearchStore((s) => s.debouncedSearch);
  const [searchParams] = useSearchParams();

  const filterVal =
    (searchParams.get('orderType') as OrderType | 'all') || 'all';

  let filteredOrders: Order[] = [];

  filteredOrders =
    orders?.filter((order) => order.title.includes(debouncedSearch)) || [];

  if (filterVal === 'all') {
    filteredOrders = orders as Order[];
  }

  if (filterVal === 'duringOrder') {
    filteredOrders = orders?.filter(
      (order) => order.type === 'duringOrder'
    ) as Order[];
  }

  if (filterVal === 'outOfOrder') {
    filteredOrders = orders?.filter(
      (order) => order.type === 'outOfOrder'
    ) as Order[];
  }

  if (isError) {
    return <Placeholder label={error?.message || 'خطایی رخ داده است.'} />;
  }

  if (isLoading) {
    return <Spinner />;
  }

  if (!orders || orders.length === 0) {
    return <Placeholder label=".هیچ نسخه ای وجود ندارد" />;
  }

  return <OrdersFilteredListView orders={filteredOrders} />;
}
