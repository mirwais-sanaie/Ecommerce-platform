"use client";

import { useState, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/app/_components/ui/input";
import { Search } from "lucide-react";

export default function SearchBar() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState(searchParams.get("q") || "");

  function handleSearch(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const currentSearchParams = new URLSearchParams(searchParams.toString());
    currentSearchParams.set("q", searchTerm);
    router.push(`/shop?${currentSearchParams.toString()}`);
  }

  return (
    <div className="relative w-full max-w-md mx-auto">
      <form action="" onSubmit={handleSearch}>
        <Search className="absolute left-3 top-3 text-gray-400" size={18} />
        <Input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 pr-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500"
        />
      </form>
    </div>
  );
}
