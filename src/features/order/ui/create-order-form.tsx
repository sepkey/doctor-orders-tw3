import { Button } from '@/components/ui/button';
import { DialogFooter } from '@/components/ui/dialog';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as z from 'zod';
import useCreateOrder from '../hooks/useCreateOrder';
import type { Order } from '../type';
import { createMetaData } from '../utils';

const formSchema = z.object({
  title: z.string().min(1, 'عنوان نسخه الزامی است.'),
  type: z.enum(['duringOrder', 'outOfOrder']),
  startDate: z.string().min(1, 'تاریخ شروع الزامی است.'),
  commandType: z.enum(['DRUGS', 'LAB_TEST', 'RADIOLOGY']),
  instruction: z.string().optional(),
  discontinueUsingReason: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

type CreateOrderFormProps = {
  close: () => void;
};

export function CreateOrderForm({ close }: CreateOrderFormProps) {
  const { mutate, isPending } = useCreateOrder();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      type: 'duringOrder',
      startDate: '',
      commandType: 'DRUGS',
      instruction: '',
      discontinueUsingReason: '',
    },
  });

  const onSubmit = async (data: FormData) => {
    const orderData: Partial<Order> = {
      title: data.title,
      type: data.type,
      startDate: data.startDate,
      commandType: data.commandType,
      metaData: createMetaData(data.instruction, data.discontinueUsingReason),
    };
    console.log(orderData, 'order data');
    mutate(orderData, {
      onSuccess: () => {
        form.reset();
        toast.success('نسخه پزشکی با موفقیت ایجاد شد.');
        setTimeout(() => {
          close();
        }, 1500);
      },
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>عنوان نسخه</FormLabel>
              <FormControl>
                <Input placeholder="عنوان نسخه را وارد کنید" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>وضعیت نسخه</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="duringOrder">در حال اجرا</SelectItem>
                    <SelectItem value="outOfOrder">لغو شده</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="commandType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>نوع نسخه</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="نوع نسخه را انتخاب کنید" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="DRUGS">دارویی</SelectItem>
                    <SelectItem value="LAB_TEST">آزمایشگاهی</SelectItem>
                    <SelectItem value="RADIOLOGY">رادیولوژی</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="startDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>تاریخ شروع</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="instruction"
          render={({ field }) => (
            <FormItem>
              <FormLabel>دستورالعمل (اختیاری)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="هر گونه دستورالعملی وارد کنید..."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="discontinueUsingReason"
          render={({ field }) => (
            <FormItem>
              <FormLabel>دلیل قطع مصرف (اختیاری)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="هر گونه دلیلی برای قطع مصرف وارد کنید..."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <DialogFooter className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={close}
            disabled={isPending}
          >
            لغو
          </Button>
          <Button type="submit" disabled={isPending}>
            {isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            ایجاد نسخه
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
