"use client";

import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import { SearchIcon } from "lucide-react";

const Search = () => (
  <div className="flex items-center gap-2">
    <Input
      placeholder="Busque por uma Barbearia..."
      className="text-xs sm:text-sm"
    />
    <Button variant="default" size="icon" className="click w-12">
      <SearchIcon size={18} />
    </Button>
  </div>
);

export default Search;
