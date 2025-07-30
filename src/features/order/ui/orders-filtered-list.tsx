import Placeholder from '@/components/placeholder';
import Spinner from '@/components/spinner';
import { useGetOrders } from '../hooks/useGetOrders';
import type { OrderStatus } from '../type';
import OrderCard from './order-card';

type OrdersListProps = {
  status: OrderStatus;
};

export default function OrdersFilteredList({ status }: OrdersListProps) {
  const {
    data: currentOrders,
    error,
    isError,
    isLoading,
  } = useGetOrders(status);

  if (isError) {
    return <Placeholder label={error.message} />;
  }

  if (isLoading) {
    return <Spinner />;
  }

  if (!currentOrders || currentOrders.length === 0) {
    return <Placeholder label="هیچ نسخه ای وجود ندارد" />;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {currentOrders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </div>
  );
}
