"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Scale, Globe, Info, Clock, GitBranch, Layers } from 'lucide-react';
import Map from '@/components/Map';
import DetailPanel from '@/components/DetailPanel';
import CompareMode from '@/components/CompareMode';
import SearchBar from '@/components/SearchBar';

interface CountryListItem {
  name: string;
  code3: string;
}

export default function Home() {
  const [countries, setCountries] = useState<CountryListItem[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  
  // Compare Mode States
  const [isCompareMode, setIsCompareMode] = useState(false);
  const [compareCountryA, setCompareCountryA] = useState<string | null>(null);
  const [compareCountryB, setCompareCountryB] = useState<string | null>(null);

  // Time state for high-tech header
  const [timeStr, setTimeStr] = useState("");

  useEffect(() => {
    // Set clock
    const updateTime = () => {
      const now = new Date();
      setTimeStr(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Fetch GeoJSON country names list once on mount to build search list
  useEffect(() => {
    fetch('/world-countries.geojson')
      .then(res => res.json())
      .then(data => {
        const list: CountryListItem[] = data.features.map((f: any) => {
          const props = f.properties;
          const code3 = props.ISO_A3 !== "-99" ? props.ISO_A3 : (props.ADM0_A3 !== "-99" ? props.ADM0_A3 : props.BRK_A3);
          return {
            name: props.NAME,
            code3: code3 || ""
          };
        }).filter((item: CountryListItem) => item.code3 !== "");
        // Sort alphabetically
        list.sort((a, b) => a.name.localeCompare(b.name));
        setCountries(list);
      })
      .catch(err => console.error("Error building search list:", err));
  }, []);

  // Handle selecting a country from search/click
  const handleCountrySelect = (code3: string) => {
    if (isCompareMode) {
      handleSelectCompare(code3);
    } else {
      setSelectedCountry(code3 === "" ? null : code3);
    }
  };

  // Handle selecting a country in Compare Mode
  const handleSelectCompare = (code3: string) => {
    if (!compareCountryA) {
      setCompareCountryA(code3);
    } else if (!compareCountryB && code3 !== compareCountryA) {
      setCompareCountryB(code3);
    } else if (code3 === compareCountryA) {
      setCompareCountryA(null);
    } else if (code3 === compareCountryB) {
      setCompareCountryB(null);
    } else {
      // If both are filled, replace B
      setCompareCountryB(code3);
    }
  };

  // Reset Compare selections
  const handleResetCompare = () => {
    setCompareCountryA(null);
    setCompareCountryB(null);
  };

  // Hover name helper
  const hoveredCountryName = useMemo(() => {
    if (!hoveredCountry) return null;
    return countries.find(c => c.code3 === hoveredCountry)?.name || hoveredCountry;
  }, [hoveredCountry, countries]);

  return (
    <div className="relative w-screen h-screen bg-slate-950 flex flex-col overflow-hidden text-slate-100 font-sans">
      {/* Background Matrix-like glow lines */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.1)_1.5px,transparent_1.5px),linear-gradient(90deg,rgba(15,23,42,0.1)_1.5px,transparent_1.5px)] bg-[size:40px_40px] pointer-events-none" />

      {/* Main High-Tech Dashboard Header */}
      <header className="relative z-20 flex items-center justify-between px-6 py-4 bg-slate-950/75 backdrop-blur-md border-b border-slate-900/60 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="relative p-2.5 bg-gradient-to-br from-indigo-950 to-slate-950 rounded-xl border border-indigo-500/20 text-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.15)] flex items-center justify-center">
            <Globe className="animate-spin-slow" size={20} />
            <div className="absolute -inset-0.5 rounded-xl bg-indigo-500/10 blur opacity-75" />
          </div>
          <div>
            <h1 className="text-base font-extrabold tracking-wider font-mono bg-gradient-to-r from-cyan-400 via-indigo-400 to-pink-500 bg-clip-text text-transparent uppercase">
              WorldInWords Vector
            </h1>
            <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mt-0.5">
              Integrated Global Telemetry Suite
            </p>
          </div>
        </div>

        {/* Global Spotlight Autocomplete Search Bar */}
        <div className="hidden md:block">
          <SearchBar countries={countries} onSelect={handleCountrySelect} />
        </div>

        {/* Right side diagnostics panel */}
        <div className="flex items-center gap-4 font-mono text-xs text-slate-400">
          <div className="hidden lg:flex items-center gap-2 bg-slate-900/40 px-3 py-1.5 rounded-lg border border-slate-800">
            <Clock size={13} className="text-cyan-400" />
            <span className="text-slate-350">{timeStr || "00:00:00"}</span>
          </div>

          {/* Compare Mode Toggle */}
          <button
            onClick={() => {
              setIsCompareMode(!isCompareMode);
              if (isCompareMode) handleResetCompare();
            }}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-xl border font-semibold text-xs tracking-wide transition-all cursor-pointer ${
              isCompareMode 
                ? 'bg-cyan-500/20 border-cyan-400 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.35)]' 
                : 'bg-slate-900 hover:bg-slate-800 border-slate-800 text-slate-300 hover:text-white'
            }`}
          >
            <Scale size={13} />
            <span>Compare {isCompareMode ? "ON" : "OFF"}</span>
          </button>
        </div>
      </header>

      {/* Main Map Arena */}
      <main className="flex-1 relative flex overflow-hidden">
        {/* Full-width Map Canvas */}
        <div className="flex-1 h-full p-4 md:p-6 bg-slate-950">
          <Map
            onCountrySelect={handleCountrySelect}
            selectedCountry={selectedCountry}
            compareCountryA={compareCountryA}
            compareCountryB={compareCountryB}
            isCompareMode={isCompareMode}
            onSelectCompare={handleSelectCompare}
            hoveredCountry={hoveredCountry}
            setHoveredCountry={setHoveredCountry}
          />
        </div>

        {/* Telemetry HUD overlays */}
        <div className="absolute left-8 bottom-8 z-10 pointer-events-none flex flex-col gap-3 font-mono text-[10px]">
          {/* Hover Status Indicator */}
          {hoveredCountryName && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-slate-900/80 backdrop-blur-md border border-slate-800 rounded-lg px-3 py-2 text-slate-300 shadow-md flex items-center gap-2.5"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
              <span>RADAR LOCK: <span className="text-cyan-400 font-bold uppercase">{hoveredCountryName}</span> ({hoveredCountry})</span>
            </motion.div>
          )}

          {/* General instructions banner */}
          <div className="bg-slate-900/60 backdrop-blur-md border border-slate-900 rounded-lg px-3 py-2 text-slate-500 flex items-center gap-2">
            <Info size={11} className="text-slate-400" />
            <span>Use scroll wheel to zoom. Drag canvas to pan.</span>
          </div>
        </div>

        {/* Side panel compare guide */}
        {isCompareMode && (!compareCountryA || !compareCountryB) && (
          <div className="absolute top-24 left-1/2 -translate-x-1/2 z-10 bg-slate-900/90 backdrop-blur-md border border-cyan-500/30 rounded-xl px-5 py-3 shadow-[0_0_20px_rgba(6,182,212,0.15)] flex flex-col items-center gap-1.5 max-w-sm w-full text-center">
            <div className="flex items-center gap-2 text-cyan-400 font-mono font-bold text-xs uppercase tracking-wider">
              <Scale size={13} className="animate-bounce" />
              <span>Comparative Target Lock</span>
            </div>
            <p className="text-[10px] font-mono text-slate-400 leading-normal">
              {!compareCountryA 
                ? "Select Country A on the map" 
                : `Vector A Locked: ${compareCountryA}. Select Country B.`}
            </p>
            {compareCountryA && (
              <button
                onClick={handleResetCompare}
                className="mt-1 text-[9px] font-mono bg-slate-950 px-2 py-0.5 rounded border border-slate-800 text-rose-400 hover:text-rose-350 cursor-pointer"
              >
                Clear Vector A
              </button>
            )}
          </div>
        )}

        {/* Slide-in Detail Panel Sidebar */}
        <AnimatePresence>
          {selectedCountry && !isCompareMode && (
            <DetailPanel
              countryCode={selectedCountry}
              onClose={() => setSelectedCountry(null)}
            />
          )}
        </AnimatePresence>

        {/* Split Screen Side-by-Side Comparison Console */}
        <AnimatePresence>
          {isCompareMode && compareCountryA && compareCountryB && (
            <CompareMode
              countryCodeA={compareCountryA}
              countryCodeB={compareCountryB}
              onReset={handleResetCompare}
              onClose={() => {
                setIsCompareMode(false);
                handleResetCompare();
              }}
            />
          )}
        </AnimatePresence>
      </main>

      {/* Cyberpunk Diagnostics Footer */}
      <footer className="relative z-20 px-6 py-3 bg-slate-950 border-t border-slate-900/60 flex flex-col sm:flex-row items-center justify-between text-[10px] font-mono text-slate-500 gap-2">
        <div className="flex items-center gap-4">
          <span>COSMIC TELEMETRY: ACTIVE</span>
          <span className="hidden md:inline">CORS BOUNDARY RECTIFY: OK</span>
          <span className="hidden md:inline">SYSTEM LATENCY: 12ms</span>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 hover:text-slate-350 transition-colors"
          >
            <GitBranch size={11} />
            <span>GitHub Repository</span>
          </a>
          <span>|</span>
          <span>Data sources: REST Countries, World Bank, Open-Meteo</span>
        </div>
      </footer>
    </div>
  );
}
