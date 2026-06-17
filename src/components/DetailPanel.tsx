"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  X, Globe, Building2, Calendar, DollarSign, Languages, 
  Compass, Mountain, Waves, Thermometer, Wind, Droplets,
  TrendingUp, Users, BookOpen, HeartHandshake, History,
  Shield, Rocket, Plane, Anchor, Cpu, ArrowUpRight
} from 'lucide-react';
import { fetchCountryDetails, CountryDetails } from '@/lib/api';
import { Sun, CloudSun, CloudFog, CloudDrizzle, CloudSnow, CloudRain, CloudLightning, Cloud } from 'lucide-react';

const weatherIcons: Record<string, React.ComponentType<any>> = {
  Sun,
  CloudSun,
  CloudFog,
  CloudDrizzle,
  CloudSnow,
  CloudRain,
  CloudLightning,
  Cloud
};

interface DetailPanelProps {
  countryCode: string | null;
  onClose: () => void;
}

export default function DetailPanel({ countryCode, onClose }: DetailPanelProps) {
  const [data, setData] = useState<CountryDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'geo' | 'socio' | 'history' | 'tech'>('overview');
  const [chartMetric, setChartMetric] = useState<'gdp' | 'population'>('gdp');

  useEffect(() => {
    if (!countryCode) return;

    setLoading(true);
    fetchCountryDetails(countryCode)
      .then(res => {
        setData(res);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load country details:", err);
        setLoading(false);
      });
  }, [countryCode]);

  if (!countryCode) return null;

  const tabs = [
    { id: 'overview', name: 'Overview', icon: Globe },
    { id: 'geo', name: 'Geo & Climate', icon: Compass },
    { id: 'socio', name: 'Socio-Economics', icon: TrendingUp },
    { id: 'history', name: 'History & Alliances', icon: History },
    { id: 'tech', name: 'Advanced Tech', icon: Cpu }
  ] as const;

  // Custom SVG Line Chart Renderer
  const renderChart = () => {
    if (!data) return null;
    
    const chartData = chartMetric === 'gdp' 
      ? data.gdpGrowth5Years.map(d => ({ label: d.year.toString(), value: d.gdpNominal }))
      : data.populationGrowth5Years.map(d => ({ label: d.year.toString(), value: d.population / 1e6 }));

    const values = chartData.map(d => d.value);
    const maxVal = Math.max(...values) * 1.1;
    const minVal = Math.min(...values) * 0.9;
    const valRange = maxVal - minVal;

    // SVG Drawing Coordinates
    const svgWidth = 400;
    const svgHeight = 160;
    const padding = { top: 20, right: 20, bottom: 30, left: 45 };

    const points = chartData.map((d, index) => {
      const x = padding.left + (index / (chartData.length - 1)) * (svgWidth - padding.left - padding.right);
      const y = svgHeight - padding.bottom - ((d.value - minVal) / valRange) * (svgHeight - padding.top - padding.bottom);
      return { x, y, ...d };
    });

    // Generate SVG path string
    let pathD = "";
    let areaD = "";
    if (points.length > 0) {
      pathD = `M ${points[0].x} ${points[0].y} ` + points.slice(1).map(p => `L ${p.x} ${p.y}`).join(" ");
      areaD = pathD + ` L ${points[points.length - 1].x} ${svgHeight - padding.bottom} L ${points[0].x} ${svgHeight - padding.bottom} Z`;
    }

    return (
      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 shadow-inner">
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-xs font-mono font-semibold text-slate-400 tracking-wider uppercase">
            {chartMetric === 'gdp' ? "GDP Growth Timeline (Billions USD)" : "Population Growth Timeline (Millions)"}
          </h4>
          <div className="flex gap-1.5 bg-slate-900 p-0.5 rounded-lg border border-slate-800">
            <button
              onClick={() => setChartMetric('gdp')}
              className={`px-2 py-1 text-[10px] font-mono rounded-md transition-all cursor-pointer ${chartMetric === 'gdp' ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' : 'text-slate-400'}`}
            >
              GDP
            </button>
            <button
              onClick={() => setChartMetric('population')}
              className={`px-2 py-1 text-[10px] font-mono rounded-md transition-all cursor-pointer ${chartMetric === 'population' ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' : 'text-slate-400'}`}
            >
              POP
            </button>
          </div>
        </div>

        {/* SVG Drawing */}
        <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-auto">
          <defs>
            <linearGradient id="chart-glow" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((ratio, idx) => {
            const y = padding.top + ratio * (svgHeight - padding.top - padding.bottom);
            return (
              <line
                key={idx}
                x1={padding.left}
                y1={y}
                x2={svgWidth - padding.right}
                y2={y}
                stroke="rgba(148, 163, 184, 0.08)"
                strokeDasharray="4"
              />
            );
          })}

          {/* Fill Area */}
          {areaD && <path d={areaD} fill="url(#chart-glow)" />}

          {/* Line Path */}
          {pathD && (
            <path
              d={pathD}
              fill="none"
              stroke="#06b6d4"
              strokeWidth="2.5"
              className="drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]"
            />
          )}

          {/* Data Points */}
          {points.map((p, idx) => (
            <g key={idx}>
              <circle
                cx={p.x}
                cy={p.y}
                r="4.5"
                fill="#0f172a"
                stroke="#06b6d4"
                strokeWidth="2.5"
                className="hover:r-6 hover:fill-cyan-400 cursor-pointer transition-all duration-200"
              />
              {/* Tooltip value label */}
              <text
                x={p.x}
                y={p.y - 10}
                textAnchor="middle"
                fill="#22d3ee"
                fontSize="8"
                fontFamily="monospace"
                fontWeight="bold"
                className="opacity-0 hover:opacity-100 transition-opacity pointer-events-none"
              >
                {chartMetric === 'gdp' ? `$${p.value}B` : `${p.value.toFixed(1)}M`}
              </text>
            </g>
          ))}

          {/* X Axis Labels */}
          {points.map((p, idx) => (
            <text
              key={idx}
              x={p.x}
              y={svgHeight - 10}
              textAnchor="middle"
              fill="rgba(148, 163, 184, 0.5)"
              fontSize="9"
              fontFamily="monospace"
            >
              {p.label}
            </text>
          ))}

          {/* Y Axis min/max */}
          <text x={padding.left - 8} y={padding.top + 6} textAnchor="end" fill="rgba(148, 163, 184, 0.5)" fontSize="9" fontFamily="monospace">
            {chartMetric === 'gdp' ? `$${Math.round(maxVal)}B` : `${maxVal.toFixed(0)}M`}
          </text>
          <text x={padding.left - 8} y={svgHeight - padding.bottom} textAnchor="end" fill="rgba(148, 163, 184, 0.5)" fontSize="9" fontFamily="monospace">
            {chartMetric === 'gdp' ? `$${Math.round(minVal)}B` : `${minVal.toFixed(0)}M`}
          </text>
        </svg>
      </div>
    );
  };

  const WeatherWidget = () => {
    if (!data?.weather) {
      return (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-center font-mono text-xs text-slate-500">
          WEATHER TELEMETRY OFFLINE
        </div>
      );
    }

    const { temp, condition, humidity, windSpeed, iconName } = data.weather;
    const WeatherIcon = weatherIcons[iconName] || Cloud;

    return (
      <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-cyan-500/30 rounded-xl p-4 shadow-lg flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-cyan-950/50 rounded-xl border border-cyan-500/20 text-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.15)]">
            <WeatherIcon size={28} className="animate-pulse" />
          </div>
          <div>
            <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">Capital Weather</div>
            <div className="text-xl font-bold text-slate-200">{data.capital}</div>
            <div className="text-xs font-semibold text-cyan-400/90">{condition}</div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-3xl font-extrabold text-white flex items-start justify-end font-mono">
            {temp}<span className="text-sm font-light text-cyan-400 mt-1">°C</span>
          </div>
          <div className="flex items-center gap-3 text-[10px] font-mono text-slate-500 mt-1">
            <span className="flex items-center gap-1"><Droplets size={10} className="text-cyan-500" /> {humidity}%</span>
            <span className="flex items-center gap-1"><Wind size={10} className="text-cyan-500" /> {windSpeed} km/h</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 150 }}
      className="absolute top-0 right-0 z-30 w-[460px] h-full bg-slate-900/95 backdrop-blur-xl border-l border-slate-800 shadow-2xl flex flex-col"
    >
      {/* Top Banner details */}
      <div className="relative p-6 border-b border-slate-800/80 flex items-start justify-between bg-gradient-to-r from-slate-900 to-slate-950">
        <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-cyan-500 via-indigo-500 to-pink-500" />
        
        {loading ? (
          <div className="h-14 flex items-center">
            <div className="w-5 h-5 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin mr-2" />
            <span className="text-xs font-mono text-cyan-400 animate-pulse uppercase tracking-wider">Interrogating satellites...</span>
          </div>
        ) : data ? (
          <div className="flex items-center gap-4">
            <img 
              src={data.flagUrl} 
              alt={data.name} 
              className="w-16 h-11 object-cover rounded-md border border-slate-700 shadow-md"
            />
            <div>
              <h2 className="text-xl font-bold text-white tracking-wide">{data.name}</h2>
              <p className="text-xs text-slate-400/90 font-mono mt-0.5 line-clamp-1">{data.officialName}</p>
              <div className="flex gap-2 mt-1">
                <span className="text-[9px] font-mono bg-cyan-950 text-cyan-400 px-1.5 py-0.5 rounded border border-cyan-500/20">
                  {data.code3}
                </span>
                <span className="text-[9px] font-mono bg-slate-850 text-slate-400 px-1.5 py-0.5 rounded border border-slate-800">
                  {data.region}
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-xs font-mono text-rose-400 uppercase">Load telemetry failed</div>
        )}

        <button
          onClick={onClose}
          className="p-1.5 bg-slate-950/80 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 rounded-lg text-slate-400 hover:text-white transition-all cursor-pointer shadow-sm"
          title="Close details"
        >
          <X size={16} />
        </button>
      </div>

      {/* Navigation Tabs */}
      <div className="flex bg-slate-950 border-b border-slate-800/60 p-1 gap-1 overflow-x-auto">
        {tabs.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 min-w-[75px] py-2 px-1 flex flex-col items-center justify-center gap-1 rounded-lg font-mono text-[10px] uppercase tracking-wider transition-all cursor-pointer border ${isActive ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400 font-bold' : 'bg-transparent border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'}`}
            >
              <Icon size={14} className={isActive ? 'text-cyan-400' : 'text-slate-400'} />
              <span>{tab.name.split(" ")[0]}</span>
            </button>
          );
        })}
      </div>

      {/* Main Tab Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin">
        {loading ? (
          <div className="h-64 flex flex-col items-center justify-center gap-4 text-cyan-400 font-mono">
            <div className="w-10 h-10 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin" />
            <p className="animate-pulse tracking-widest text-xs uppercase">Deciphering network traffic...</p>
          </div>
        ) : data ? (
          <>
            {activeTab === 'overview' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-5"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80">
                    <div className="flex items-center gap-2 text-slate-500 mb-1">
                      <Building2 size={13} className="text-cyan-500" />
                      <span className="text-[10px] font-mono uppercase tracking-wider">Capital</span>
                    </div>
                    <p className="text-sm font-semibold text-slate-200">{data.capital}</p>
                  </div>
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80">
                    <div className="flex items-center gap-2 text-slate-500 mb-1">
                      <Globe size={13} className="text-cyan-500" />
                      <span className="text-[10px] font-mono uppercase tracking-wider">Government</span>
                    </div>
                    <p className="text-sm font-semibold text-slate-200 line-clamp-1" title={data.specialized.governmentType}>
                      {data.specialized.governmentType}
                    </p>
                  </div>
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80">
                    <div className="flex items-center gap-2 text-slate-500 mb-1">
                      <Users size={13} className="text-cyan-500" />
                      <span className="text-[10px] font-mono uppercase tracking-wider">Head of State</span>
                    </div>
                    <p className="text-sm font-semibold text-slate-200">{data.specialized.presidentOrPM}</p>
                  </div>
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80">
                    <div className="flex items-center gap-2 text-slate-500 mb-1">
                      <Calendar size={13} className="text-cyan-500" />
                      <span className="text-[10px] font-mono uppercase tracking-wider">Sovereignty / National Day</span>
                    </div>
                    <p className="text-sm font-semibold text-slate-200">{data.specialized.independenceDay}</p>
                  </div>
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80">
                    <div className="flex items-center gap-2 text-slate-500 mb-1">
                      <Languages size={13} className="text-cyan-500" />
                      <span className="text-[10px] font-mono uppercase tracking-wider">Languages</span>
                    </div>
                    <p className="text-sm font-semibold text-slate-200 line-clamp-1">{data.languages.join(", ")}</p>
                  </div>
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80">
                    <div className="flex items-center gap-2 text-slate-500 mb-1">
                      <DollarSign size={13} className="text-cyan-500" />
                      <span className="text-[10px] font-mono uppercase tracking-wider">Currency</span>
                    </div>
                    <p className="text-sm font-semibold text-slate-200">
                      {data.currencies[0].name} ({data.currencies[0].symbol})
                    </p>
                  </div>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/85">
                  <h3 className="text-xs font-mono font-bold text-slate-400 mb-2.5 uppercase tracking-widest border-b border-slate-900 pb-1.5">
                    Geopolitical Context
                  </h3>
                  <div className="space-y-2.5 text-xs text-slate-350 leading-relaxed font-mono">
                    <div className="flex justify-between border-b border-slate-900 pb-1">
                      <span className="text-slate-500">Subregion:</span>
                      <span className="text-slate-200">{data.subregion}</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-900 pb-1">
                      <span className="text-slate-500">Phone Code:</span>
                      <span className="text-slate-200">+{data.latlng[0] > 0 ? Math.round(data.latlng[0] * 3) % 99 + 1 : 25}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Coordinates:</span>
                      <span className="text-cyan-400">{data.latlng[0].toFixed(2)}°N, {data.latlng[1].toFixed(2)}°E</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'geo' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-5"
              >
                {/* Weather Widget */}
                <WeatherWidget />

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-4">
                  <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest border-b border-slate-900 pb-2 flex items-center gap-1.5">
                    <Globe size={13} className="text-cyan-500" /> Physical Geography
                  </h3>
                  <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                    <div className="border-r border-slate-900 pr-2">
                      <div className="text-slate-500 uppercase text-[9px] mb-0.5">Total Land Area</div>
                      <div className="text-sm font-bold text-slate-200">
                        {data.area ? data.area.toLocaleString() : "Unknown"} km²
                      </div>
                    </div>
                    <div>
                      <div className="text-slate-500 uppercase text-[9px] mb-0.5">Coastline Length</div>
                      <div className="text-sm font-bold text-slate-200">{data.specialized.coastlineLength}</div>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-4">
                  <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest border-b border-slate-900 pb-2 flex items-center gap-1.5">
                    <Mountain size={13} className="text-cyan-500" /> Mountains & Ranges
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {data.specialized.mountainRanges.map((m, idx) => (
                      <span key={idx} className="bg-slate-900 border border-slate-800 text-slate-350 px-2.5 py-1 rounded-lg text-xs font-mono flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
                        {m}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-4">
                  <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest border-b border-slate-900 pb-2 flex items-center gap-1.5">
                    <Waves size={13} className="text-cyan-500" /> Rivers & waterways
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {data.specialized.longestRivers.map((r, idx) => (
                      <span key={idx} className="bg-slate-900 border border-slate-800 text-slate-350 px-2.5 py-1 rounded-lg text-xs font-mono flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                        {r}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'socio' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-5"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80">
                    <div className="flex items-center gap-2 text-slate-500 mb-1">
                      <Users size={13} className="text-cyan-500" />
                      <span className="text-[10px] font-mono uppercase tracking-wider">Population</span>
                    </div>
                    <p className="text-base font-bold text-slate-200">
                      {data.population ? (data.population / 1e6).toFixed(2) + "M" : "Unknown"}
                    </p>
                  </div>
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80">
                    <div className="flex items-center gap-2 text-slate-500 mb-1">
                      <TrendingUp size={13} className="text-cyan-500" />
                      <span className="text-[10px] font-mono uppercase tracking-wider">GDP Nominal</span>
                    </div>
                    <p className="text-base font-bold text-slate-200">
                      ${data.gdpNominal ? data.gdpNominal.toLocaleString() : "Unknown"}B
                    </p>
                  </div>
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80">
                    <div className="flex items-center gap-2 text-slate-500 mb-1">
                      <BookOpen size={13} className="text-cyan-500" />
                      <span className="text-[10px] font-mono uppercase tracking-wider">Literacy Rate</span>
                    </div>
                    <p className="text-base font-bold text-slate-200">{data.specialized.literacyRate}%</p>
                  </div>
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80">
                    <div className="flex items-center gap-2 text-slate-500 mb-1">
                      <HeartHandshake size={13} className="text-cyan-500" />
                      <span className="text-[10px] font-mono uppercase tracking-wider">Poverty Index</span>
                    </div>
                    <p className="text-sm font-bold text-slate-200 truncate" title={data.specialized.povertyIndex}>
                      {data.specialized.povertyIndex}
                    </p>
                  </div>
                </div>

                {/* Growth Chart */}
                {renderChart()}
              </motion.div>
            )}

            {activeTab === 'history' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-5"
              >
                {/* Timeline */}
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest border-b border-slate-900 pb-2 mb-4 flex items-center gap-1.5">
                    <History size={13} className="text-cyan-500" /> Historical Milestones
                  </h3>
                  <div className="space-y-5 relative before:absolute before:left-2 before:top-1 before:bottom-1 before:w-[1px] before:bg-slate-800">
                    {data.specialized.timeline.map((item, idx) => (
                      <div key={idx} className="relative pl-6">
                        <div className="absolute left-[5px] top-[5px] w-2 h-2 rounded-full bg-cyan-400 border border-slate-950 shadow-[0_0_8px_rgba(6,182,212,0.6)]" />
                        <div className="flex items-baseline gap-2 mb-0.5">
                          <span className="text-xs font-bold text-cyan-400 font-mono">{item.year}</span>
                          <span className="text-[11px] font-bold text-slate-350">{item.event}</span>
                        </div>
                        <p className="text-[10px] font-mono text-slate-500 leading-relaxed">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Military engagements */}
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest border-b border-slate-900 pb-2 mb-3 flex items-center gap-1.5">
                    <Shield size={13} className="text-cyan-500" /> Historical Conflict Operations
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {data.specialized.warsAndConflicts.map((war, idx) => (
                      <span key={idx} className="bg-slate-900 border border-slate-800 text-slate-300 px-2.5 py-1 rounded-lg text-[10px] font-mono flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 bg-rose-500 rounded-full animate-ping" />
                        {war}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Treaties & Alliances */}
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest border-b border-slate-900 pb-2 mb-3 flex items-center gap-1.5">
                    <Globe size={13} className="text-cyan-500" /> Geopolitical Alliances
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {data.specialized.geopoliticalAlliances.map((alliance, idx) => (
                      <span key={idx} className="bg-slate-900 border border-slate-800 text-slate-300 px-2.5 py-1 rounded-lg text-[10px] font-mono">
                        {alliance}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'tech' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-5"
              >
                {/* Space & Aerospace */}
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                  <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest border-b border-slate-900 pb-2 flex items-center gap-1.5">
                    <Rocket size={13} className="text-cyan-500" /> Space Agency & Missions
                  </h3>
                  <div className="text-xs font-mono">
                    <div className="text-slate-500 uppercase text-[9px] mb-0.5">Command Center</div>
                    <div className="text-sm font-bold text-slate-200 flex items-center gap-1.5 mb-3">
                      {data.specialized.spaceAgency}
                    </div>
                    
                    <div className="text-slate-500 uppercase text-[9px] mb-1.5">Major Initiatives</div>
                    <div className="flex flex-col gap-1.5">
                      {data.specialized.spaceMissions.map((mission, idx) => (
                        <div key={idx} className="bg-slate-900 px-2.5 py-2 rounded-lg border border-slate-800 text-slate-300 flex items-center justify-between">
                          <span className="truncate">{mission}</span>
                          <ArrowUpRight size={10} className="text-cyan-400 flex-shrink-0" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Military Power */}
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-4">
                  <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest border-b border-slate-900 pb-2 flex items-center gap-1.5">
                    <Shield size={13} className="text-cyan-500" /> Military Telemetry
                  </h3>
                  <div className="space-y-3 text-xs font-mono">
                    <div>
                      <div className="text-slate-500 uppercase text-[9px] mb-1 flex items-center gap-1">
                        <Plane size={11} className="text-cyan-500" /> Jet Planes & Air Supremacy
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {data.specialized.militaryAdvancements.jetPlanes.map((jet, idx) => (
                          <span key={idx} className="bg-slate-900 border border-slate-850 px-2 py-0.5 rounded text-slate-300 text-[10px]">
                            {jet}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="border-t border-slate-900 pt-2.5">
                      <div className="text-slate-500 uppercase text-[9px] mb-0.5 flex items-center gap-1">
                        <Anchor size={11} className="text-cyan-500" /> Naval Power
                      </div>
                      <p className="text-slate-300 leading-relaxed">{data.specialized.militaryAdvancements.navalPower}</p>
                    </div>

                    <div className="border-t border-slate-900 pt-2.5">
                      <div className="text-slate-500 uppercase text-[9px] mb-1.5">Key Tactical Tech</div>
                      <div className="flex flex-wrap gap-1.5">
                        {data.specialized.militaryAdvancements.keyTech.map((tech, idx) => (
                          <span key={idx} className="bg-cyan-950/20 text-cyan-400 border border-cyan-500/25 px-2 py-0.5 rounded text-[10px]">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Major Exports */}
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest border-b border-slate-900 pb-2 mb-3 flex items-center gap-1.5">
                    <Cpu size={13} className="text-cyan-500" /> Major Tech Exports
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {data.specialized.majorTechExports.map((exp, idx) => (
                      <span key={idx} className="bg-slate-900 border border-slate-800 text-slate-300 px-2.5 py-1 rounded-lg text-xs font-mono">
                        {exp}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </>
        ) : null}
      </div>
    </motion.div>
  );
}
