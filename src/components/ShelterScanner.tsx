import React, { useState } from 'react';
import { 
  CreditCard, 
  QrCode, 
  UserCheck, 
  AlertCircle, 
  Check, 
  Users, 
  Package, 
  Sparkles,
  ShieldCheck,
  Building2
} from 'lucide-react';
import { INITIAL_EVACUEES, INITIAL_SHELTERS } from '../data/mockData';
import { EvacueeRecord } from '../types';
import { SupabaseRegistrationsTable } from './SupabaseRegistrationsTable';

export const ShelterScanner: React.FC = () => {
  const [evacuees, setEvacuees] = useState<EvacueeRecord[]>(INITIAL_EVACUEES);
  const [selectedShelterId, setSelectedShelterId] = useState<string>('shelter-1');
  const [rfidTapSuccess, setRfidTapSuccess] = useState<boolean>(false);
  const [recentScanName, setRecentScanName] = useState<string>('');

  const currentShelter = INITIAL_SHELTERS.find((s) => s.id === selectedShelterId) || INITIAL_SHELTERS[0];

  const handleSimulateScan = () => {
    const demoNames = [
      'Aling Teresa Ramos (Family of 3)',
      'Mang Danilo Bautista (Senior, PWD)',
      'Criselda Mendoza (Infant Care)',
      'Eduardo Dela Cruz (Family of 5)'
    ];
    const pickedName = demoNames[Math.floor(Math.random() * demoNames.length)];
    
    const newRecord: EvacueeRecord = {
      id: `evac-${Date.now()}`,
      householdHead: pickedName,
      familyMembersCount: Math.floor(Math.random() * 4) + 1,
      barangay: 'Fairview',
      assignedShelter: currentShelter.name,
      roomAssignment: `Room ${Math.floor(Math.random() * 20) + 101}`,
      rfidUid: `QC-UID-${Math.floor(Math.random() * 9000 + 1000)}`,
      timestampCheckedIn: 'Just now',
      reliefPacksIssued: 1,
      vulnerabilities: ['Senior', 'Infant'],
    };

    setEvacuees([newRecord, ...evacuees.slice(0, 5)]);
    setRecentScanName(pickedName);
    setRfidTapSuccess(true);
    setTimeout(() => setRfidTapSuccess(false), 2400);
  };

  return (
    <section id="shelter-scanner" className="py-16 md:py-24 bg-[#0F172A] text-slate-100 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono font-medium uppercase bg-[#1E293B] text-slate-300 px-3 py-1 border border-slate-700 rounded-md mb-3">
              <UserCheck className="w-3.5 h-3.5 text-[#F59E0B]" />
              <span>Core System Tier 4</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl uppercase tracking-[-0.04em] leading-[0.88] text-white [text-wrap:balance]">
              Paperless RFID & QR Evacuee Headcount
            </h2>
            <p className="mt-4 text-slate-300 text-sm sm:text-base font-normal max-w-2xl font-sans leading-relaxed">
              Replacing manual pen-and-paper logbooks with instantaneous RC522 RFID card scans and offline QR passes, 
              preventing relief distribution fraud and classroom cot bottlenecks.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono font-medium uppercase bg-[#1E293B] px-3.5 py-2 border border-slate-700 rounded-md">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>RA 10173 Data Privacy Guard: Active</span>
          </div>
        </div>

        {/* Dual Column Layout: Tap Simulator vs Live Shelter Ledger */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive RC522 Tap Station (lg:col-span-5) */}
          <div className="lg:col-span-5 space-y-6 font-mono">
            {/* Shelter Gate Scanner Box */}
            <div className="bg-[#1E293B] border border-slate-700 rounded-xl p-6 sm:p-7 shadow-xl">
              <div className="flex items-center justify-between pb-3 border-b border-slate-700 text-xs mb-4">
                <span className="font-bold uppercase text-white">Admissions Gate Terminal</span>
                <span className="bg-[#0F172A] text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded text-[10px] font-bold uppercase">
                  RC522 ONLINE
                </span>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-xs text-slate-400 block mb-1 uppercase font-bold">
                    Select Active Evacuation Hub:
                  </label>
                  <select
                    value={selectedShelterId}
                    onChange={(e) => setSelectedShelterId(e.target.value)}
                    className="w-full bg-[#0F172A] border border-slate-700 text-white text-xs p-2.5 rounded font-mono cursor-pointer focus:outline-none focus:border-amber-500"
                  >
                    {INITIAL_SHELTERS.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name} ({s.currentCount}/{s.capacity} Occupancy)
                      </option>
                    ))}
                  </select>
                </div>

                {/* RFID Reader Visual Target Area */}
                <div className="p-6 bg-[#0F172A] border border-slate-800 rounded-xl text-center space-y-3 relative overflow-hidden">
                  <div className="w-16 h-16 rounded-2xl mx-auto bg-[#1E293B] border border-slate-700 flex items-center justify-center text-[#F59E0B]">
                    <CreditCard className="w-8 h-8" />
                  </div>
                  <div>
                    <div className="font-display text-base tracking-tight text-white uppercase">
                      RC522 13.56 MHz RFID Sensor
                    </div>
                    <div className="text-[11px] text-slate-400 font-sans mt-0.5">
                      Citizens tap their Barangay Resident Card or QR Pass on entry.
                    </div>
                  </div>

                  {/* Tap Action Button */}
                  <button
                    onClick={handleSimulateScan}
                    className="w-full py-3 rounded-lg text-xs font-bold uppercase tracking-[-0.02em] text-[#0F172A] bg-[#F59E0B] hover:bg-amber-400 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Tap Citizen RFID Card</span>
                  </button>

                  {/* Success notification popup */}
                  {rfidTapSuccess && (
                    <div className="absolute inset-0 bg-[#1E293B]/95 backdrop-blur-sm flex flex-col items-center justify-center p-4 border border-emerald-500/50 rounded-xl animate-fadeIn">
                      <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-1">
                        <Check className="w-5 h-5" />
                      </div>
                      <div className="font-bold text-xs uppercase text-emerald-400">
                        Resident Admitted (0.2s)
                      </div>
                      <div className="text-white text-xs font-sans mt-1">
                        {recentScanName}
                      </div>
                      <div className="text-[10px] text-slate-400 mt-1">
                        Room 104 Cot B-06 Assigned · 1 Food Pack Logged
                      </div>
                    </div>
                  )}
                </div>

                {/* Special Needs Census Highlights */}
                <div className="p-4 bg-[#0F172A] border border-slate-800 rounded-lg text-xs space-y-2">
                  <div className="font-bold text-white uppercase flex items-center justify-between">
                    <span>Priority Vulnerability Census</span>
                    <span className="text-[#F59E0B] font-bold">Live Breakdown</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-300 font-sans">
                    <div className="p-2 bg-[#1E293B] rounded border border-slate-700/80">
                      <span className="text-slate-400 block text-[10px] font-mono">SENIOR CITIZENS:</span>
                      <strong className="text-white font-mono text-sm">28 Pax</strong>
                    </div>
                    <div className="p-2 bg-[#1E293B] rounded border border-slate-700/80">
                      <span className="text-slate-400 block text-[10px] font-mono">INFANTS / LACTATING:</span>
                      <strong className="text-white font-mono text-sm">14 Pax</strong>
                    </div>
                    <div className="p-2 bg-[#1E293B] rounded border border-slate-700/80">
                      <span className="text-slate-400 block text-[10px] font-mono">PWD WHEELCHAIR:</span>
                      <strong className="text-white font-mono text-sm">6 Pax</strong>
                    </div>
                    <div className="p-2 bg-[#1E293B] rounded border border-slate-700/80">
                      <span className="text-slate-400 block text-[10px] font-mono">PREGNANT WOMEN:</span>
                      <strong className="text-white font-mono text-sm">4 Pax</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Live Evacuee Admission Ledger (lg:col-span-7) */}
          <div className="lg:col-span-7 bg-[#1E293B] text-slate-100 border border-slate-700 rounded-xl p-6 sm:p-7 shadow-xl font-mono">
            <div className="flex flex-wrap items-center justify-between pb-3 border-b border-slate-700 gap-2 mb-4">
              <div>
                <span className="font-bold text-sm text-white uppercase">Real-Time Admission Ledger</span>
                <span className="text-slate-400 text-xs block font-sans">Automatic classroom bed mapping & relief deduplication</span>
              </div>
              <span className="bg-[#0F172A] text-slate-300 border border-slate-700 px-2 py-0.5 rounded text-xs font-bold">
                {evacuees.length} Active Records
              </span>
            </div>

            {/* Table of evacuees */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-700 text-slate-400 uppercase text-[11px]">
                    <th className="py-2.5 px-3">Household Head</th>
                    <th className="py-2.5 px-3">Pax</th>
                    <th className="py-2.5 px-3">Assigned Zone</th>
                    <th className="py-2.5 px-3">RFID UID</th>
                    <th className="py-2.5 px-3">Relief Claimed</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-mono text-xs">
                  {evacuees.map((e) => (
                    <tr key={e.id} className="hover:bg-slate-800/50 transition-colors">
                      <td className="py-3 px-3">
                        <div className="font-bold text-white uppercase">{e.householdHead}</div>
                        <div className="text-[10px] text-slate-400 font-sans">{e.vulnerabilities?.join(', ') || 'General Census'}</div>
                      </td>
                      <td className="py-3 px-3 text-slate-300 font-bold">{e.familyMembersCount}</td>
                      <td className="py-3 px-3 text-slate-300 font-bold">{e.roomAssignment}</td>
                      <td className="py-3 px-3">
                        <span className="px-1.5 py-0.5 bg-[#0F172A] text-slate-300 border border-slate-700 rounded text-[10px]">
                          {e.rfidUid}
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        <span className="text-emerald-400 font-bold flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" />
                          <span>Pack #{e.reliefPacksIssued}</span>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Anti-Fraud Deduplication Protection Note */}
            <div className="mt-5 p-3 bg-[#0F172A] border border-slate-800 rounded-lg text-xs flex items-center justify-between text-slate-300 font-sans">
              <span className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Double-claiming barred: RFID cards lock relief pack quotas for 24 hours.</span>
              </span>
              <span className="font-mono text-slate-500 uppercase text-[10px] font-bold">Audit Locked</span>
            </div>
          </div>
        </div>

        {/* Live Supabase Hardware Registrations Stream */}
        <div className="mt-8">
          <SupabaseRegistrationsTable />
        </div>
      </div>
    </section>
  );
};
