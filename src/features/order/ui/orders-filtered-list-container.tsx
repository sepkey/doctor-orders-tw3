import Placeholder from '@/components/placeholder';
import Spinner from '@/components/spinner';
import { useGetOrders } from '../hooks/use--get-orders';
import type { OrderStatus } from '../type';
import OrdersFilteredListView from './orders-filtered-list-view';

type OrdersListProps = {
  status: OrderStatus;
};

export default function OrdersFilteredListContainer({
  status,
}: OrdersListProps) {
  const { data: orders, error, isError, isLoading } = useGetOrders(status);

  if (isError) {
    return <Placeholder label={error?.message || 'خطایی رخ داده است.'} />;
  }

  if (isLoading) {
    return <Spinner />;
  }

  if (!orders || orders.length === 0) {
    return <Placeholder label=".هیچ نسخه ای وجود ندارد" />;
  }

  return <OrdersFilteredListView orders={orders} />;
}
