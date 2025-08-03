import { CheckCircle, Tally3, XCircle } from 'lucide-react';
import Filters from '../../../components/filters';
import CreateOrder from './create-order';
import OrdersFilteredListContainer from './orders-filtered-list-container';

export function Orders() {
  return (
    <div className="space-y-6 flex-col flex-1">
      <div className="flex justify-between">
        <Filters
          options={[
            { label: 'همه', value: 'all', Icon: Tally3 },
            { label: 'لغو شده', value: 'outOfOrder', Icon: XCircle },
            { label: 'فعال', value: 'duringOrder', Icon: CheckCircle },
          ]}
          paramName="orderType"
        />
        <CreateOrder />
      </div>

      <OrdersFilteredListContainer />
    </div>
  );
}
