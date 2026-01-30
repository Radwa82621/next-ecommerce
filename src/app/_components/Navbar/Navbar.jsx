"use client";
import React, { useContext, useState } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { cartContext } from '@/context/cartContext';
import { wishlistContext } from '@/context/wishlistContext';
import { cn } from '@/lib/utils';
import { ShoppingBag, LogOut } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  let { status } = useSession();

  function handleLogOut() {
    signOut({ callbackUrl: "/login" });
  }

  const { NumberOfCartItems } = useContext(cartContext);
  const { wishlistIds } = useContext(wishlistContext);

  const NavItem = ({ href, children, badge }) => (
    <Link href={href} className="relative group flex items-center gap-1 hover:text-primary transition-colors cursor-pointer">
      {children}
      {badge ? (
        <span className="absolute -top-2 -right-3 bg-primary text-primary-foreground font-bold rounded-full w-5 h-5 flex items-center justify-center text-[10px] shadow-sm animate-in zoom-in">
          {badge}
        </span>
      ) : null}
    </Link>
  );

  return (
    <nav className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 border-b border-border">
      <div className="container mx-auto px-4 md:px-8 lg:px-12">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <ShoppingBag className="text-primary h-6 w-6 group-hover:rotate-12 transition-transform" />
            <span className="text-xl font-bold tracking-tight text-foreground">
              FreshCart
            </span>
          </Link>

          {/* Desktop Menu */}
          {status === 'authenticated' && (
            <div className="hidden lg:flex items-center gap-8">
              <ul className="flex items-center space-x-8 text-sm font-medium text-muted-foreground">
                <li><NavItem href="/">Home</NavItem></li>
                <li><NavItem href="/products">Products</NavItem></li>
                <li><NavItem href="/categories">Categories</NavItem></li>
                <li><NavItem href="/brands">Brands</NavItem></li>
                <li><NavItem href="/allorders">Orders</NavItem></li>
                <li><NavItem href="/wishlist" badge={wishlistIds.length}>Wishlist</NavItem></li>
                <li><NavItem href="/cart" badge={NumberOfCartItems}>Cart</NavItem></li>
              </ul>
            </div>
          )}

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            {/* Social Icons (Desktop) */}
            <div className="hidden xl:flex items-center space-x-3 text-muted-foreground/60 text-sm border-r pr-4 mr-1">
               <i className="fa-brands fa-instagram hover:text-primary cursor-pointer transition-colors" />
               <i className="fa-brands fa-facebook hover:text-primary cursor-pointer transition-colors" />
               <i className="fa-brands fa-twitter hover:text-primary cursor-pointer transition-colors" />
            </div>

            {/* Auth Buttons */}
            {status === "authenticated" ? (
              <button 
                onClick={handleLogOut}
                className="hidden lg:flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-destructive transition-colors"
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </button>
            ) : (
                <div className="hidden lg:flex items-center gap-4 text-sm font-medium">
                   <Link href="/login" className="text-muted-foreground hover:text-primary transition-colors">Login</Link>
                   <Link href="/register" className="bg-primary text-primary-foreground px-4 py-2 rounded-full hover:bg-primary/90 transition-colors">
                     Register
                   </Link>
                </div>
            )}

            {/* Mobile Toggle */}
            <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden text-foreground p-2">
              <i className={`fa-solid ${isOpen ? 'fa-xmark' : 'fa-bars'} text-xl`} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden border-t bg-background">
          <div className="container py-4 px-4 space-y-4">
            {status === 'authenticated' ? (
              <ul className="flex flex-col space-y-4 font-medium text-muted-foreground text-center">
                <li><Link href="/" onClick={() => setIsOpen(false)}>Home</Link></li>
                <li><Link href="/products" onClick={() => setIsOpen(false)}>Products</Link></li>
                <li><Link href="/categories" onClick={() => setIsOpen(false)}>Categories</Link></li>
                <li><Link href="/brands" onClick={() => setIsOpen(false)}>Brands</Link></li>
                <li><Link href="/allorders" onClick={() => setIsOpen(false)}>My Orders</Link></li>
                <li className="flex justify-center">
                  <NavItem href="/wishlist" badge={wishlistIds.length}>Wishlist</NavItem>
                </li>
                <li className="flex justify-center">
                  <NavItem href="/cart" badge={NumberOfCartItems}>Cart</NavItem>
                </li>
                <li className="pt-2 border-t">
                  <button onClick={() => { handleLogOut(); setIsOpen(false); }} className="text-destructive hover:text-destructive/80">
                    Sign Out
                  </button>
                </li>
              </ul>
            ) : (
              <div className="flex flex-col gap-4 text-center font-medium">
                 <Link href="/login" className="text-muted-foreground" onClick={() => setIsOpen(false)}>Login</Link>
                 <Link href="/register" className="text-primary" onClick={() => setIsOpen(false)}>Register</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
