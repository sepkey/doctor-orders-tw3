import { cn } from '@/lib/utils';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from './alert';

type Props = { message: string; status: 'error' | 'info' };
export default function Message({ message, status }: Props) {
  return (
    <div className=" max-w-5xl mx-auto p-8">
      <Alert>
        <AlertCircle
          className={cn({
            'stroke-red-400': status === 'error',
            'stroke-blue-300': status === 'info',
          })}
        />
        <AlertTitle
          className={cn({
            'text-red-400': status === 'error',
            'text-blue-300': status === 'info',
          })}
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </AlertTitle>
        <AlertDescription>{message} </AlertDescription>
      </Alert>
    </div>
  );
}
