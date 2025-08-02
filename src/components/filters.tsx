import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';
import { useSearchParams } from 'react-router';
import type { Filters } from '../features/order/type';

type FiltersProps = {
  options: { value: Filters; label: string; Icon: LucideIcon }[];
  paramName: string;
};

export default function Filters({ options, paramName }: FiltersProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentFilter = searchParams.get(paramName) || options.at(0)?.value;
  console.log(currentFilter, 'current');

  function handleClick(value: Filters) {
    const newParams = new URLSearchParams(searchParams);

    if (value === 'all') {
      newParams.delete(paramName);
    } else {
      newParams.set(paramName, value);
    }

    setSearchParams(newParams);
  }

  return (
    <div className="flex justify-center">
      <div className="flex justify-center rounded-lg bg-background p-1 w-full  gap-2">
        {options.map((option) => (
          <Button
            variant="ghost"
            size="sm"
            key={option.value}
            onClick={() => handleClick(option.value)}
            className={cn(
              'flex-1/2 py-2 transition-all hover:text-primary',
              currentFilter === option.value
                ? 'bg-card shadow-sm font-medium text-primary'
                : 'text-foreground/30'
            )}
          >
            <option.Icon className="h-4 w-4" />
            {option.label}{' '}
          </Button>
        ))}
      </div>
    </div>
  );
}
