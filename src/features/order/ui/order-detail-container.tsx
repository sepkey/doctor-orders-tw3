import Placeholder from '@/components/placeholder';
import Spinner from '@/components/spinner';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useRef } from 'react';
import { useGetOrder } from '../hooks/use-get-order';
import OrderDetailView from './order-detail-view';

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
    <OrderDetailView
      data={data}
      contentRef={contentRef}
      onDownloadPdf={handleDownloadPdf}
    />
  );
}
