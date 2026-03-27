import * as React from "react";
import { Search } from "lucide-react";
import { Input } from "./input";
import { cn } from "./utils";

interface SearchInputProps extends React.ComponentProps<"input"> {
  containerClassName?: string;
}

function SearchInput({ containerClassName, className, ...props }: SearchInputProps) {
  return (
    <div className={cn("relative", containerClassName)}>
      <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="text"
        className={cn(
          "pl-9 bg-[#F3F3F5] border-input text-foreground placeholder:text-muted-foreground",
          "[&]:dark:bg-[#F3F3F5] [&]:dark:text-foreground",
          className,
        )}
        {...props}
      />
    </div>
  );
}

export { SearchInput };
