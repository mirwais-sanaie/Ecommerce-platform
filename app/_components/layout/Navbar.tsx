"use client";

import { useCart } from "@/lib/store";
import { useAuthStore } from "@/lib/auth-store";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/app/_components/ui/button";

function Navbar() {
  const { totalQuantity } = useCart();
  const { user, isAuthenticated, logout } = useAuthStore();
  const pathName = usePathname();

  const handleLogout = async () => {
    await logout();
  };

  const navLinks = [
    { name: "Home", link: "/" },
    { name: "Shop", link: "/shop" },
  ];

  const authLinks = isAuthenticated
    ? [
        { name: "Dashboard", link: "/dashboard" },
        { name: "Cart", link: "/cart" },
      ]
    : [
        { name: "Login", link: "/login" },
        { name: "Sign Up", link: "/signup" },
      ];

  return (
    <div className="fixed top-0 left-0 right-0 z-30 w-full h-16 bg-primary flex items-center justify-between px-10 text-white">
      <ul className="flex gap-10">
        {navLinks.map((navLink) => (
          <li
            key={navLink.name}
            className={`hover:underline hover:opacity-75 ${
              pathName === navLink.link ? "underline" : ""
            }`}
          >
            <Link href={navLink.link}>{navLink.name}</Link>
          </li>
        ))}
        {authLinks.map((navLink) => (
          <li
            key={navLink.name}
            className={`hover:underline hover:opacity-75 ${
              pathName === navLink.link ? "underline" : ""
            }`}
          >
            <Link href={navLink.link}>{navLink.name}</Link>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-4">
        {isAuthenticated && (
          <div className="flex items-center gap-2">
            <span className="text-sm">Welcome, {user?.email}</span>
            <Button
              onClick={handleLogout}
              variant="outline"
              size="sm"
              className="text-primary cursor-pointer border-white hover:bg-white hover:text-primary"
            >
              Logout
            </Button>
          </div>
        )}

        {isAuthenticated && (
          <div className="relative">
            {totalQuantity > 0 && (
              <span className="absolute -top-2 -right-1 w-5 h-5 bg-red-500 rounded-full text-center text-sm">
                {totalQuantity}
              </span>
            )}
            <Link href="/cart">Cart</Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
