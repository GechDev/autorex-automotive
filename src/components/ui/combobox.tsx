"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Check, ChevronsUpDown, Loader2, X, Search, Command, User } from "lucide-react";
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
  triggerClassName?: string;
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
  triggerClassName,
  disabled = false,
}: ComboboxProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [options, setOptions] = useState<ComboboxOption[]>(staticOptions || (initialOption ? [initialOption] : []));
  const [loading, setLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState<ComboboxOption | null>(initialOption || null);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);

  const getInitials = (name: string) =>
    name
      .split(' ')
      .filter(Boolean)
      .map((n) => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();

  // Reset highlight when options change or open changes
  useEffect(() => {
    if (open && options.length > 0) {
      const index = options.findIndex((opt) => opt.value === selectedOption?.value);
      setHighlightedIndex(index >= 0 ? index : 0);
    } else {
      setHighlightedIndex(-1);
    }
  }, [open, options, selectedOption]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!open) {
      if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
        e.preventDefault();
        setOpen(true);
      }
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev < options.length - 1 ? prev + 1 : prev));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : prev));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (highlightedIndex >= 0 && highlightedIndex < options.length) {
        handleSelect(options[highlightedIndex]);
      }
    } else if (e.key === "Escape") {
      e.preventDefault();
      setOpen(false);
    }
  };

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
    <div 
      className={cn("relative w-full", open ? "z-[100]" : "z-10", className)} 
      ref={containerRef}
      onKeyDown={handleKeyDown}
    >
      <div
        tabIndex={disabled ? -1 : 0}
        className={cn(
          "flex items-center justify-between min-h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer",
          disabled && "opacity-50 cursor-not-allowed",
          triggerClassName
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
        <div className="absolute top-full left-0 z-[100] w-full mt-2 bg-slate-900 backdrop-blur-xl border border-slate-700/80 rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)] overflow-hidden ring-1 ring-black/50 flex flex-col">
          
          {/* Search Header */}
          <div className="relative flex items-center px-4 py-3 border-b border-slate-800 bg-slate-900/50">
            <Search className="w-4 h-4 text-slate-400 shrink-0 mr-3" />
            <input
              type="text"
              className="w-full bg-transparent text-[14px] font-medium text-slate-100 placeholder-slate-500 focus:outline-none"
              placeholder="Search..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
            />
          </div>

          {/* Section Label */}
          <div className="px-4 py-2 text-[11px] font-semibold tracking-wider text-slate-400 uppercase bg-slate-900/80 border-b border-slate-800/50">
            Results ({options.length})
          </div>

          {/* Results List */}
          <div className="max-h-72 overflow-y-auto p-2 space-y-1 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-700 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-slate-600">
            {loading ? (
              <div className="flex items-center justify-center py-8 text-sm text-slate-500">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Searching...
              </div>
            ) : options.length === 0 ? (
              <div className="py-8 text-center text-sm text-slate-500">
                {emptyText}
              </div>
            ) : (
              options.map((option, index) => {
                const isActive = selectedOption?.value === option.value;
                const isHighlighted = highlightedIndex === index;
                
                return (
                  <div
                    key={option.value}
                    onClick={() => handleSelect(option)}
                    onMouseEnter={() => setHighlightedIndex(index)}
                    className={cn(
                      "group relative flex items-center justify-between p-2.5 rounded-xl cursor-pointer transition-all duration-200 border",
                      isActive 
                        ? "bg-slate-800 border-primary shadow-[0_0_15px_rgba(201,10,7,0.3)] ring-1 ring-primary/50 z-10" 
                        : isHighlighted
                          ? "bg-slate-800 border-slate-700"
                          : "bg-slate-800/40 border-transparent hover:bg-slate-800 hover:border-slate-700"
                    )}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      {/* Avatar */}
                      <div className="relative shrink-0">
                        <div
                          className={cn(
                            "w-9 h-9 rounded-full flex items-center justify-center font-medium text-xs tracking-wider border shadow-sm transition-colors",
                            isActive
                              ? "bg-primary text-white border-primary"
                              : "bg-slate-700 text-slate-300 border-slate-600 group-hover:bg-slate-600"
                          )}
                        >
                          {getInitials(option.label)}
                        </div>
                      </div>

                      {/* Details */}
                      <div className="truncate">
                        <div className="flex items-center gap-2">
                          <span className={cn(
                            "text-[14px] font-semibold tracking-tight capitalize",
                            isActive ? "text-slate-100" : "text-slate-200"
                          )}>
                            {option.label}
                          </span>
                        </div>
                        {option.subLabel && (
                          <div className="flex items-center gap-2 text-[12px] mt-0.5 truncate">
                            <span className={cn(
                              "truncate",
                              isActive ? "text-red-200/70" : "text-slate-400"
                            )}>
                              {option.subLabel}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Selection Indicator */}
                    {isActive && (
                      <div className="w-5 h-5 rounded-full bg-primary/20 border border-primary text-primary flex items-center justify-center shrink-0 shadow-sm">
                        <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>

          {/* Quick Action Footer */}
          <div className="px-4 py-2.5 border-t border-slate-800 bg-slate-900 flex items-center justify-between text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-slate-400" />
              Navigate with <kbd className="px-1 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300 font-mono text-[10px]">↑</kbd> <kbd className="px-1 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300 font-mono text-[10px]">↓</kbd>
            </span>
            <span className="text-slate-500 text-[11px]">Press ESC to close</span>
          </div>
        </div>
      )}
    </div>
  );
}
