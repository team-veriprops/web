'use client'

// Veriprops Top Navigation Component
import React, { useState } from 'react';
import { Search, Heart, GitCompareArrows, User, Home, Building, MapPin, HousePlus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWishlist, useCompare, useAuth, useUI } from '@stores/useStore';
import { Badge } from '@3rdparty/ui/badge';
import { Button } from '@3rdparty/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@3rdparty/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@3rdparty/ui/dropdown-menu';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { cn, isActivePath } from '@lib/utils';
import { useDebouncedCallback } from 'use-debounce';
import { useGlobalSettings } from '@hooks/useGlobalSettings';
import { PropertyType } from './property/models';

// interface NavigationProps {
//   activeCategory?: string;
//   onCategoryChange?: (category: string) => void;
// }



  const other_links = ['/search/houses', '/search/lands']

export const Navigation = () => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const wishlistItems = useWishlist((state) => state.items);
  const compareItems = useCompare((state) => state.items);
  const { user, isAuthenticated, logout } = useAuth();
  const { setCompareModalOpen } = useUI();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const { settings, setPropertyType } = useGlobalSettings();

  const categories = [
    { category: PropertyType.LAND,  key: '/properties/lands', label: 'Lands', icon: MapPin },
    { category: PropertyType.HOUSE,  key: '/properties/houses', label: 'Houses', icon: Home },
    // TODO: Uncomment after services implementation
    // { category: PropertyType.SERVICE,  key: '/services', label: 'Services', icon: Building },
  ];


  // const handleCategoryClick = (category: string) => {
  //   onCategoryChange?.(category);
  // };

const handleSearchClicked = () => {
  const params = new URLSearchParams(searchParams);
  const propertyType = pathname.toLowerCase().includes("lands") ? "lands" : "houses"; 
  replace(`/search/${propertyType}?${params.toString()}`);
  // redirect(`/properties/${property.type.toLowerCase()}s/${property.slug}`);
}

const handleSearchTextChange = useDebouncedCallback((searchTerm) => {
  console.log(`Searching... ${searchTerm}`);
 
  const params = new URLSearchParams(searchParams);
  // params.set('page', '1');
  if (searchTerm) {
    params.set('query', searchTerm);
  } else {
    params.delete('query');
  }
  replace(`${pathname}?${params.toString()}`);
 }, 300);

 const handleCompareClick = () => {
    if (compareItems.length > 0) {
      setCompareModalOpen(true);
    }
 };
 
 const MotionLink = motion(Link);

  /* Matches:
    /properties/houses/abc123

    /properties/lands/xyz-88

    /search/houses

    /search/lands
  */
  const CAPTURE_REGEX = /^(\/properties\/(houses|lands)\/[A-Za-z0-9_-]+|\/search\/(houses|lands))$/;

  const hasStickyNav = () => {
    return !CAPTURE_REGEX.test(pathname);
  };

  return (
    <header 
      className={`${cn('top-0 z-50 backdrop-blur-md border-b border-border', hasStickyNav() && 'sticky')}`}
      style={{ background: 'linear-gradient(180deg, #ffffff 39.9%, #f8f8f8 100%)' }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="inline-block">
            <motion.div 
              className="flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">V</span>
              </div>
              <span className="text-xl font-bold text-foreground">veriprops</span>
            </motion.div>
          </Link>

          {/* Center - Category Icons (Desktop) */}
          <div className="hidden md:flex items-center space-x-8">
            {categories.map(({ category, key, label, icon: Icon }) => (
              <MotionLink
                key={key}
                href={`${key}`}
                className={`relative flex items-center space-x-3 px-4 py-2 transition-all duration-200 ${
                  isActivePath(key, pathname, other_links)
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                whileHover="hover"
                whileTap={{ scale: 0.95 }}
                onClick={() => setPropertyType(category)}
              >
                <motion.div
                  variants={{
                    hover: { scale: 1.2 },
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Icon size={20} />
                </motion.div>
                <span className="text-sm font-medium">{label}</span>
                {isActivePath(key, pathname, other_links) && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-full"
                    layoutId="activeUnderline"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </MotionLink>
            ))}
          </div>

          {/* Right - Actions */}
          <div className="flex items-center space-x-4">
            {/* Sell Button */}
            <Button variant="outline" className="btn-outline flex">
              <HousePlus size={20} /><span className="font-medium">Sell</span>
            </Button>

            {/* Compare */}
            <motion.button
              onClick={handleCompareClick}
              className="relative hidden sm:flex p-2 text-muted-foreground hover:text-foreground transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <GitCompareArrows size={20} />
              {compareItems.length > 0 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1"
                >
                  <Badge className="bg-accent text-accent-foreground text-xs min-w-[1.25rem] h-5 p-0 flex items-center justify-center">
                    {compareItems.length}
                  </Badge>
                </motion.div>
              )}
            </motion.button>

            {/* Wishlist */}
            <motion.button
              className="relative hidden sm:flex p-2 text-muted-foreground hover:text-foreground transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Heart size={20} />
              {wishlistItems.length > 0 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1"
                >
                  <Badge className="bg-heart text-heart-foreground text-xs min-w-[1.25rem] h-5 p-0 flex items-center justify-center">
                    {wishlistItems.length}
                  </Badge>
                </motion.div>
              )}
            </motion.button>

            {/* Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <motion.button
                  className="flex items-center space-x-2 p-1 rounded-full hover:bg-muted transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isAuthenticated && user ? (
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  ) : (
                    <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                      <User size={16} className="text-muted-foreground" />
                    </div>
                  )} 
                </motion.button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                {isAuthenticated && user ? (
                  <>
                    <div className="flex items-center space-x-2 p-2">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">{user.name}</span>
                        <span className="text-xs text-muted-foreground">{user.email}</span>
                      </div>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>My Dashboard</DropdownMenuItem>
                    <DropdownMenuItem>My Listings</DropdownMenuItem>
                    <DropdownMenuItem>My Bookings</DropdownMenuItem>
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout} className="text-destructive">
                      Sign Out
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem>Sign In</DropdownMenuItem>
                    <DropdownMenuItem>Create Account</DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Search Section */}
        <div>
          <div className="container mx-auto px-4 py-4">
            <div className="relative w-full max-w-2xl mx-auto">
              <input
                type="text"
                placeholder="Search properties, locations, or services..."
                className="w-full h-14 pl-4 pr-16 border border-border rounded-3xl text-base placeholder:text-muted-foreground focus:outline-none shadow-lg"
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                onChange={(e) => {
                  handleSearchTextChange(e.target.value);
                }}
                defaultValue={searchParams.get('query')?.toString()}
              />
              <motion.div 
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary rounded-full flex items-center justify-center cursor-pointer hover:scale-105 transition-transform overflow-hidden min-w-[2.5rem]"
                animate={{ 
                  width: isSearchFocused ? 'auto' : '2.5rem',
                  paddingLeft: isSearchFocused ? '0.75rem' : '0',
                  paddingRight: isSearchFocused ? '0.75rem' : '0'
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                style={{ height: '2.5rem' }}
                onClick={handleSearchClicked}
              >
                <Search size={20} className="text-primary-foreground flex-shrink-0" />
                <AnimatePresence>
                  {isSearchFocused && (
                    <motion.span
                      initial={{ opacity: 0, width: 0, marginLeft: 0 }}
                      animate={{ opacity: 1, width: 'auto', marginLeft: '0.5rem' }}
                      exit={{ opacity: 0, width: 0, marginLeft: 0 }}
                      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1], delay: 0.1 }}
                      className="text-primary-foreground font-medium text-sm whitespace-nowrap"
                    >
                      Search
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

// Mobile Bottom Navigation
export const MobileBottomNav = () => {
  const wishlistItems = useWishlist((state) => state.items);
  const compareItems = useCompare((state) => state.items);
  const { setCompareModalOpen } = useUI();
  const pathname = usePathname();
  const { settings, setPropertyType } = useGlobalSettings();

  const defaultPath = "/"
  const MotionLink = motion(Link);

  const navItems = [
    { category: PropertyType.LAND, key: '/properties/lands', label: 'Lands', icon: MapPin },
    { category: PropertyType.HOUSE,  key: '/properties/houses', label: 'Houses', icon: Home },
    // TODO: Uncomment after services implementation
    // { category: PropertyType.SERVICE,  key: '/services', label: 'Services', icon: Building },
    { 
      key: '/compare', 
      label: 'Compare', 
      icon: GitCompareArrows, 
      badge: compareItems.length
    },
    { 
      key: '/wishlist', 
      label: 'Wishlist', 
      icon: Heart, 
      badge: wishlistItems.length 
    },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-t border-border">
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map(({ category, key, label, icon: Icon, badge}) => (
          <MotionLink
            key={key}
            href={`${key}`}
            className={`relative flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-all duration-200 ${
              isActivePath(key, pathname, other_links)
                ? "text-primary bg-primary/10"
                : "text-muted-foreground"
            }`}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              if(category){
                setPropertyType(category)
              }
            }}
          >
            <Icon size={18} />
            <span className="text-xs font-medium">{label}</span>

            {badge && badge > 0 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1"
              >
                <Badge className="bg-accent text-accent-foreground text-xs min-w-[1rem] h-4 p-0 flex items-center justify-center">
                  {badge}
                </Badge>
              </motion.div>
            )}
          </MotionLink>
        ))}
      </div>
    </div>
  );
};
