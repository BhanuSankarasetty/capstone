// src/layouts/MainLayout.jsx - Professional E-commerce Header
import React, { useState } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import {
  User,
  Heart,
  Store,
  Shield,
  LogOut,
  ShoppingBag,
  Search,
  Menu,
  X,
  MapPin,
  Bell,
  ShoppingCart
} from 'lucide-react';
import { ThemeToggle } from '../components/common/ThemeToggle';
import Footer from '../components/common/Footer';
import { motion, AnimatePresence } from 'framer-motion';

const MainLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: 'Search', path: '/search', icon: Search },
    { name: 'Categories', path: '/categories', icon: ShoppingBag },
    { name: 'Vendors', path: '/vendors', icon: Store },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground transition-colors duration-300">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/60 shadow-sm">
        <nav className="container mx-auto px-4">
          {/* Top Bar */}
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="flex flex-col">
                <span className="text-3xl font-poppins font-extrabold text-gradient-primary leading-none tracking-tight">
                  FYP
                </span>
                <span className="text-[0.65rem] text-muted-foreground font-medium tracking-wider leading-none">
                  FIND YOUR PRODUCT
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8 flex-1 justify-center">
              {navigation.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-2 text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 ${isActive
                      ? 'text-primary font-semibold'
                      : 'text-muted-foreground hover:text-primary'
                    }`
                  }
                >
                  <item.icon className="h-4 w-4" />
                  {item.name}
                </NavLink>
              ))}
            </div>

            {/* Right Side Actions */}
            <div className="hidden md:flex items-center gap-4">
              {/* Location */}
              <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors px-3 py-1.5 rounded-full hover:bg-accent/10">
                <MapPin className="h-4 w-4" />
                <span className="hidden lg:inline font-medium">Bangalore</span>
              </button>

              {/* Notifications */}
              {user && (
                <button className="relative p-2 text-muted-foreground hover:text-primary transition-colors hover:bg-accent/10 rounded-full">
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-destructive rounded-full ring-2 ring-background animate-pulse"></span>
                </button>
              )}

              {/* User Menu */}
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full ring-2 ring-border hover:ring-primary transition-all">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={user.avatar || "https://github.com/shadcn.png"} alt="@user" />
                        <AvatarFallback className="bg-gradient-primary text-white font-semibold">
                          {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user.name}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {user.email}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground bg-accent/10 px-2 py-0.5 rounded-full w-fit mt-1">
                          {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      {user.role === 'user' && (
                        <>
                          <DropdownMenuItem asChild>
                            <Link to="/user/profile" className="cursor-pointer">
                              <User className="mr-2 h-4 w-4" />
                              <span>Profile</span>
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link to="/user/favorites" className="cursor-pointer">
                              <Heart className="mr-2 h-4 w-4" />
                              <span>Favorites</span>
                            </Link>
                          </DropdownMenuItem>
                        </>
                      )}
                      {user.role === 'vendor' && (
                        <DropdownMenuItem asChild>
                          <Link to="/vendor" className="cursor-pointer">
                            <Store className="mr-2 h-4 w-4" />
                            <span>Vendor Dashboard</span>
                          </Link>
                        </DropdownMenuItem>
                      )}
                      {user.role === 'admin' && (
                        <DropdownMenuItem asChild>
                          <Link to="/admin" className="cursor-pointer">
                            <Shield className="mr-2 h-4 w-4" />
                            <span>Admin Panel</span>
                          </Link>
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout} className="cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="flex items-center gap-3">
                  <Link to="/login">
                    <Button variant="ghost" size="sm" className="font-medium">Log In</Button>
                  </Link>
                  <Link to="/signup">
                    <Button variant="fypPrimary" size="sm" className="shadow-lg shadow-primary/25">Sign Up</Button>
                  </Link>
                </div>
              )}

              <ThemeToggle />
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-muted-foreground hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden border-t border-border"
              >
                <div className="px-4 py-4 space-y-3">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors p-2 rounded-md hover:bg-accent/10"
                    >
                      <item.icon className="h-5 w-5" />
                      {item.name}
                    </Link>
                  ))}
                  {!user && (
                    <div className="pt-4 border-t border-border space-y-3">
                      <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                        <Button variant="ghost" className="w-full justify-start">
                          Log In
                        </Button>
                      </Link>
                      <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
                        <Button variant="fypPrimary" className="w-full shadow-md">
                          Sign Up
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default MainLayout;
