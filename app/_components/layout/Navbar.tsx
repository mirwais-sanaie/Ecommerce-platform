"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function Navbar() {
  const navLinks = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "Shop",
      link: "/shop",
    },
  ];

  const pathName = usePathname();
  return (
    <div className="w-full h-16 bg-primary flex items-center justify-between ps-10 pe-10 text-white">
      <ul className="flex gap-10">
        {navLinks.map((navLink) => (
          <li
            key={navLink.name}
            className={`hover:underline hover:opacity-35 ${
              pathName === navLink.link ? "underline" : ""
            }`}
          >
            <Link href={navLink.link} className="text-white font-semibold">
              {navLink.name}
            </Link>
          </li>
        ))}
      </ul>

      <div>
        <Link href="/cart">Carts</Link>
      </div>
    </div>
  );
}

export default Navbar;
