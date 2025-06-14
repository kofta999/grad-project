"use client";

import * as React from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

const SearchBar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    placeholder?: string;
    value?: string;
    onChange?: (value: string) => void;
    onSubmit?: (value: string) => void;
  }
>(({ className, placeholder = "Search here...", value, onChange, onSubmit, ...props }, ref) => {
  const [inputValue, setInputValue] = React.useState(value || "");

  React.useEffect(() => {
    if (value !== undefined) {
      setInputValue(value);
    }
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    onChange?.(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(inputValue);
  };

  return (
    <div
      ref={ref}
      className={cn(
        "flex items-center w-full rounded-md border border-input bg-background ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
        className
      )}
      {...props}
    >
      <form onSubmit={handleSubmit} className="flex w-full items-center">
        <button
          type="submit"
          className="flex h-10 pr-3 items-center justify-center text-muted-foreground hover:text-foreground"
        >
          <Search className="h-4 w-4 text-mainColor" />
        </button>
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          placeholder={placeholder}
          className="flex h-10 w-full rounded-md bg-transparent px-3 py-2 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
        />
      </form>
    </div>
  );
});
SearchBar.displayName = "SearchBar";

export { SearchBar };
