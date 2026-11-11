import React, { useState } from 'react';
import { 
  Radio, 
  Cpu, 
  Sun, 
  ShieldCheck, 
  Layers, 
  Terminal,
  Activity,
  Zap
} from 'lucide-react';
import { HARDWARE_SPECS } from '../data/mockData';

export const TelemetryHardware: React.FC = () => {
  const [selectedSubsystem, setSelectedSubsystem] = useState<'sensors' | 'power' | 'network'>('sensors');

  return (
    <section id="iot-telemetry" className="py-16 md:py-24 bg-[#0F172A] text-slate-100 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono font-medium uppercase bg-[#1E293B] text-slate-300 px-3 py-1 border border-slate-700 rounded-md mb-3">
              <Cpu className="w-3.5 h-3.5 text-[#F59E0B]" />
              <span>Core System Tier 2</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl uppercase tracking-[-0.04em] leading-[0.88] text-white [text-wrap:balance]">
              Node-AI Autonomous Telemetry Station
            </h2>
            <p className="mt-4 text-slate-300 text-sm sm:text-base font-normal max-w-2xl font-sans leading-relaxed">
              Industrial edge computing hub built on the dual-core ESP32 microcontroller, 
              delivering continuous 54-hour off-grid survivability across Tullahan waterways.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono font-medium uppercase bg-[#1E293B] px-3.5 py-2 border border-slate-700 rounded-md">
            <Radio className="w-4 h-4 text-emerald-400" />
            <span>Telemetry Bus: 915MHz LoRa + LTE CAT-M1</span>
          </div>
        </div>

        {/* Interactive Hardware Explorer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Subsystem Tabs (lg:col-span-5) */}
          <div className="lg:col-span-5 space-y-4 font-mono">
            <div className="bg-[#1E293B] border border-slate-700 rounded-xl p-5 shadow-lg">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 pb-2 border-b border-slate-700">
                Hardware Subsystem Explorer
              </div>

              <div className="space-y-2">
                <button
                  onClick={() => setSelectedSubsystem('sensors')}
                  className={`w-full text-left p-3.5 border rounded-lg text-xs font-bold uppercase flex items-center justify-between cursor-pointer transition-all ${
                    selectedSubsystem === 'sensors'
                      ? 'bg-[#0F172A] text-white border-amber-500/50 shadow-md'
                      : 'bg-[#1E293B] text-slate-300 border-slate-700 hover:bg-slate-700/50'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Activity className={`w-4 h-4 ${selectedSubsystem === 'sensors' ? 'text-[#F59E0B]' : 'text-slate-400'}`} />
                    <span>Hydrology Sensor Array</span>
                  </div>
                  <span className="text-[10px] text-slate-400">JSN-SR04T</span>
                </button>

                <button
                  onClick={() => setSelectedSubsystem('power')}
                  className={`w-full text-left p-3.5 border rounded-lg text-xs font-bold uppercase flex items-center justify-between cursor-pointer transition-all ${
                    selectedSubsystem === 'power'
                      ? 'bg-[#0F172A] text-white border-amber-500/50 shadow-md'
                      : 'bg-[#1E293B] text-slate-300 border-slate-700 hover:bg-slate-700/50'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Sun className={`w-4 h-4 ${selectedSubsystem === 'power' ? 'text-[#F59E0B]' : 'text-slate-400'}`} />
                    <span>54H Off-Grid Solar & MPPT</span>
                  </div>
                  <span className="text-[10px] text-slate-400">12V LiFePO4</span>
                </button>

                <button
                  onClick={() => setSelectedSubsystem('network')}
                  className={`w-full text-left p-3.5 border rounded-lg text-xs font-bold uppercase flex items-center justify-between cursor-pointer transition-all ${
                    selectedSubsystem === 'network'
                      ? 'bg-[#0F172A] text-white border-amber-500/50 shadow-md'
                      : 'bg-[#1E293B] text-slate-300 border-slate-700 hover:bg-slate-700/50'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Radio className={`w-4 h-4 ${selectedSubsystem === 'network' ? 'text-[#F59E0B]' : 'text-slate-400'}`} />
                    <span>LoRa Mesh / Cellular Failover</span>
                  </div>
                  <span className="text-[10px] text-slate-400">SX1276</span>
                </button>
              </div>
            </div>

            {/* Microcontroller Specs Box */}
            <div className="bg-[#1E293B] text-slate-100 border border-slate-700 rounded-xl p-5 shadow-lg space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Microcontroller Spec</span>
                <span className="text-xs font-bold text-[#F59E0B]">ESP32-WROOM-32D</span>
              </div>
              <div className="text-xs font-sans text-slate-300 space-y-2 leading-relaxed">
                <div>• Dual Xtensa 32-bit LX6 cores @ 240 MHz for concurrent Kalman filtering.</div>
                <div>• Ultra-Low-Power (ULP) co-processor monitors water elevation in deep sleep.</div>
                <div>• IP67 weatherproof enclosure certified to withstand urban typhoon flash surges.</div>
              </div>
            </div>
          </div>

          {/* Right Column: Schematics & Pinout Breakdown (lg:col-span-7) */}
          <div className="lg:col-span-7 bg-[#1E293B] text-slate-100 border border-slate-700 rounded-xl p-6 sm:p-8 shadow-xl font-mono">
            {/* Terminal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-700 text-xs mb-4">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-[#F59E0B]" />
                <span className="font-bold uppercase text-white">Station Pinout & Wire Bus Architecture</span>
              </div>
              <span className="bg-[#0F172A] text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded text-[10px] font-bold uppercase">
                Active Schematic
              </span>
            </div>

            {/* Dynamic Content based on selected subsystem */}
            {selectedSubsystem === 'sensors' && (
              <div className="space-y-4 text-xs">
                <div className="p-4 bg-[#0F172A] border border-slate-800 rounded-lg space-y-2">
                  <div className="text-[#F59E0B] font-bold uppercase flex items-center justify-between">
                    <span>JSN-SR04T Waterproof Ultrasonic Transducer</span>
                    <span className="text-slate-400 text-[10px]">GPIO 18 / 19</span>
                  </div>
                  <p className="text-slate-300 font-sans leading-relaxed">
                    Mounted on the bridge soffit measuring downward air distance to river water surface. 
                    Calculates real-time stage elevation: <code className="text-white bg-slate-800 px-1 py-0.5 rounded">H_water = H_bridge - D_ultrasonic</code>.
                  </p>
                </div>

                <div className="p-4 bg-[#0F172A] border border-slate-800 rounded-lg space-y-2">
                  <div className="text-white font-bold uppercase flex items-center justify-between">
                    <span>Surface Doppler Flow Hydrometer</span>
                    <span className="text-slate-400 text-[10px]">UART2 (GPIO 16/17)</span>
                  </div>
                  <p className="text-slate-300 font-sans leading-relaxed">
                    24GHz radar sensor sampling surface water velocity (m/s). Combined with surveyed Tullahan bathymetry cross-sections, 
                    yields cubic-meter-per-second volumetric discharge.
                  </p>
                </div>

                <div className="p-4 bg-[#0F172A] border border-slate-800 rounded-lg space-y-2">
                  <div className="text-white font-bold uppercase flex items-center justify-between">
                    <span>Secondary Silt / Drainage Trap Optical Monitor</span>
                    <span className="text-slate-400 text-[10px]">ADC1 (GPIO 34)</span>
                  </div>
                  <p className="text-slate-300 font-sans leading-relaxed">
                    Measures debris and silt accumulation percentage at culvert grates to identify clogged culverts 
                    before flash surges back up into residential roads.
                  </p>
                </div>
              </div>
            )}

            {selectedSubsystem === 'power' && (
              <div className="space-y-4 text-xs">
                <div className="p-4 bg-[#0F172A] border border-slate-800 rounded-lg space-y-2">
                  <div className="text-[#F59E0B] font-bold uppercase flex items-center justify-between">
                    <span>50W Monocrystalline Photovoltaic Panel</span>
                    <span className="text-slate-400 text-[10px]">18.5V Vmp</span>
                  </div>
                  <p className="text-slate-300 font-sans leading-relaxed">
                    Mounted at 15-degree tilt with hydrophobic coating to prevent tropical dust/monsoon grime accumulation. 
                    Generates sufficient energy to recharge in 3.5 hours of indirect daylight.
                  </p>
                </div>

                <div className="p-4 bg-[#0F172A] border border-slate-800 rounded-lg space-y-2">
                  <div className="text-white font-bold uppercase flex items-center justify-between">
                    <span>12V 20Ah Lithium Iron Phosphate (LiFePO4)</span>
                    <span className="text-slate-400 text-[10px]">256 Wh Capacity</span>
                  </div>
                  <p className="text-slate-300 font-sans leading-relaxed">
                    Safe thermal runaway profile capable of 2,000+ deep cycles. Powers the station for 
                    over 54 consecutive hours during overcast typhoon rainbands with zero solar input.
                  </p>
                </div>
              </div>
            )}

            {selectedSubsystem === 'network' && (
              <div className="space-y-4 text-xs">
                <div className="p-4 bg-[#0F172A] border border-slate-800 rounded-lg space-y-2">
                  <div className="text-[#F59E0B] font-bold uppercase flex items-center justify-between">
                    <span>SX1276 915MHz LoRa Long-Range Transceiver</span>
                    <span className="text-slate-400 text-[10px]">SPI Bus</span>
                  </div>
                  <p className="text-slate-300 font-sans leading-relaxed">
                    Peer-to-peer mesh packet forwarding over 1.8km urban line-of-sight. If cellular base stations go dark 
                    due to power outages, LoRa packets continue relaying telemetry directly to the Barangay Hall gateway.
                  </p>
                </div>

                <div className="p-4 bg-[#0F172A] border border-slate-800 rounded-lg space-y-2">
                  <div className="text-white font-bold uppercase flex items-center justify-between">
                    <span>SIM7000G LTE-M / NB-IoT Secondary Modem</span>
                    <span className="text-slate-400 text-[10px]">UART1 (GPIO 4/5)</span>
                  </div>
                  <p className="text-slate-300 font-sans leading-relaxed">
                    Provides direct REST / MQTT-over-TLS connection to the Quezon City iRISE-UP cloud servers with HMAC-SHA256 authenticated payloads.
                  </p>
                </div>
              </div>
            )}

            {/* Bottom summary bar */}
            <div className="mt-5 pt-3 border-t border-slate-700 flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>SP-3440 S-2024 Waterway Sensor Standards</span>
              </span>
              <span className="text-white font-bold">Rev 3.2 PCB</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
