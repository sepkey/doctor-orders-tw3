import { Button } from '@/components/ui/button';
import { Link } from 'react-router';

export default function NotFound() {
  return (
    <div className="container flex flex-col items-center justify-center gap-8 px-4 py-16 text-center">
      <h1 className="text-8xl font-bold text-primary">404</h1>
      <h2 className="text-3xl font-semibold">صفحه پیدا نشد.</h2>
      <p className="max-w-md text-muted-foreground">
        متاسفانه صفحه موردنظرتان پیدا نشد. ممکن است این صفحه حذف شده باشد و یا
        تغییر نام یافته باشد.
      </p>

      <Link to="/">
        <Button>بازگشت به خانه</Button>
      </Link>
    </div>
  );
}
