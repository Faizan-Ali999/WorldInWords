"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Search, Globe, Command } from 'lucide-react';

interface SearchBarProps {
  countries: { name: string; code3: string }[];
  onSelect: (code3: string) => void;
}

export default function SearchBar({ countries, onSelect }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Filter countries based on query
  const filtered = query.trim() === "" 
    ? [] 
    : countries.filter(c => 
        c.name.toLowerCase().includes(query.toLowerCase()) || 
        c.code3.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 8);

  // Keyboard shortcut Ctrl+K to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handle clicking outside to close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (code3: string) => {
    onSelect(code3);
    setQuery("");
    setIsOpen(false);
    setHighlightedIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (filtered.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex(prev => (prev + 1) % filtered.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex(prev => (prev - 1 + filtered.length) % filtered.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (highlightedIndex >= 0 && highlightedIndex < filtered.length) {
        handleSelect(filtered[highlightedIndex].code3);
      } else if (filtered.length > 0) {
        handleSelect(filtered[0].code3);
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
      inputRef.current?.blur();
    }
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-md">
      {/* Search Input Box */}
      <div className="relative flex items-center bg-slate-900/75 backdrop-blur-md border border-slate-800 focus-within:border-cyan-500/50 rounded-xl transition-all shadow-lg px-3.5 py-2">
        <Search className="text-slate-500 mr-2.5" size={18} />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
            setHighlightedIndex(-1);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="Search country name or code..."
          className="w-full bg-transparent text-sm text-slate-100 placeholder-slate-500 border-none outline-none font-mono"
        />
        <div className="flex items-center gap-1 bg-slate-950 px-2 py-1 rounded-md border border-slate-800 text-[10px] text-slate-500 font-mono select-none">
          <Command size={10} />
          <span>K</span>
        </div>
      </div>

      {/* Autocomplete Dropdown List */}
      {isOpen && filtered.length > 0 && (
        <ul className="absolute left-0 right-0 z-40 mt-2 bg-slate-900/95 backdrop-blur-md border border-slate-800/80 rounded-xl shadow-[0_15px_30px_rgba(0,0,0,0.6)] py-2 max-h-60 overflow-y-auto divide-y divide-slate-800/40">
          {filtered.map((item, index) => {
            const isHighlighted = index === highlightedIndex;
            return (
              <li
                key={item.code3}
                onMouseEnter={() => setHighlightedIndex(index)}
                onClick={() => handleSelect(item.code3)}
                className={`px-4 py-2.5 flex items-center justify-between text-xs font-mono transition-colors cursor-pointer ${isHighlighted ? 'bg-cyan-500/10 text-cyan-400' : 'text-slate-300'}`}
              >
                <div className="flex items-center gap-3">
                  <Globe size={14} className={isHighlighted ? "text-cyan-400" : "text-slate-500"} />
                  <span>{item.name}</span>
                </div>
                <span className={`text-[10px] px-1.5 py-0.5 rounded ${isHighlighted ? 'bg-cyan-950 text-cyan-400 border border-cyan-500/20' : 'bg-slate-950 text-slate-500 border border-slate-800'}`}>
                  {item.code3}
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
