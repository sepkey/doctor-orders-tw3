import { getCommandTypeMapper, parseMetadata } from '@/features/order/utils';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';
import { getOrderById } from '../service';

export const getOrderKey = (id: string) => ['order', id];

export function useGetOrder() {
  const { id } = useParams();
  return useQuery({
    queryKey: getOrderKey(id!),
    queryFn: () => getOrderById(id!),
    select: (order) => {
      const itemToDisplay = getCommandTypeMapper.find(
        (item) => item.type === order.commandType
      );
      const metadata = parseMetadata(order.metaData);

      return { order, itemToDisplay, metadata };
    },
  });
}
