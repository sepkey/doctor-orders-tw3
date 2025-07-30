import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Calendar } from 'lucide-react';
import { Link } from 'react-router';
import type { Order } from '../type';

interface OrderCardProps {
  order: Order;
}

export default function OrderCard({ order }: OrderCardProps) {
  return (
    <Link to={`/${order.id}`}>
      <Card className="cursor-pointer transition-all duration-200 hover:shadow-md hover:scale-[1.02] group">
        <CardHeader className="pb-3">
          <h3 className="font-semibold text-lg  transition-colors">
            {order.title}
          </h3>
        </CardHeader>

        <CardContent>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar className="h-4 w-4" />
            <span>{new Date(order.startDate).toLocaleDateString('fa-IR')}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
