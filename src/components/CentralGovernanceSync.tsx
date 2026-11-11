import React, { useState } from 'react';
import { 
  Server, 
  FileCode,
  Copy,
  Check
} from 'lucide-react';

export const CentralGovernanceSync: React.FC = () => {
  const [selectedPayload, setSelectedPayload] = useState<'hydrology' | 'shelter' | 'siren'>('hydrology');
  const [copied, setCopied] = useState(false);

  const payloads = {
    hydrology: {
      endpoint: 'POST /api/v1/qc-irise-up/telemetry-sync',
      json: JSON.stringify({
        station_id: 'QC-TUL-FAIRVIEW-01',
        basin: 'Tullahan River Sub-Basin 4B',
        ordinance_ref: 'QC-SP-3440-S2024',
        timestamp: '2026-10-02T08:35:12Z',
        sensors: {
          water_elevation_meters: 1.42,
          critical_threshold_meters: 2.20,
          rate_of_rise_cm_min: 1.8,
          surface_velocity_mps: 1.25,
          silt_drainage_blockage_pct: 0,
        },
        battery_telemetry: {
          voltage_volts: 13.6,
          state_of_charge_pct: 98.4,
          charging_mode: 'MPPT_FLOAT',
        },
        ai_inference: {
          model: 'LSTM-Kalman-v3.2',
          lead_time_minutes: 38,
          crest_probability: 0.942,
          system_stage: 'STAGE_1_MONITORED',
        }
      }, null, 2),
    },
    shelter: {
      endpoint: 'POST /api/v1/qc-irise-up/shelter-census-sync',
      json: JSON.stringify({
        shelter_id: 'SHELTER-QC-FRVW-01',
        facility_name: 'Fairview High School Main Gym',
        barangay: 'Fairview',
        district: 'District 5, Quezon City',
        authorized_capacity: 300,
        current_evacuees_count: 246,
        occupancy_ratio: 0.82,
        vulnerabilities_census: {
          seniors_count: 28,
          infants_count: 14,
          pwd_wheelchair: 6,
          pregnant_women: 4,
        },
        relief_distribution: {
          ffp_packs_issued: 68,
          hygiene_kits_issued: 68,
          water_ration_gallons: 272,
        },
        data_privacy_compliance: 'RA-10173-ANONYMIZED-LOCAL-UID'
      }, null, 2),
    },
    siren: {
      endpoint: 'POST /api/v1/qc-irise-up/siren-audit-log',
      json: JSON.stringify({
        incident_id: 'INC-QC-2026-0941',
        trigger_origin: 'AUTONOMOUS_NODE_AI_STAGE_3_BREACH',
        sirens_dispatched: [
          { node_id: 'SIREN-TUL-01', decibel: 120, status: 'ACKNOWLEDGED_BURST' },
          { node_id: 'SIREN-TUL-02', decibel: 120, status: 'ACKNOWLEDGED_BURST' },
        ],
        sms_cell_broadcast: {
          queue_size: 1420,
          delivered_count: 1420,
          latency_seconds: 2.8,
        },
        telegram_bot_subscribers: {
          bdrrmc_acknowledged_ratio: 1.0,
        },
        qcdrrrmc_central_override: 'UNRESTRICTED'
      }, null, 2),
    },
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(payloads[selectedPayload].json);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="irise-up" className="py-16 md:py-24 bg-[#0F172A] text-slate-100 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono font-medium uppercase bg-[#1E293B] text-slate-300 px-3 py-1 border border-slate-700 rounded-md mb-3">
              <Server className="w-3.5 h-3.5 text-[#F59E0B]" />
              <span>Core System Tier 5</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl uppercase tracking-[-0.04em] leading-[0.88] text-white [text-wrap:balance]">
              Centralized QC iRISE-UP & Governance Integration
            </h2>
            <p className="mt-4 text-slate-300 text-sm sm:text-base font-normal max-w-2xl font-sans leading-relaxed">
              Seamless REST API synchronization connecting grassroots barangay field telemetry directly to 
              the Quezon City Disaster Risk Reduction and Management Council (QCDRRMC) iRISE-UP Command Center.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono font-medium uppercase bg-[#1E293B] text-slate-200 px-3.5 py-2 border border-slate-700 rounded-md">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            <span>QCDRRMC Gateway: Connected (TLS 1.3)</span>
          </div>
        </div>

        {/* Integration Architecture Card & Payload Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Architecture Highlights (lg:col-span-5) */}
          <div className="lg:col-span-5 space-y-4 font-mono">
            <div className="bg-[#1E293B] text-slate-100 border border-slate-700 rounded-xl p-6 shadow-xl">
              <h3 className="font-display text-lg tracking-tight uppercase text-white mb-2">
                Bidirectional City-to-Barangay Sync
              </h3>
              <p className="text-xs text-slate-300 font-sans font-normal leading-relaxed mb-5">
                KYUSI-LIGTAS does not operate as an isolated silo. It feeds micro-watershed flood dynamics into 
                Quezon City's premier disaster system (iRISE-UP) while pulling city-wide weather radar feeds.
              </p>

              <div className="space-y-3 text-xs">
                <div className="p-3 bg-[#0F172A] border border-slate-800 rounded-lg flex items-start gap-3">
                  <div className="w-6 h-6 rounded bg-[#1E293B] border border-slate-700 text-[#F59E0B] font-bold flex items-center justify-center shrink-0">
                    1
                  </div>
                  <div>
                    <div className="font-bold text-white uppercase">Edge-to-Cloud Telemetry</div>
                    <div className="text-slate-400 font-sans text-[11px] mt-0.5">
                      ESP32 field nodes stream 10s packets via MQTT over TLS directly to the Barangay Edge Broker.
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-[#0F172A] border border-slate-800 rounded-lg flex items-start gap-3">
                  <div className="w-6 h-6 rounded bg-[#1E293B] border border-slate-700 text-white font-bold flex items-center justify-center shrink-0">
                    2
                  </div>
                  <div>
                    <div className="font-bold text-white uppercase">iRISE-UP REST Relay</div>
                    <div className="text-slate-400 font-sans text-[11px] mt-0.5">
                      Batch JSON aggregation sent every 60s to QCDRRMC central server with HMAC-SHA256 signature verification.
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-[#0F172A] border border-slate-800 rounded-lg flex items-start gap-3">
                  <div className="w-6 h-6 rounded bg-[#1E293B] border border-slate-700 text-white font-bold flex items-center justify-center shrink-0">
                    3
                  </div>
                  <div>
                    <div className="font-bold text-white uppercase">Relief Logistics Synchronization</div>
                    <div className="text-slate-400 font-sans text-[11px] mt-0.5">
                      Real-time shelter occupancy triggers automated SSDD warehouse dispatch trucks before centers run out of rations.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Performance KPIs */}
            <div className="bg-[#1E293B] text-slate-100 border border-slate-700 rounded-xl p-5 shadow-xl grid grid-cols-2 gap-3 text-xs">
              <div className="bg-[#0F172A] p-3 rounded-lg border border-slate-800">
                <div className="text-slate-400 text-[10px] uppercase font-bold">Round-Trip Latency</div>
                <div className="text-[#F59E0B] font-bold text-xl mt-0.5 font-mono">142 ms</div>
              </div>
              <div className="bg-[#0F172A] p-3 rounded-lg border border-slate-800">
                <div className="text-slate-400 text-[10px] uppercase font-bold">Data Availability</div>
                <div className="text-emerald-400 font-bold text-xl mt-0.5 font-mono">99.98%</div>
              </div>
            </div>
          </div>

          {/* Right Column: Live JSON Payload Inspector (lg:col-span-7) */}
          <div className="lg:col-span-7 bg-[#1E293B] text-slate-100 border border-slate-700 rounded-xl p-6 shadow-xl font-mono">
            <div className="flex flex-wrap items-center justify-between pb-3 border-b border-slate-700 gap-3 mb-4">
              <div className="flex items-center gap-2">
                <FileCode className="w-4 h-4 text-[#F59E0B]" />
                <span className="font-bold text-sm uppercase text-white">iRISE-UP Sync Payload Inspector</span>
              </div>

              {/* Payload Switcher Tabs */}
              <div className="flex items-center gap-1.5 text-xs">
                <button
                  onClick={() => setSelectedPayload('hydrology')}
                  className={`px-3 py-1 rounded border text-xs font-bold uppercase transition-all cursor-pointer ${
                    selectedPayload === 'hydrology'
                      ? 'bg-[#0F172A] text-[#F59E0B] border-amber-500/50'
                      : 'bg-[#1E293B] text-slate-300 border-slate-700 hover:bg-slate-700'
                  }`}
                >
                  Hydrology
                </button>
                <button
                  onClick={() => setSelectedPayload('shelter')}
                  className={`px-3 py-1 rounded border text-xs font-bold uppercase transition-all cursor-pointer ${
                    selectedPayload === 'shelter'
                      ? 'bg-[#0F172A] text-[#F59E0B] border-amber-500/50'
                      : 'bg-[#1E293B] text-slate-300 border-slate-700 hover:bg-slate-700'
                  }`}
                >
                  Shelter
                </button>
                <button
                  onClick={() => setSelectedPayload('siren')}
                  className={`px-3 py-1 rounded border text-xs font-bold uppercase transition-all cursor-pointer ${
                    selectedPayload === 'siren'
                      ? 'bg-[#0F172A] text-[#F59E0B] border-amber-500/50'
                      : 'bg-[#1E293B] text-slate-300 border-slate-700 hover:bg-slate-700'
                  }`}
                >
                  Sirens
                </button>
              </div>
            </div>

            {/* Endpoint Bar */}
            <div className="bg-[#0F172A] px-3.5 py-2.5 rounded-lg border border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs mb-3">
              <span className="text-[#F59E0B] font-bold break-all">
                {payloads[selectedPayload].endpoint}
              </span>
              <button
                onClick={handleCopy}
                className="bg-[#1E293B] text-slate-200 hover:text-white hover:bg-slate-700 px-2.5 py-1 rounded border border-slate-700 flex items-center gap-1.5 text-[11px] font-bold uppercase cursor-pointer shrink-0"
                title="Copy JSON payload"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy JSON</span>
                  </>
                )}
              </button>
            </div>

            {/* JSON Code View */}
            <div className="bg-[#0F172A] p-4 rounded-lg border border-slate-800 text-[11px] text-slate-300 overflow-x-auto max-h-[360px] leading-relaxed">
              <pre>{payloads[selectedPayload].json}</pre>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-700 flex flex-wrap items-center justify-between gap-2 text-xs font-bold text-slate-400">
              <span className="text-[11px] sm:text-xs">Authentication: OAuth 2.0 Bearer + HMAC Signatures</span>
              <span className="bg-slate-800 text-slate-200 px-2 py-0.5 rounded border border-slate-700 uppercase text-[10px] shrink-0">HTTP/2 TLS 1.3</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
