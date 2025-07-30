import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreVertical, ToggleLeft, ToggleRight, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import useDeleteOrder from '../hooks/useDeleteOrder';
import useUpdateOrderType from '../hooks/useUpdateOrderType';
import type { Order } from '../type';

type DeleteOrderProps = {
  order: Order;
};

export default function OrderActions({ order }: DeleteOrderProps) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const { mutate: deleteMutate, isPending: isDeleting } = useDeleteOrder();

  const { mutate: updateTypeMutate, isPending: isUpdating } =
    useUpdateOrderType();

  const isPending = isDeleting || isUpdating;
  const handleDelete = () => {
    deleteMutate(order.id, {
      onSuccess: () => {
        setOpen(false);
        navigate('/');
      },
    });
  };

  const handleUpdateType = () => {
    const newType = order.type === 'duringOrder' ? 'outOfOrder' : 'duringOrder';
    updateTypeMutate({ id: order.id, orderType: newType });
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" disabled={isPending}>
            <MoreVertical className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={handleUpdateType} disabled={isPending}>
            {order.type === 'duringOrder' ? (
              <>
                <span>لغو کردن نسخه</span>
                <ToggleLeft className="mr-2 h-4 w-4" />
              </>
            ) : (
              <>
                <span>فعال کردن نسخه</span>
                <ToggleRight className="mr-2 h-4 w-4" />
              </>
            )}
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <AlertDialogTrigger asChild>
            <DropdownMenuItem disabled={isPending}>
              <span>حذف</span>
              <Trash2 className="mr-2 h-4 w-4" />
            </DropdownMenuItem>
          </AlertDialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-right">
            آیا از حذف مطمئن هستید؟
          </AlertDialogTitle>
          <AlertDialogDescription className="text-right">
            این عملیات غیرقابل بازگشت است. نسخه برای همیشه حذف خواهد شد.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex gap-2">
          <AlertDialogCancel disabled={isDeleting}>لغو</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} disabled={isDeleting}>
            {isDeleting ? 'در حال حذف...' : 'ادامه'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
