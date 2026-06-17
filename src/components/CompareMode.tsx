"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Scale, Globe, Building2, Users, TrendingUp, Cpu, Shield, Sparkles, Thermometer, Droplets, Wind, RotateCcw } from 'lucide-react';
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

interface CompareModeProps {
  countryCodeA: string | null;
  countryCodeB: string | null;
  onClose: () => void;
  onReset: () => void;
}

export default function CompareMode({
  countryCodeA,
  countryCodeB,
  onClose,
  onReset
}: CompareModeProps) {
  const [dataA, setDataA] = useState<CountryDetails | null>(null);
  const [dataB, setDataB] = useState<CountryDetails | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!countryCodeA && !countryCodeB) return;

    const loadData = async () => {
      setLoading(true);
      try {
        const fetches = [];
        if (countryCodeA) fetches.push(fetchCountryDetails(countryCodeA));
        else fetches.push(Promise.resolve(null));

        if (countryCodeB) fetches.push(fetchCountryDetails(countryCodeB));
        else fetches.push(Promise.resolve(null));

        const [resA, resB] = await Promise.all(fetches);
        setDataA(resA);
        setDataB(resB);
      } catch (error) {
        console.error("Error loading comparative country data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [countryCodeA, countryCodeB]);

  // Clean Weather renderer
  const renderWeather = (data: CountryDetails | null) => {
    if (!data?.weather) return <span className="text-slate-600">OFFLINE</span>;
    const { temp, condition, humidity, windSpeed, iconName } = data.weather;
    const WeatherIcon = weatherIcons[iconName] || Cloud;
    
    return (
      <div className="flex items-center gap-2 font-mono text-[11px] text-slate-350 bg-slate-950 px-2.5 py-1.5 rounded-lg border border-slate-900">
        <WeatherIcon size={12} className="text-cyan-400 animate-pulse" />
        <span>{temp}°C</span>
        <span className="text-slate-600">|</span>
        <span className="truncate max-w-[80px]">{condition}</span>
      </div>
    );
  };

  // Custom SVG bar gauge for comparing values side-by-side
  const renderBarGauge = (valA: number, valB: number, formatter: (val: number) => string, label: string) => {
    const total = valA + valB;
    const percentA = total > 0 ? (valA / total) * 100 : 50;
    const percentB = total > 0 ? (valB / total) * 100 : 50;

    return (
      <div className="space-y-2 py-3 border-b border-slate-900 font-mono">
        <div className="flex justify-between text-xs text-slate-400 px-1">
          <span className="text-rose-400 font-semibold">{formatter(valA)}</span>
          <span className="text-[10px] text-slate-500 uppercase tracking-widest">{label}</span>
          <span className="text-emerald-400 font-semibold">{formatter(valB)}</span>
        </div>
        <div className="h-2 w-full bg-slate-950 rounded-full flex overflow-hidden border border-slate-900">
          <div 
            style={{ width: `${percentA}%` }} 
            className="h-full bg-gradient-to-r from-rose-600 to-rose-400 transition-all duration-700 shadow-[0_0_10px_rgba(244,63,94,0.3)]"
          />
          <div 
            style={{ width: `${percentB}%` }} 
            className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600 transition-all duration-700 shadow-[0_0_10px_rgba(16,185,129,0.3)]"
          />
        </div>
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      className="absolute inset-0 z-40 bg-slate-950/98 backdrop-blur-md p-6 flex flex-col overflow-y-auto"
    >
      {/* Header Panel */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-cyan-950/30 rounded-xl border border-cyan-500/20 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
            <Scale size={20} className="animate-pulse" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white tracking-wider font-mono uppercase">Geopolitical Comparison Console</h2>
            <p className="text-xs text-slate-400 font-mono">Side-by-side analysis of sovereign telemetry vectors</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button
            onClick={onReset}
            className="px-3.5 py-1.5 bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl text-xs font-mono text-slate-400 hover:text-white flex items-center gap-2 transition-all cursor-pointer"
            title="Reset Selections"
          >
            <RotateCcw size={12} />
            <span>Reset Selections</span>
          </button>
          <button
            onClick={onClose}
            className="p-1.5 bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl text-slate-400 hover:text-white transition-all cursor-pointer"
            title="Exit Compare Mode"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex-1 flex flex-col items-center justify-center gap-4 text-cyan-400 font-mono">
          <div className="w-10 h-10 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin" />
          <p className="animate-pulse tracking-widest text-xs uppercase">SYNCING DATABASES...</p>
        </div>
      ) : (
        <div className="flex-1 grid grid-cols-1 md:grid-cols-7 gap-6 max-w-6xl mx-auto w-full">
          {/* Country A Left Column */}
          <div className="md:col-span-3 bg-slate-900/40 border border-rose-500/10 rounded-2xl p-5 shadow-lg flex flex-col gap-5 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-rose-600 to-rose-400" />
            
            {dataA ? (
              <>
                <div className="flex items-center gap-4 border-b border-slate-800 pb-4">
                  <img src={dataA.flagUrl} alt={dataA.name} className="w-14 h-10 object-cover rounded-md border border-slate-700" />
                  <div>
                    <h3 className="text-lg font-bold text-white tracking-wide">{dataA.name}</h3>
                    <span className="text-[10px] font-mono text-rose-400 uppercase tracking-widest">Vector A // {dataA.code3}</span>
                  </div>
                </div>

                {/* Info Block */}
                <div className="space-y-4 font-mono text-xs">
                  <div className="flex justify-between border-b border-slate-850 pb-2">
                    <span className="text-slate-500 flex items-center gap-1.5"><Building2 size={12} /> Capital</span>
                    <span className="text-slate-200 font-bold">{dataA.capital}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-850 pb-2">
                    <span className="text-slate-500 flex items-center gap-1.5"><Globe size={12} /> Gov Type</span>
                    <span className="text-slate-200 text-right truncate max-w-[180px]" title={dataA.specialized.governmentType}>{dataA.specialized.governmentType}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-850 pb-2">
                    <span className="text-slate-500 flex items-center gap-1.5"><Users size={12} /> Head of State</span>
                    <span className="text-slate-200">{dataA.specialized.presidentOrPM}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-850 pb-2">
                    <span className="text-slate-500 flex items-center gap-1.5"><Thermometer size={12} /> Weather</span>
                    <span>{renderWeather(dataA)}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-850 pb-2">
                    <span className="text-slate-500 flex items-center gap-1.5"><Cpu size={12} /> Space Agency</span>
                    <span className="text-slate-200 max-w-[180px] text-right truncate">{dataA.specialized.spaceAgency.split(" (")[0]}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 flex items-center gap-1.5"><Shield size={12} /> Key Jet Plane</span>
                    <span className="text-slate-200">{dataA.specialized.militaryAdvancements.jetPlanes[0] || "None"}</span>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center gap-2 border border-dashed border-slate-800 rounded-xl p-6 text-center text-slate-500 font-mono text-xs">
                <span>VECTOR A UNINITIALIZED</span>
                <span className="text-[10px] text-slate-600">Select first country on the map</span>
              </div>
            )}
          </div>

          {/* Central Comparison Gauges Panel */}
          <div className="md:col-span-1 flex flex-col items-center justify-center font-mono text-xs font-bold text-cyan-400">
            <div className="w-10 h-10 rounded-full border border-slate-850 flex items-center justify-center bg-slate-900/50 shadow-inner">
              VS
            </div>
          </div>

          {/* Country B Right Column */}
          <div className="md:col-span-3 bg-slate-900/40 border border-emerald-500/10 rounded-2xl p-5 shadow-lg flex flex-col gap-5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-full h-[3px] bg-gradient-to-r from-emerald-400 to-emerald-600" />
            
            {dataB ? (
              <>
                <div className="flex items-center gap-4 border-b border-slate-800 pb-4">
                  <img src={dataB.flagUrl} alt={dataB.name} className="w-14 h-10 object-cover rounded-md border border-slate-700" />
                  <div>
                    <h3 className="text-lg font-bold text-white tracking-wide">{dataB.name}</h3>
                    <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest">Vector B // {dataB.code3}</span>
                  </div>
                </div>

                {/* Info Block */}
                <div className="space-y-4 font-mono text-xs">
                  <div className="flex justify-between border-b border-slate-850 pb-2">
                    <span className="text-slate-500 flex items-center gap-1.5"><Building2 size={12} /> Capital</span>
                    <span className="text-slate-200 font-bold">{dataB.capital}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-850 pb-2">
                    <span className="text-slate-500 flex items-center gap-1.5"><Globe size={12} /> Gov Type</span>
                    <span className="text-slate-200 text-right truncate max-w-[180px]" title={dataB.specialized.governmentType}>{dataB.specialized.governmentType}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-850 pb-2">
                    <span className="text-slate-500 flex items-center gap-1.5"><Users size={12} /> Head of State</span>
                    <span className="text-slate-200">{dataB.specialized.presidentOrPM}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-850 pb-2">
                    <span className="text-slate-500 flex items-center gap-1.5"><Thermometer size={12} /> Weather</span>
                    <span>{renderWeather(dataB)}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-850 pb-2">
                    <span className="text-slate-500 flex items-center gap-1.5"><Cpu size={12} /> Space Agency</span>
                    <span className="text-slate-200 max-w-[180px] text-right truncate">{dataB.specialized.spaceAgency.split(" (")[0]}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 flex items-center gap-1.5"><Shield size={12} /> Key Jet Plane</span>
                    <span className="text-slate-200">{dataB.specialized.militaryAdvancements.jetPlanes[0] || "None"}</span>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center gap-2 border border-dashed border-slate-800 rounded-xl p-6 text-center text-slate-500 font-mono text-xs">
                <span>VECTOR B UNINITIALIZED</span>
                <span className="text-[10px] text-slate-600">Select second country on the map</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Comparative Data Metrics (Gauges) */}
      {!loading && dataA && dataB && (
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 max-w-6xl mx-auto w-full bg-slate-900/20 border border-slate-850 rounded-2xl p-5"
        >
          <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest border-b border-slate-900 pb-2 flex items-center gap-1.5 mb-2">
            <Sparkles size={13} className="text-cyan-400" /> Comparative Metrics & Ratios
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
            {renderBarGauge(
              dataA.gdpNominal || 1,
              dataB.gdpNominal || 1,
              (v) => `$${v.toLocaleString()}B`,
              "Nominal GDP"
            )}
            {renderBarGauge(
              dataA.population || 1,
              dataB.population || 1,
              (v) => `${(v / 1e6).toFixed(1)}M`,
              "Total Population"
            )}
            {renderBarGauge(
              dataA.area || 1,
              dataB.area || 1,
              (v) => `${v.toLocaleString()} km²`,
              "Land Surface Area"
            )}
            {renderBarGauge(
              dataA.specialized.literacyRate || 1,
              dataB.specialized.literacyRate || 1,
              (v) => `${v}%`,
              "Literacy Coefficient"
            )}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
