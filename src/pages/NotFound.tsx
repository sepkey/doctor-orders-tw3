import { Button } from '@/components/ui/button';
import { Link } from 'react-router';

export default function NotFound() {
  return (
    <div className="container flex flex-col items-center justify-center gap-8 px-4 py-16 text-center">
      <h1 className="text-8xl font-bold text-primary">404</h1>
      <h2 className="text-3xl font-semibold">Page Not Found</h2>
      <p className="max-w-md text-muted-foreground">
        Sorry, we couldn't find the page you're looking for. The page might have
        been removed, renamed, or doesn't exist.
      </p>

      <Link to="/">
        <Button>Return Home</Button>
      </Link>
    </div>
  );
}
