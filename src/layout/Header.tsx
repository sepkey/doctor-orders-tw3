import Searchbox from '@/components/searchbox';
import ThemeSwitcher from '@/components/theme-switcher';
import { Link } from 'react-router';
import Logo from './logo';

export default function Header() {
  return (
    <header className="bg-background shadow-sm sticky top-0 z-20">
      <div className="max-w-7xl mx-auto p-4 sm:px-6 lg:px-8 flex justify-between">
        <Link to="/">
          <div className="flex items-center gap-4">
            <Logo />
            <h3 className="text-xl ">مدیریت نسخه های پزشکی</h3>
          </div>
        </Link>
        <div className="flex items-center">
          <Searchbox />
          <ThemeSwitcher />
        </div>
      </div>
    </header>
  );
}
