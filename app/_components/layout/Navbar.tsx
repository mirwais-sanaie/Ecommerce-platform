"use client";

import { useCart } from "@/lib/store";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Navbar() {
  const { totalQuantity } = useCart();
  const pathName = usePathname();

  const navLinks = [
    { name: "Home", link: "/" },
    { name: "Shop", link: "/shop" },
    { name: "Dashboard", link: "/dashboard" },
  ];

  return (
    <div className="w-full h-16 bg-primary flex items-center justify-between px-10 text-white">
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
      </ul>

      <div className="relative">
        {totalQuantity > 0 && (
          <span className="absolute -top-2 -right-1 w-5 h-5 bg-red-500 rounded-full text-center text-sm">
            {totalQuantity}
          </span>
        )}
        <Link href="/cart">Cart</Link>
      </div>
    </div>
  );
}

export default Navbar;
