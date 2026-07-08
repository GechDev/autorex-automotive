"use client";

import React, { useState, useMemo } from "react";
import { Search, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

export interface ColumnDef<T> {
  key: string;
  header: string;
  render?: (row: T) => React.ReactNode;
  sortable?: boolean;
  className?: string;
}

interface DataTableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  searchFields: (row: T) => string;
  searchPlaceholder?: string;
  rowKey: (row: T) => string | number;
  bulkActions?: { label: string; onClick: (selectedIds: (string | number)[]) => void; variant?: "danger" | "default" }[];
  emptyMessage?: string;
}

function formatDate(dateStr: string | Date) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) +
    ", " + d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false });
}

export { formatDate };

const PAGE_SIZE_OPTIONS = [10, 25, 50];

export function DataTable<T>({
  data,
  columns,
  searchFields,
  searchPlaceholder = "Search...",
  rowKey,
  bulkActions = [],
  emptyMessage = "No records found.",
}: DataTableProps<T>) {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selected, setSelected] = useState<Set<string | number>>(new Set());

  const filtered = useMemo(() => {
    if (!query.trim()) return data;
    const q = query.toLowerCase();
    return data.filter((row) => searchFields(row).toLowerCase().includes(q));
  }, [data, query, searchFields]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * pageSize;
  const paged = filtered.slice(start, start + pageSize);

  const allSelected = paged.length > 0 && paged.every((r) => selected.has(rowKey(r)));
  const someSelected = paged.some((r) => selected.has(rowKey(r)));

  function toggleAll() {
    const newSel = new Set(selected);
    if (allSelected) {
      paged.forEach((r) => newSel.delete(rowKey(r)));
    } else {
      paged.forEach((r) => newSel.add(rowKey(r)));
    }
    setSelected(newSel);
  }

  function toggleRow(id: string | number) {
    const newSel = new Set(selected);
    if (newSel.has(id)) newSel.delete(id);
    else newSel.add(id);
    setSelected(newSel);
  }

  function getPageNumbers(): (number | "...")[] {
    const pages: (number | "...")[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("...");
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) pages.push(i);
      if (currentPage < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  }

  return (
    <div className="space-y-4">
      {/* Search & Page Size Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative flex-1 bg-white rounded-xl border border-slate-200 shadow-sm flex items-center overflow-hidden transition-all focus-within:border-slate-300 focus-within:shadow-md w-full sm:max-w-lg">
          <Search className="w-5 h-5 text-slate-400 ml-4 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setPage(1); }}
            placeholder={searchPlaceholder}
            className="border-0 shadow-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 outline-none text-[14px] sm:text-base h-12 w-full bg-transparent px-4 placeholder:text-slate-400"
          />
        </div>
        <div className="flex items-center gap-3 text-sm font-semibold text-slate-700 shrink-0">
          <span>Rows per page:</span>
          <select
            value={pageSize}
            onChange={(e) => { setPageSize(Number(e.target.value)); setPage(1); }}
            className="h-12 px-4 rounded-xl border border-slate-200 shadow-sm bg-white focus:outline-none focus:ring-0 focus:border-slate-300 cursor-pointer transition-all hover:shadow-md text-sm"
          >
            {PAGE_SIZE_OPTIONS.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Bulk Actions Bar */}
      {selected.size > 0 && bulkActions.length > 0 && (
        <div className="flex items-center gap-3 px-4 py-2.5 bg-[#001659]/5 border border-[#001659]/20 rounded-lg">
          <span className="text-[13px] font-semibold text-[#001659]">{selected.size} selected</span>
          <div className="w-px h-4 bg-gray-300" />
          {bulkActions.map((action) => (
            <button
              key={action.label}
              onClick={() => { action.onClick(Array.from(selected)); setSelected(new Set()); }}
              className={`text-[13px] font-semibold px-3 py-1.5 rounded-lg transition-colors ${
                action.variant === "danger"
                  ? "text-red-600 hover:bg-red-50"
                  : "text-[#001659] hover:bg-[#001659]/10"
              }`}
            >
              {action.label}
            </button>
          ))}
          <button onClick={() => setSelected(new Set())} className="ml-auto text-[12px] text-gray-400 hover:text-gray-600">
            Clear
          </button>
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50/80 border-b border-gray-100">
              <tr>
                {bulkActions.length > 0 && (
                  <th className="px-4 py-3.5 w-10">
                    <input
                      type="checkbox"
                      checked={allSelected}
                      ref={(el) => { if (el) el.indeterminate = someSelected && !allSelected; }}
                      onChange={toggleAll}
                      className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer"
                    />
                  </th>
                )}
                {columns.map((col) => (
                  <th key={col.key} className={`px-5 py-3.5 font-semibold text-[13px] text-gray-600 uppercase tracking-wide whitespace-nowrap ${col.className ?? ""}`}>
                    {col.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {paged.length === 0 ? (
                <tr>
                  <td colSpan={columns.length + (bulkActions.length > 0 ? 1 : 0)} className="px-5 py-12 text-center text-gray-400 text-[14px]">
                    {query ? `No results for "${query}"` : emptyMessage}
                  </td>
                </tr>
              ) : (
                paged.map((row, i) => {
                  const id = rowKey(row);
                  const isSelected = selected.has(id);
                  return (
                    <tr
                      key={id}
                      className={`transition-colors duration-100 ${
                        isSelected
                          ? "bg-primary/5"
                          : i % 2 === 0 ? "bg-white hover:bg-gray-50/80" : "bg-gray-50/40 hover:bg-gray-50/80"
                      }`}
                    >
                      {bulkActions.length > 0 && (
                        <td className="px-4 py-3.5">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => toggleRow(id)}
                            className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer"
                          />
                        </td>
                      )}
                      {columns.map((col) => (
                        <td key={col.key} className={`px-5 py-3.5 ${col.className ?? ""}`}>
                          {col.render ? col.render(row) : (row as any)[col.key]}
                        </td>
                      ))}
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-5 py-4 border-t border-gray-100 bg-gray-50/50">
          <p className="text-[13px] text-gray-500">
            {filtered.length === 0 ? "No records" : (
              <>Showing <span className="font-semibold text-gray-700">{start + 1}–{Math.min(start + pageSize, filtered.length)}</span> of <span className="font-semibold text-gray-700">{filtered.length}</span> {filtered.length !== data.length && <span className="text-gray-400">(filtered from {data.length})</span>}</>
            )}
          </p>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage(1)}
              disabled={currentPage === 1}
              className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronsLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            {getPageNumbers().map((p, idx) =>
              p === "..." ? (
                <span key={`ellipsis-${idx}`} className="px-2 py-1.5 text-[13px] text-gray-400">…</span>
              ) : (
                <button
                  key={p}
                  onClick={() => setPage(p as number)}
                  className={`min-w-[32px] h-8 rounded-lg text-[13px] font-medium transition-colors ${
                    currentPage === p
                      ? "bg-primary text-white shadow-sm"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {p}
                </button>
              )
            )}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setPage(totalPages)}
              disabled={currentPage === totalPages}
              className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronsRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
