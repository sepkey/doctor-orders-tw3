import Placeholder from '@/components/placeholder';
import Spinner from '@/components/spinner';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { renderMetadataField } from '@/features/order/utils';
import { Calendar, DownloadIcon } from 'lucide-react';
import { useGetOrder } from '../hooks/useGetOrder';
import OrderActions from './order-actions';

export default function OrderDetail() {
  const { data, isLoading, isError, error } = useGetOrder();

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <Placeholder label={error.message} />;
  }

  if (!data?.order) {
    return <Placeholder label="چنین نسخه ای موجود نیست" />;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex justify-between">
              <div className="flex items-center gap-3">
                {data.itemToDisplay?.icon}
                <CardTitle className="text-2xl">{data.order.title}</CardTitle>
              </div>
              <div className="flex items-center gap-4">
                {data.order.type === 'duringOrder' ? (
                  <Badge className="bg-green-100 text-success">فعال</Badge>
                ) : (
                  <Badge className="bg-red-100 text-destructive">لغو شده</Badge>
                )}
                <OrderActions order={data.order} />
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="flex gap-16">
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar className="h-4 w-4" />
                <span>
                  تاریخ شروع:{' '}
                  {new Date(data.order.startDate).toLocaleDateString('fa-IR')}
                </span>
              </div>

              <div>
                <span className="text-sm font-medium text-gray-500">
                  نوع نسخه:
                </span>{' '}
                <span>{data.itemToDisplay?.label}</span>
              </div>
            </div>

            <span className="text-sm font-medium text-gray-500">
              جزئیات نسخه:
            </span>
            {Object.keys(data.order.metaData).length > 0 && (
              <div className="mt-2 space-y-4">
                {renderMetadataField('دستورالعمل:', data.metadata.instruction)}
                {renderMetadataField(
                  'دلیل قطع:',
                  data.metadata.discontinueUsingReason
                )}
              </div>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <p>فایل های ضمیمه</p>
              <Button variant="ghost" className="border border-primary">
                دانلود pdf نسخه
                <DownloadIcon />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
