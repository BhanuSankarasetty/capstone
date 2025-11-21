// src/components/common/Header.jsx (updated snippet)
import React from 'react';
import { Link } from 'react-router-dom';
import { MagnifyingGlassIcon, UserCircleIcon, LogOutIcon, LayoutDashboardIcon, UserIcon } from 'lucide-react'; // Import Lucide icons
import { useAuth } from '../../context/AuthContext';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'; // Assuming you added these ShadCN components

export function Header() { // Exported as named export for consistency
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm py-4">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-fypBlue text-3xl font-poppins font-bold">FYP</span>
          <span className="sr-only">Find Your Product</span>
        </Link>

        {/* Search Bar (Central for quick access) */}
        <div className="grow max-w-lg mx-8 hidden md:flex">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search for products locally..."
              className="w-full pl-12 pr-4 py-2 rounded-full border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-fypBlue focus:border-fypBlue transition duration-200"
            />
            <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-6 w-6 text-gray-400" />
          </div>
        </div>

        {/* Navigation & User Actions */}
        <nav className="flex items-center space-x-4">
          {/* Consider a responsive nav menu for these links */}
          <Link to="/about" className="text-gray-600 dark:text-gray-300 hover:text-fypBlue transition duration-200 hidden lg:block">About</Link>
          <Link to="/vendors-info" className="text-gray-600 dark:text-gray-300 hover:text-fypBlue transition duration-200 hidden lg:block">For Vendors</Link>

          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                  <UserCircleIcon className="h-7 w-7 text-gray-600 dark:text-gray-300" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user?.name || 'User'}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user?.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {user?.role === 'vendor' && (
                  <DropdownMenuItem asChild>
                    <Link to="/vendor" className="flex items-center">
                      <LayoutDashboardIcon className="mr-2 h-4 w-4" />
                      <span>Vendor Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                )}
                {user?.role === 'admin' && (
                  <DropdownMenuItem asChild>
                    <Link to="/admin" className="flex items-center">
                      <LayoutDashboardIcon className="mr-2 h-4 w-4" />
                      <span>Admin Panel</span>
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem className="flex items-center">
                  <UserIcon className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className="flex items-center text-red-600 focus:text-red-600">
                  <LogOutIcon className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to="/auth/login">
              <Button variant="outline" className="text-fypBlue border-fypBlue hover:bg-fypBlue hover:text-white">Login</Button>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
export default Header;
