import Heading from '@/components/heading';
import { Orders } from '@/features/order/ui/orders';

export default function OrdersPage() {
  return (
    <div className="space-y-4">
      <Heading title="نسخه های پزشکی" />
      <Orders />
    </div>
  );
}
