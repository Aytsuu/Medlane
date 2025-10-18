import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type itemProps = {
  value: string;
  label: string;
};

export function Combobox({
  list,
  value,
  onChange,
  onSearchChange,
  searchPlaceholder, 
  placeholder,
}: {
  list: itemProps[];
  value: string;
  onChange: (value: itemProps | null) => void
  onSearchChange: (value: string) => void
  searchPlaceholder?: string;
  placeholder?: React.ReactNode;
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full justify-start">
          {value ? (
            <>{value}</>
          ) : placeholder ? (
            placeholder
          ) : (
            <>Select</>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0" align="start">
        <Command shouldFilter={false}>
          <CommandInput
            placeholder={searchPlaceholder ? searchPlaceholder : "Search"}
            onValueChange={onSearchChange}
            className="w-full"
          />
          <CommandList className="w-full">
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {list?.map((item: any) => (
                <CommandItem
                  key={item.value}
                  value={item.value}
                  onSelect={() => {
                    onChange(item ||
                        null
                    );
                    setOpen(false);
                  }}
                >
                  {item.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
