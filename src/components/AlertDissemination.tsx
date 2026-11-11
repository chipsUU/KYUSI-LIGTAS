import React, { useState } from 'react';
import { 
  Volume2, 
  MessageSquare, 
  Send, 
  ShieldAlert, 
  CheckCircle2, 
  Clock, 
  Radio, 
  Zap,
  Bell
} from 'lucide-react';
import { BROADCAST_AUDIT_LOGS } from '../data/mockData';

interface AlertDisseminationProps {
  isSimulatedAlert: boolean;
  onTriggerAlert: () => void;
}

export const AlertDissemination: React.FC<AlertDisseminationProps> = ({
  isSimulatedAlert,
  onTriggerAlert,
}) => {
  const [selectedChannel, setSelectedChannel] = useState<'siren' | 'sms' | 'telegram'>('siren');

  return (
    <section className="py-16 md:py-24 bg-[#0F172A] text-slate-100 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono font-medium uppercase bg-[#1E293B] text-slate-300 px-3 py-1 border border-slate-700 rounded-md mb-3">
              <Zap className="w-3.5 h-3.5 text-[#F59E0B]" />
              <span>Core System Tier 3</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl uppercase tracking-[-0.04em] leading-[0.88] text-white [text-wrap:balance]">
              Multi-Channel Automated Alert Dissemination
            </h2>
            <p className="mt-4 text-slate-300 text-sm sm:text-base font-normal max-w-2xl font-sans leading-relaxed">
              When water elevations breach the Stage 3 (2.20m) critical threshold, autonomous protocols 
              deploy alerts concurrently across sirens, mobile networks, and messenger bots with zero human bottleneck.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono font-medium uppercase bg-[#1E293B] px-3.5 py-2 border border-slate-700 rounded-md">
            <Clock className="w-4 h-4 text-emerald-400" />
            <span>Multi-Channel Latency: &lt; 4.8 Seconds</span>
          </div>
        </div>

        {/* 3 Channels Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono mb-12">
          {/* Channel 1: 120dB Remote Siren Arrays */}
          <div 
            onClick={() => setSelectedChannel('siren')}
            className={`p-6 border rounded-xl cursor-pointer transition-all duration-200 ${
              selectedChannel === 'siren'
                ? 'bg-[#1E293B] border-amber-500/50 shadow-xl'
                : 'bg-[#1E293B]/70 border-slate-700 hover:border-slate-600'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-lg bg-[#0F172A] border border-slate-700 flex items-center justify-center text-[#F59E0B]">
                <Volume2 className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-slate-400 uppercase">CHANNEL A</span>
            </div>
            <h3 className="font-display text-xl uppercase tracking-tight text-white mb-2">
              120dB Solar Siren Array
            </h3>
            <p className="text-xs text-slate-300 font-sans leading-relaxed mb-4">
              Audible 1km acoustic radius. Autonomous pulse triggers via 915MHz LoRa mesh relay. Zero cellular dependence.
            </p>
            <div className="pt-3 border-t border-slate-700/80 flex items-center justify-between text-[11px] text-slate-400">
              <span>Status: {isSimulatedAlert ? 'ACTIVE BURST' : 'STANDBY ARMED'}</span>
              <span className="font-bold text-[#F59E0B]">100% Battery</span>
            </div>
          </div>

          {/* Channel 2: GSM SMS Emergency Queues */}
          <div 
            onClick={() => setSelectedChannel('sms')}
            className={`p-6 border rounded-xl cursor-pointer transition-all duration-200 ${
              selectedChannel === 'sms'
                ? 'bg-[#1E293B] border-amber-500/50 shadow-xl'
                : 'bg-[#1E293B]/70 border-slate-700 hover:border-slate-600'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-lg bg-[#0F172A] border border-slate-700 flex items-center justify-center text-cyan-400">
                <MessageSquare className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-slate-400 uppercase">CHANNEL B</span>
            </div>
            <h3 className="font-display text-xl uppercase tracking-tight text-white mb-2">
              GSM Cell-Broadcast Queues
            </h3>
            <p className="text-xs text-slate-300 font-sans leading-relaxed mb-4">
              Automated high-throughput SMS blast prioritizing heads-of-household registered in flood-prone river zones.
            </p>
            <div className="pt-3 border-t border-slate-700/80 flex items-center justify-between text-[11px] text-slate-400">
              <span>Queue: 1,420 Residents</span>
              <span className="font-bold text-cyan-400">&lt; 3.2s Deliver</span>
            </div>
          </div>

          {/* Channel 3: Barangay Bot Leadership Channel */}
          <div 
            onClick={() => setSelectedChannel('telegram')}
            className={`p-6 border rounded-xl cursor-pointer transition-all duration-200 ${
              selectedChannel === 'telegram'
                ? 'bg-[#1E293B] border-amber-500/50 shadow-xl'
                : 'bg-[#1E293B]/70 border-slate-700 hover:border-slate-600'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-lg bg-[#0F172A] border border-slate-700 flex items-center justify-center text-emerald-400">
                <Send className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-slate-400 uppercase">CHANNEL C</span>
            </div>
            <h3 className="font-display text-xl uppercase tracking-tight text-white mb-2">
              @KyusiLigtas Telegram Bot
            </h3>
            <p className="text-xs text-slate-300 font-sans leading-relaxed mb-4">
              Instant incident dispatch to BDRRMC Captains, rescue marshals, and QCDRRMC central duty officers.
            </p>
            <div className="pt-3 border-t border-slate-700/80 flex items-center justify-between text-[11px] text-slate-400">
              <span>Audience: 64 Officials</span>
              <span className="font-bold text-emerald-400">Instant Push</span>
            </div>
          </div>
        </div>

        {/* Live Broadcast Trigger & Audit Ledger */}
        <div className="bg-[#1E293B] border border-slate-700 rounded-xl p-6 sm:p-8 shadow-xl font-mono">
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-700 gap-4 mb-6">
            <div>
              <div className="font-display text-lg uppercase text-white tracking-tight">
                Simulated Multi-Channel Broadcast Verification
              </div>
              <div className="text-xs text-slate-400 font-sans">
                Observe autonomous broadcast propagation when stage elevation breaches 2.20m.
              </div>
            </div>

            <button
              onClick={onTriggerAlert}
              className="px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-[-0.02em] text-[#0F172A] bg-[#F59E0B] hover:bg-amber-400 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <Bell className="w-4 h-4" />
              <span>Simulate Critical Stage 3 Dispatch</span>
            </button>
          </div>

          {/* Audit Ledger Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-700 text-slate-400 uppercase">
                  <th className="py-2.5 px-3">Timestamp</th>
                  <th className="py-2.5 px-3">Protocol / Channel</th>
                  <th className="py-2.5 px-3">Target Sub-Basin</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3">Latency</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {BROADCAST_AUDIT_LOGS.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-800/50 transition-colors">
                    <td className="py-3 px-3 text-slate-400">{log.timestamp}</td>
                    <td className="py-3 px-3 font-bold text-white uppercase">{log.channel}</td>
                    <td className="py-3 px-3 text-slate-300">{log.targetZone}</td>
                    <td className="py-3 px-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        log.status === 'SENT' || log.status === 'ACKNOWLEDGED'
                          ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-500/30'
                          : 'bg-amber-950/60 text-[#F59E0B] border border-amber-500/30'
                      }`}>
                        {log.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-slate-400">{log.latencySeconds}s</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};
