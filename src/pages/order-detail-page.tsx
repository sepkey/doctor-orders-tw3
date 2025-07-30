import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import OrderDetail from '@/features/order/ui/order-detail';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router';

export default function OrderDetailPage() {
  const navigate = useNavigate();

  return (
    <div className="container space-y-4">
      <Heading
        title="جزییات نسخه"
        element={
          <Button
            variant="outline"
            onClick={() => navigate(-1)}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
        }
      />
      <OrderDetail />
    </div>
  );
}
