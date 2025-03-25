"use client";

import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import { Loader, SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEventHandler, useState } from "react";

const Search = () => {
  const router = useRouter();
  const [search, setSearch] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSeachSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    setIsLoading(true);
    e.preventDefault();
    if (!search) {
      return;
    } else {
      router.push(`/barbershops?search=${search}`);
    }
  };
  return (
    <form
      className="flex items-center gap-2 w-full"
      onSubmit={handleSeachSubmit}
    >
      <Input
        placeholder="Busque por uma Barbearia..."
        className="text-sm"
        onChange={handleChange}
        value={search}
        required
      />
      <Button variant="default" size="icon" className="click w-12">
        {isLoading ? (
          <Loader className="animate-spin" />
        ) : (
          <SearchIcon size={18} />
        )}
      </Button>
    </form>
  );
};

export default Search;
