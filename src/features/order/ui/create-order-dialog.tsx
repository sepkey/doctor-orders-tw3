import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { CreateOrderForm } from './create-order-form';

type CreateOrderDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function CreateOrderDialog({
  open,
  onOpenChange,
}: CreateOrderDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>افزودن نسخه جدید</DialogTitle>
        </DialogHeader>
        <CreateOrderForm close={() => onOpenChange(false)} />
      </DialogContent>
    </Dialog>
  );
}
