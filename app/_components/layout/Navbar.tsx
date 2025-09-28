"use client";

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
    <div className="w-full h-16 bg-primary flex items-center ps-10">
      <ul className="flex gap-10">
        {navLinks.map((navLink) => (
          <li
            key={navLink.name}
            className={`hover:underline hover:opacity-35 ${
              pathName === navLink.link ? "underline" : ""
            }`}
          >
            <a href={navLink.link} className="text-white font-semibold">
              {navLink.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Navbar;
