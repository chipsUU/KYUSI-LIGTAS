import React, { useState } from 'react';
import { X, Cpu, ShieldCheck } from 'lucide-react';
import { HARDWARE_SPECS } from '../data/mockData';

interface TechnicalSpecsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TechnicalSpecsModal: React.FC<TechnicalSpecsModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'components' | 'algorithms' | 'protocols'>('components');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn font-mono">
      <div 
        className="bg-[#1E293B] text-slate-100 border border-slate-700 max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col rounded-2xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-700 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg border border-slate-700 bg-[#0F172A] text-[#F59E0B] flex items-center justify-center">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display text-lg sm:text-xl uppercase tracking-tight text-white">
                Technical Hardware Specifications
              </h3>
              <p className="text-xs text-slate-400 font-sans">
                Quezon City University Capstone Research · Department of Electronics Engineering
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg border border-slate-700 bg-[#0F172A] hover:bg-slate-700 hover:text-white transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Bar */}
        <div className="px-6 pt-4 border-b border-slate-700 flex items-center gap-4 text-xs font-bold uppercase">
          <button
            onClick={() => setActiveTab('components')}
            className={`pb-3 border-b-2 transition-all cursor-pointer ${
              activeTab === 'components'
                ? 'border-[#F59E0B] text-[#F59E0B]'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            Sensors & Hardware
          </button>
          <button
            onClick={() => setActiveTab('algorithms')}
            className={`pb-3 border-b-2 transition-all cursor-pointer ${
              activeTab === 'algorithms'
                ? 'border-[#F59E0B] text-[#F59E0B]'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            Predictive AI & Kalman
          </button>
          <button
            onClick={() => setActiveTab('protocols')}
            className={`pb-3 border-b-2 transition-all cursor-pointer ${
              activeTab === 'protocols'
                ? 'border-[#F59E0B] text-[#F59E0B]'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            LoRa Mesh & Fail-safe
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs text-slate-300">
          {activeTab === 'components' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {HARDWARE_SPECS.map((spec, i) => (
                  <div key={i} className="p-4 bg-[#0F172A] border border-slate-800 rounded-lg space-y-1.5">
                    <div className="text-[10px] text-[#F59E0B] font-bold uppercase">{spec.tier}</div>
                    <div className="text-sm font-bold text-white uppercase">{spec.component}</div>
                    <p className="text-slate-400 text-[11px] font-sans leading-relaxed">{spec.details}</p>
                  </div>
                ))}
              </div>

              <div className="p-4 bg-[#0F172A] text-slate-200 border border-slate-800 rounded-lg space-y-2">
                <div className="font-bold uppercase flex items-center gap-1.5 text-xs text-white">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>QC Ordinance SP-3440 S-2024 Certification Criteria</span>
                </div>
                <p className="font-sans text-slate-400 text-[11px] leading-relaxed">
                  Requires all telemetry stations within Quezon City waterways to withstand continuous 
                  submersion up to 1 meter above bridge decks and survive 150 km/h typhoon winds without calibration drift.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'algorithms' && (
            <div className="space-y-4 text-xs">
              <div className="p-4 bg-[#0F172A] border border-slate-800 rounded-lg space-y-2">
                <div className="text-[#F59E0B] font-bold uppercase text-sm">
                  1. Real-Time Kalman State Estimator
                </div>
                <p className="text-slate-400 font-sans text-[11px] leading-relaxed">
                  River ultrasonic signals experience high variance due to floating debris, raindrops, and surface turbulence. 
                  The Kalman filter recursively updates state estimate $x_k$ based on measurement $z_k$:
                </p>
                <div className="bg-slate-950 p-3 rounded border border-slate-800 text-slate-200 text-[11px] overflow-x-auto">
                  K_k = P_k^- * H^T * (H * P_k^- * H^T + R)^-1<br />
                  x_k = x_k^- + K_k * (z_k - H * x_k^-)<br />
                  P_k = (I - K_k * H) * P_k^-
                </div>
              </div>

              <div className="p-4 bg-[#0F172A] border border-slate-800 rounded-lg space-y-2">
                <div className="text-[#F59E0B] font-bold uppercase text-sm">
                  2. Long Short-Term Memory (LSTM) Flood Surge Forecast
                </div>
                <p className="text-slate-400 font-sans text-[11px] leading-relaxed">
                  Trained on 5 years of PAGASA Doppler radar rainfall data and Tullahan River basin crest timelines. 
                  Projects stage elevations 30 to 60 minutes into the future with $R^2 &gt; 0.94$.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'protocols' && (
            <div className="space-y-4 text-xs">
              <div className="p-4 bg-[#0F172A] border border-slate-800 rounded-lg space-y-2">
                <div className="text-white font-bold uppercase text-sm">
                  Fail-Safe Mesh Network Topology
                </div>
                <p className="text-slate-400 font-sans text-[11px] leading-relaxed">
                  During typhoons, cellular infrastructure frequently suffers blackouts. 
                  KYUSI-LIGTAS nodes automatically failover to 915MHz LoRa mesh hops:
                </p>
                <div className="p-3 bg-slate-950 rounded border border-slate-800 text-slate-300 text-[11px] space-y-1">
                  <div>[Node-T01 Pylon] ---LoRa 1.2km---&gt; [Node-R02 Repeater] ---LoRa 800m---&gt; [Barangay Hall Base]</div>
                  <div className="text-emerald-400 font-bold pt-1">
                    ✓ Zero internet required for local 120dB siren triggers
                  </div>
                </div>
              </div>

              <div className="p-4 bg-[#0F172A] border border-slate-800 rounded-lg space-y-2">
                <div className="text-white font-bold uppercase text-sm">
                  Binary Telemetry Packet Header Structure (24 Bytes)
                </div>
                <div className="bg-slate-950 p-3 rounded border border-slate-800 text-[10px] text-slate-400 overflow-x-auto leading-relaxed">
                  [Byte 0-3: Magic Header 0x4B595553] [Byte 4-7: Unix Timestamp]<br />
                  [Byte 8-11: Water Level (float32)] [Byte 12-15: Velocity (float32)]<br />
                  [Byte 16: Battery % (uint8)] [Byte 17: Status Flags (uint8)]<br />
                  [Byte 18-21: Blockage / Rain Rate] [Byte 22-23: CRC-16 Checksum]
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-5 border-t border-slate-700 bg-[#0F172A] flex items-center justify-between text-xs text-slate-400">
          <span>QCU Capstone Research Repository</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#1E293B] text-white hover:bg-slate-700 rounded-lg font-bold uppercase transition-colors cursor-pointer border border-slate-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
