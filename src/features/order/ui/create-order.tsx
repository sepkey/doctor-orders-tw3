import { Plus } from 'lucide-react';
import { memo, useState } from 'react';
import { Button } from '../../../components/ui/button';
import { CreateOrderDialog } from './create-order-dialog';

function CreateOrder() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsCreateDialogOpen(true)}>
        <Plus className="h-4 w-4" />
        افزودن نسخه جدید
      </Button>
      <CreateOrderDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
      />
    </>
  );
}

export default memo(CreateOrder);
