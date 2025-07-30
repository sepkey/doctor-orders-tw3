import { useState } from 'react';
import type { OrderStatus } from '../type';
import CreateOrder from './create-order';
import OrdersFilteredList from './orders-filtered-list';
import OrdersTab from './orders-tab';

export function Orders() {
  const [activeTab, setActiveTab] = useState<OrderStatus>('duringOrder');

  return (
    <div className="space-y-6 flex-col flex-1">
      <div className="flex justify-between">
        <OrdersTab active={activeTab} setActive={setActiveTab} />
        <CreateOrder />
      </div>

      <OrdersFilteredList status={activeTab} />
    </div>
  );
}
