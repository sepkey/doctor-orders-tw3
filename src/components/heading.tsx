import { Separator } from './ui/separator';

type HeadingProps = {
  description?: string;
  title: string;
  element?: React.ReactNode;
};
export default function Heading({ title, description, element }: HeadingProps) {
  return (
    <>
      <div className="flex justify-between ">
        <div className="px-8">
          <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
        {element}
      </div>
      <Separator />
    </>
  );
}
