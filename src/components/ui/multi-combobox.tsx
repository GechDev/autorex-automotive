"use client";

import React, { useState, useEffect, useRef } from "react";
import { Check, ChevronsUpDown, Loader2, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { ComboboxOption } from "./combobox";

interface MultiComboboxProps {
  values?: string[];
  onChange: (values: string[]) => void;
  fetchOptions?: (query: string) => Promise<ComboboxOption[]>;
  options?: ComboboxOption[]; 
  initialOptions?: ComboboxOption[]; 
  placeholder?: string;
  emptyText?: string;
  className?: string;
  disabled?: boolean;
}

export function MultiCombobox({
  values = [],
  onChange,
  fetchOptions,
  options: staticOptions,
  initialOptions = [],
  placeholder = "Select options...",
  emptyText = "No results found.",
  className,
  disabled = false,
}: MultiComboboxProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [options, setOptions] = useState<ComboboxOption[]>(staticOptions || initialOptions);
  const [loading, setLoading] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<ComboboxOption[]>(initialOptions);
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

  // Sync selectedOptions when values or options change
  useEffect(() => {
    if (values && values.length > 0) {
      const newSelected = values.map(val => {
        return options.find(opt => opt.value === val) || selectedOptions.find(opt => opt.value === val) || { value: val, label: val };
      });
      setSelectedOptions(newSelected);
    } else {
      setSelectedOptions([]);
    }
  }, [values, options]); // purposefully omitting selectedOptions to avoid loops

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
    const isSelected = selectedOptions.some(opt => opt.value === option.value);
    let newValues;
    if (isSelected) {
      newValues = selectedOptions.filter(opt => opt.value !== option.value).map(o => o.value);
    } else {
      newValues = [...selectedOptions, option].map(o => o.value);
    }
    onChange(newValues);
  };

  const handleRemove = (e: React.MouseEvent, value: string) => {
    e.stopPropagation();
    onChange(selectedOptions.filter(opt => opt.value !== value).map(o => o.value));
  };

  return (
    <div className={cn("relative w-full", className)} ref={containerRef}>
      <div
        className={cn(
          "flex min-h-10 w-full flex-col justify-center rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          disabled && "opacity-50 cursor-not-allowed"
        )}
        onClick={() => !disabled && setOpen(!open)}
      >
        <div className="flex flex-wrap gap-1 items-center">
          {selectedOptions.length > 0 ? (
            selectedOptions.map(opt => (
              <span key={opt.value} className="bg-primary/10 text-primary flex items-center gap-1 px-2 py-0.5 rounded text-xs">
                {opt.label}
                {!disabled && (
                  <button onClick={(e) => handleRemove(e, opt.value)} className="hover:text-red-500 rounded-full p-0.5 transition-colors">
                    <X className="h-3 w-3" />
                  </button>
                )}
              </span>
            ))
          ) : (
            <span className="text-muted-foreground">{placeholder}</span>
          )}
          <div className="ml-auto flex items-center gap-2 flex-shrink-0 text-muted-foreground">
            <ChevronsUpDown className="h-4 w-4 opacity-50" />
          </div>
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
              options.map((option) => {
                const isSelected = selectedOptions.some(opt => opt.value === option.value);
                return (
                  <div
                    key={option.value}
                    className={cn(
                      "relative flex flex-col w-full cursor-default select-none items-start rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
                      isSelected && "bg-accent/50"
                    )}
                    onClick={() => handleSelect(option)}
                  >
                    {isSelected && (
                      <span className="absolute left-2 top-1.5 flex h-5 w-5 items-center justify-center text-primary">
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
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}
