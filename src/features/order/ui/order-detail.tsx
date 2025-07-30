import Placeholder from '@/components/placeholder';
import Spinner from '@/components/spinner';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { renderMetadataField } from '@/features/order/utils';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { DownloadIcon } from 'lucide-react';
import { useRef } from 'react';
import { useGetOrder } from '../hooks/useGetOrder';
import OrderActions from './order-actions';

export default function OrderDetail() {
  const { data, isLoading, isError, error } = useGetOrder();
  const contentRef = useRef(null);

  const handleDownloadPdf = async () => {
    const input = contentRef.current;
    if (input) {
      const canvas = await html2canvas(input, {
        scale: 2,
        useCORS: true,
      });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const pageHeight = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save('prescription-details.pdf');
    }
  };

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
        <Card ref={contentRef}>
          <CardHeader>
            <div className="flex justify-between">
              <div className="flex items-center gap-3">
                {data.itemToDisplay?.icon}
                <h2 className="text-xl">{data.order.title}</h2>
              </div>
              <div className="flex items-center gap-4">
                {data.order.type === 'duringOrder' ? (
                  <Badge className="bg-green-100 text-success ">فعال</Badge>
                ) : (
                  <Badge className="bg-red-100 text-destructive ">
                    لغو شده
                  </Badge>
                )}
                <OrderActions order={data.order} />
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="flex gap-16">
              <div className="flex items-center ga">
                <span className="text-sm font-medium text-gray-500">
                  تاریخ شروع:
                </span>{' '}
                <span>
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

            <div>
              <span className="text-sm font-medium text-gray-500">
                جزئیات نسخه:
              </span>
              {Object.keys(data.order.metaData).length > 0 && (
                <div className="mt-2 space-y-4">
                  {renderMetadataField(
                    'دستورالعمل:',
                    data.metadata.instruction
                  )}
                  {renderMetadataField(
                    'دلیل قطع:',
                    data.metadata.discontinueUsingReason
                  )}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <span>فایل های ضمیمه</span>
              <Button
                variant="ghost"
                className="border-2 border-primary border-dashed flex items-center"
                onClick={handleDownloadPdf}
              >
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
