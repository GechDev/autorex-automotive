"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Check, ChevronsUpDown, Loader2, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ComboboxOption {
  value: string;
  label: string;
  subLabel?: string;
}

interface ComboboxProps {
  value?: string;
  onChange: (value: string) => void;
  fetchOptions?: (query: string) => Promise<ComboboxOption[]>;
  options?: ComboboxOption[]; // For static lists if needed
  initialOption?: ComboboxOption; // For setting the initial label when using fetchOptions
  placeholder?: string;
  emptyText?: string;
  className?: string;
  disabled?: boolean;
}

export function Combobox({
  value,
  onChange,
  fetchOptions,
  options: staticOptions,
  initialOption,
  placeholder = "Select an option...",
  emptyText = "No results found.",
  className,
  disabled = false,
}: ComboboxProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [options, setOptions] = useState<ComboboxOption[]>(staticOptions || (initialOption ? [initialOption] : []));
  const [loading, setLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState<ComboboxOption | null>(initialOption || null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Sync selectedOption when value or options change
  useEffect(() => {
    if (value) {
      const found = options.find((opt) => opt.value === value) || (initialOption?.value === value ? initialOption : null);
      if (found) {
        setSelectedOption(found);
      }
    } else {
      setSelectedOption(null);
    }
  }, [value, options, initialOption]);

  // Debounced fetch
  useEffect(() => {
    if (!fetchOptions || !open) return;
    
    const fetch = async () => {
      setLoading(true);
      try {
        const results = await fetchOptions(query);
        setOptions(results);
      } catch (error) {
        console.error("Failed to fetch options", error);
        setOptions([]);
      } finally {
        setLoading(false);
      }
    };

    const timeout = setTimeout(fetch, 300);
    return () => clearTimeout(timeout);
  }, [query, fetchOptions, open]);

  // If using static options, filter them locally
  useEffect(() => {
    if (staticOptions && !fetchOptions) {
      if (!query) {
        setOptions(staticOptions);
      } else {
        const lowerQuery = query.toLowerCase();
        setOptions(
          staticOptions.filter(
            (opt) =>
              opt.label.toLowerCase().includes(lowerQuery) ||
              opt.subLabel?.toLowerCase().includes(lowerQuery)
          )
        );
      }
    }
  }, [query, staticOptions, fetchOptions]);

  const handleSelect = (option: ComboboxOption) => {
    setSelectedOption(option);
    onChange(option.value);
    setOpen(false);
    setQuery("");
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedOption(null);
    onChange("");
    setQuery("");
  };

  return (
    <div className={cn("relative w-full", className)} ref={containerRef}>
      <div
        className={cn(
          "flex items-center justify-between min-h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          disabled && "opacity-50 cursor-not-allowed"
        )}
        onClick={() => !disabled && setOpen(!open)}
      >
        <div className="flex-1 truncate">
          {selectedOption ? (
            <div className="flex flex-col">
              <span className="font-medium">{selectedOption.label}</span>
              {selectedOption.subLabel && (
                <span className="text-xs text-muted-foreground truncate">
                  {selectedOption.subLabel}
                </span>
              )}
            </div>
          ) : (
            <span className="text-muted-foreground">{placeholder}</span>
          )}
        </div>
        
        <div className="flex items-center gap-2 flex-shrink-0 ml-2 text-muted-foreground">
          {selectedOption && !disabled && (
            <button
              type="button"
              onClick={handleClear}
              className="hover:text-foreground transition-colors p-1"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          <ChevronsUpDown className="h-4 w-4 opacity-50" />
        </div>
      </div>

      {open && !disabled && (
        <div className="absolute z-50 w-full mt-1 bg-popover text-popover-foreground border rounded-md shadow-md animate-in fade-in-80 zoom-in-95">
          <div className="p-1 border-b">
            <input
              type="text"
              className="w-full bg-transparent px-2 py-1.5 text-sm outline-none placeholder:text-muted-foreground"
              placeholder="Search..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
            />
          </div>
          <div className="max-h-60 overflow-y-auto p-1">
            {loading ? (
              <div className="flex items-center justify-center py-6 text-sm text-muted-foreground">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Searching...
              </div>
            ) : options.length === 0 ? (
              <div className="py-6 text-center text-sm text-muted-foreground">
                {emptyText}
              </div>
            ) : (
              options.map((option) => (
                <div
                  key={option.value}
                  className={cn(
                    "relative flex flex-col w-full cursor-default select-none items-start rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
                    selectedOption?.value === option.value && "bg-accent text-accent-foreground"
                  )}
                  onClick={() => handleSelect(option)}
                >
                  {selectedOption?.value === option.value && (
                    <span className="absolute left-2 top-1.5 flex h-5 w-5 items-center justify-center">
                      <Check className="h-4 w-4" />
                    </span>
                  )}
                  <span className="font-medium text-left">{option.label}</span>
                  {option.subLabel && (
                    <span className="text-xs text-muted-foreground text-left mt-0.5">
                      {option.subLabel}
                    </span>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
