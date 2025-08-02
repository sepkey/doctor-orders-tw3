import { Outlet } from 'react-router';
import Header from './header';

export default function Layout() {
  return (
    <div className="min-h-screen bg-muted">
      <Header />
      <main>
        <div className="max-w-7xl mx-auto p-4 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
