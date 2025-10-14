"use client";

import { useCart } from "@/lib/store";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Navbar() {
  const { carts } = useCart();
  const pathName = usePathname();

  const navLinks = [
    { name: "Home", link: "/" },
    { name: "Shop", link: "/shop" },
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
        {carts.length > 0 && (
          <span className="absolute -top-2 -right-1 w-5 h-5 bg-red-500 rounded-full text-center text-sm">
            {carts.length}
          </span>
        )}
        <Link href="/cart">Cart</Link>
      </div>
    </div>
  );
}

export default Navbar;
