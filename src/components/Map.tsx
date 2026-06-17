"use client";

import React, { useState, useEffect, useRef, useMemo } from 'react';
import * as d3 from 'd3-geo';
import { motion, AnimatePresence } from 'framer-motion';
import { ZoomIn, ZoomOut, RotateCcw, MapPin, Search } from 'lucide-react';

interface MapProps {
  onCountrySelect: (code3: string) => void;
  selectedCountry: string | null;
  compareCountryA: string | null;
  compareCountryB: string | null;
  isCompareMode: boolean;
  onSelectCompare: (code3: string) => void;
  hoveredCountry: string | null;
  setHoveredCountry: (code3: string | null) => void;
}

interface CountryFeature {
  type: string;
  properties: {
    NAME: string;
    ISO_A3: string;
    ADM0_A3: string;
    BRK_A3: string;
    CONTINENT: string;
    POP_EST: number;
    FORMAL_EN?: string;
  };
  geometry: any;
}

export default function Map({
  onCountrySelect,
  selectedCountry,
  compareCountryA,
  compareCountryB,
  isCompareMode,
  onSelectCompare,
  hoveredCountry,
  setHoveredCountry
}: MapProps) {
  const [geoData, setGeoData] = useState<CountryFeature[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Pan & Zoom States
  const [scale, setScale] = useState(140);
  const [translate, setTranslate] = useState<[number, number]>([480, 260]);
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef<[number, number]>([0, 0]);
  const translateStart = useRef<[number, number]>([0, 0]);
  
  // Dimensions
  const width = 960;
  const height = 500;
  
  // Tooltip coordinates
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [tooltipCountry, setTooltipCountry] = useState<CountryFeature | null>(null);

  // Projection setup
  const projection = useMemo(() => {
    return d3.geoMercator()
      .scale(scale)
      .translate(translate);
  }, [scale, translate]);

  const pathGenerator = useMemo(() => {
    return d3.geoPath().projection(projection);
  }, [projection]);

  // Load GeoJSON on mount
  useEffect(() => {
    fetch('/world-countries.geojson')
      .then(res => res.json())
      .then(data => {
        setGeoData(data.features);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load map GeoJSON:", err);
        setLoading(false);
      });
  }, []);

  // Helper to resolve 3-letter code
  const getCode = (feat: CountryFeature) => {
    const props = feat.properties;
    if (props.ISO_A3 && props.ISO_A3 !== "-99") return props.ISO_A3;
    if (props.ADM0_A3 && props.ADM0_A3 !== "-99") return props.ADM0_A3;
    return props.BRK_A3 || "";
  };

  // Center & Zoom to a country
  const centerOnCountry = (feat: CountryFeature) => {
    try {
      const code = getCode(feat);
      const centroid = d3.geoCentroid(feat as any);
      if (isNaN(centroid[0]) || isNaN(centroid[1])) return;
      
      const [cx, cy] = d3.geoMercator()
        .scale(1)
        .translate([0, 0])(centroid) || [0, 0];
      
      // Target zoom scale based on country area/bounds
      let targetScale = 220;
      
      // Calculate bounding box in degrees to estimate country size
      if (feat.geometry) {
        const bounds = d3.geoBounds(feat as any);
        const dx = Math.abs(bounds[1][0] - bounds[0][0]);
        const dy = Math.abs(bounds[1][1] - bounds[0][1]);
        const maxDelta = Math.max(dx, dy);
        if (maxDelta > 0) {
          targetScale = Math.min(600, Math.max(160, 360 / maxDelta));
        }
      }

      // Smoothly update translate & scale
      setScale(targetScale);
      setTranslate([
        width / 2 - cx * targetScale,
        height / 2 - cy * targetScale
      ]);
    } catch (e) {
      console.error("Error centering map on country:", e);
    }
  };

  // Listen for external selections or compare resets to center
  useEffect(() => {
    if (selectedCountry && geoData.length > 0) {
      const matched = geoData.find(f => getCode(f) === selectedCountry);
      if (matched) {
        centerOnCountry(matched);
      }
    }
  }, [selectedCountry, geoData]);

  // Drag handlers
  const handleMouseDown = (e: React.MouseEvent<SVGSVGElement>) => {
    // Only drag with left click
    if (e.button !== 0) return;
    setIsDragging(true);
    dragStart.current = [e.clientX, e.clientY];
    translateStart.current = [...translate] as [number, number];
  };

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (isDragging) {
      const dx = e.clientX - dragStart.current[0];
      const dy = e.clientY - dragStart.current[1];
      setTranslate([
        translateStart.current[0] + dx,
        translateStart.current[1] + dy
      ]);
    }
    
    // Update tooltip position
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltipPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Zoom handlers
  const handleZoom = (factor: number) => {
    setScale(prev => Math.min(1200, Math.max(80, prev * factor)));
  };

  const handleReset = () => {
    setScale(140);
    setTranslate([480, 260]);
    onCountrySelect("");
  };

  const handleWheel = (e: React.WheelEvent<SVGSVGElement>) => {
    e.preventDefault();
    const factor = e.deltaY < 0 ? 1.15 : 0.85;
    
    // Zoom towards cursor location
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Get mouse coordinates in projection coordinates before scale
    const [px, py] = projection.invert?.([mouseX, mouseY]) || [0, 0];
    
    setScale(prev => {
      const nextScale = Math.min(1200, Math.max(80, prev * factor));
      // Re-calculate translation to keep cursor in place
      const nextProj = d3.geoMercator().scale(nextScale).translate(translate);
      const [nx, ny] = nextProj([px, py]) || [0, 0];
      
      setTranslate(prevTranslate => [
        prevTranslate[0] + (mouseX - nx),
        prevTranslate[1] + (mouseY - ny)
      ]);
      
      return nextScale;
    });
  };

  return (
    <div className="relative w-full h-full flex flex-col bg-slate-950 overflow-hidden select-none border border-slate-800 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.8)]">
      {/* Background cyber grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,24,38,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(18,24,38,0.3)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none" />
      <div className="absolute inset-0 bg-radial-gradient(ellipse_at_center,transparent_40%,rgba(2,6,23,0.95)) pointer-events-none" />

      {/* Cyberpunk Map Header Banner */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-3 bg-slate-900/80 backdrop-blur-md px-4 py-2 rounded-xl border border-slate-700/50 shadow-lg">
        <div className="w-2.5 h-2.5 rounded-full bg-cyan-500 animate-pulse" />
        <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-semibold">
          Antigravity Geopolitical Core v1.0
        </span>
      </div>

      {/* Zoom Controls Overlay */}
      <div className="absolute right-4 top-4 z-10 flex flex-col gap-2">
        <button
          onClick={() => handleZoom(1.3)}
          className="p-3 bg-slate-900/80 hover:bg-slate-800 backdrop-blur-md border border-slate-700/50 rounded-xl text-cyan-400 hover:text-cyan-300 hover:shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all cursor-pointer"
          title="Zoom In"
        >
          <ZoomIn size={18} />
        </button>
        <button
          onClick={() => handleZoom(0.7)}
          className="p-3 bg-slate-900/80 hover:bg-slate-800 backdrop-blur-md border border-slate-700/50 rounded-xl text-cyan-400 hover:text-cyan-300 hover:shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all cursor-pointer"
          title="Zoom Out"
        >
          <ZoomOut size={18} />
        </button>
        <button
          onClick={handleReset}
          className="p-3 bg-slate-900/80 hover:bg-slate-800 backdrop-blur-md border border-slate-700/50 rounded-xl text-cyan-400 hover:text-cyan-300 hover:shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all cursor-pointer"
          title="Reset View"
        >
          <RotateCcw size={18} />
        </button>
      </div>

      {loading ? (
        <div className="flex-1 flex flex-col items-center justify-center gap-4 text-cyan-400 font-mono">
          <div className="w-12 h-12 border-4 border-cyan-500/20 border-t-cyan-400 rounded-full animate-spin" />
          <p className="animate-pulse tracking-widest text-sm">CALIBRATING GEOGRAPHIC MATRIX...</p>
        </div>
      ) : (
        <svg
          className={`flex-1 w-full h-full ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
          viewBox={`0 0 ${width} ${height}`}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onWheel={handleWheel}
        >
          {/* Custom SVG Filters for Cyberpunk Glows */}
          <defs>
            <filter id="neon-glow-cyan" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="neon-glow-magenta" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="neon-glow-green" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            
            {/* Gradients */}
            <linearGradient id="selected-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ec4899" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>
            <linearGradient id="compare-a-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f43f5e" />
              <stop offset="100%" stopColor="#be123c" />
            </linearGradient>
            <linearGradient id="compare-b-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#047857" stopOpacity="0.9" />
            </linearGradient>
            <linearGradient id="hover-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
          </defs>

          {/* Graticule / Globe Grid lines */}
          <g opacity="0.15">
            {d3.geoGraticule().lines().map((line, idx) => (
              <path
                key={idx}
                d={pathGenerator(line) || undefined}
                fill="none"
                stroke="#0ea5e9"
                strokeWidth="0.5"
              />
            ))}
          </g>

          {/* Country Paths */}
          <g>
            {geoData.map((feature, idx) => {
              const code = getCode(feature);
              const isSelected = selectedCountry === code;
              const isCompareA = compareCountryA === code;
              const isCompareB = compareCountryB === code;
              const isHovered = hoveredCountry === code;
              
              // Colors based on states
              let fill = "rgba(13, 27, 42, 0.75)";
              let stroke = "rgba(56, 189, 248, 0.25)";
              let strokeWidth = "0.75";
              let filter = "";

              if (isSelected) {
                fill = "url(#selected-gradient)";
                stroke = "#ec4899";
                strokeWidth = "2.5";
                filter = "url(#neon-glow-magenta)";
              } else if (isCompareA) {
                fill = "url(#compare-a-gradient)";
                stroke = "#f43f5e";
                strokeWidth = "2.5";
                filter = "url(#neon-glow-magenta)";
              } else if (isCompareB) {
                fill = "url(#compare-b-gradient)";
                stroke = "#10b981";
                strokeWidth = "2.5";
                filter = "url(#neon-glow-green)";
              } else if (isHovered) {
                fill = "url(#hover-gradient)";
                stroke = "#06b6d4";
                strokeWidth = "2";
                filter = "url(#neon-glow-cyan)";
              }

              return (
                <path
                  key={idx}
                  d={pathGenerator(feature as any) || undefined}
                  fill={fill}
                  stroke={stroke}
                  strokeWidth={strokeWidth}
                  filter={filter}
                  className="transition-all duration-300 ease-out"
                  style={{
                    transformOrigin: 'center'
                  }}
                  onMouseEnter={() => {
                    setHoveredCountry(code);
                    setTooltipCountry(feature);
                  }}
                  onMouseLeave={() => {
                    setHoveredCountry(null);
                    setTooltipCountry(null);
                  }}
                  onClick={() => {
                    if (isCompareMode) {
                      onSelectCompare(code);
                    } else {
                      onCountrySelect(code);
                      centerOnCountry(feature);
                    }
                  }}
                />
              );
            })}
          </g>
        </svg>
      )}

      {/* Sleek Cyber Tooltip on Hover */}
      <AnimatePresence>
        {tooltipCountry && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.15 }}
            className="absolute z-20 pointer-events-none bg-slate-900/90 backdrop-blur-md border border-cyan-500/50 rounded-xl px-4 py-3 shadow-[0_0_20px_rgba(6,182,212,0.3)] min-w-[200px]"
            style={{
              left: tooltipPos.x + 15,
              top: tooltipPos.y + 15
            }}
          >
            <div className="flex items-center gap-3 mb-2">
              <img
                src={`https://flagcdn.com/w80/${getCode(tooltipCountry).substring(0, 2).toLowerCase()}.png`}
                alt={tooltipCountry.properties.NAME}
                className="w-7 h-5 object-cover rounded border border-slate-700 shadow-sm"
                onError={(e) => {
                  // Fallback if flagcdn fails
                  e.currentTarget.style.display = 'none';
                }}
              />
              <div>
                <h4 className="text-sm font-semibold text-white tracking-wide">
                  {tooltipCountry.properties.NAME}
                </h4>
                <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest">
                  {getCode(tooltipCountry)}
                </span>
              </div>
            </div>
            
            <div className="border-t border-slate-800/80 pt-2 flex flex-col gap-1 text-[11px] font-mono text-slate-300">
              <div className="flex justify-between">
                <span className="text-slate-500">Continent:</span>
                <span>{tooltipCountry.properties.CONTINENT}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Population:</span>
                <span>
                  {tooltipCountry.properties.POP_EST 
                    ? (tooltipCountry.properties.POP_EST / 1e6).toFixed(1) + "M"
                    : "Unknown"}
                </span>
              </div>
              <div className="flex items-center gap-1 mt-1 text-[10px] text-cyan-400 border-t border-slate-800/50 pt-1.5 animate-pulse">
                <MapPin size={10} />
                <span>Click to view telemetry</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
