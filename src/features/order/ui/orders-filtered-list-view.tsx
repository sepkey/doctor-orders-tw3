import { ScrollArea } from '@/components/ui/scroll-area';
import type { Order } from '../type';
import OrderCard from './order-card';

type OrdersFilteredListViewProps = {
  orders: Order[];
};

export default function OrdersFilteredListView({
  orders,
}: OrdersFilteredListViewProps) {
  return (
    <ScrollArea className="h-[65vh] w-full">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {orders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </ScrollArea>
  );
}
