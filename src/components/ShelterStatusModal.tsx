import React from 'react';
import { 
  X, 
  Building, 
  Users, 
  CheckCircle2, 
  AlertTriangle, 
  QrCode, 
  ShieldCheck, 
  MapPin, 
  ExternalLink,
  Bed
} from 'lucide-react';

interface ShelterStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ShelterData {
  id: string;
  name: string;
  location: string;
  currentOccupancy: number;
  maxCapacity: number;
  families: number;
  status: 'Available' | 'Nearing Capacity' | 'Full';
  rfidStation: string;
  specialSectors: { seniors: number; pwds: number; infants: number };
}

const SHELTERS_DATA: ShelterData[] = [
  {
    id: 'sh-01',
    name: 'Fairview High School Gym',
    location: 'Dahlia Ave, Fairview, QC District 5',
    currentOccupancy: 184,
    maxCapacity: 200,
    families: 42,
    status: 'Nearing Capacity',
    rfidStation: 'Terminal RFID-FRV-01 (Active)',
    specialSectors: { seniors: 24, pwds: 12, infants: 18 },
  },
  {
    id: 'sh-02',
    name: 'Batasan Hills National High School (NHS)',
    location: 'IBP Road, Batasan Hills, QC District 2',
    currentOccupancy: 256,
    maxCapacity: 400,
    families: 61,
    status: 'Available',
    rfidStation: 'Terminal RFID-BAT-02 & 03 (Active)',
    specialSectors: { seniors: 38, pwds: 16, infants: 26 },
  },
  {
    id: 'sh-03',
    name: 'Doña Imelda Covered Court',
    location: 'Bayani St, Doña Imelda, QC District 4',
    currentOccupancy: 147,
    maxCapacity: 150,
    families: 34,
    status: 'Full',
    rfidStation: 'Terminal RFID-IMD-01 (Full Roster)',
    specialSectors: { seniors: 19, pwds: 8, infants: 14 },
  },
];

export const ShelterStatusModal: React.FC<ShelterStatusModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const totalOccupancy = SHELTERS_DATA.reduce((acc, s) => acc + s.currentOccupancy, 0);
  const totalCapacity = SHELTERS_DATA.reduce((acc, s) => acc + s.maxCapacity, 0);
  const totalFamilies = SHELTERS_DATA.reduce((acc, s) => acc + s.families, 0);
  const aggregatePercent = Math.round((totalOccupancy / totalCapacity) * 100);

  const getStatusBadge = (status: ShelterData['status']) => {
    switch (status) {
      case 'Available':
        return (
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-tight bg-emerald-950/60 text-emerald-400 border border-emerald-500/40 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Available</span>
          </span>
        );
      case 'Nearing Capacity':
        return (
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-tight bg-amber-500/10 text-[#F59E0B] border border-amber-500/30 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]" />
            <span>Nearing Capacity</span>
          </span>
        );
      case 'Full':
        return (
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-tight bg-red-950/60 text-red-400 border border-red-500/40 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
            <span>Full (Redirecting)</span>
          </span>
        );
    }
  };

  const getProgressBarColor = (status: ShelterData['status']) => {
    switch (status) {
      case 'Available':
        return 'bg-emerald-500';
      case 'Nearing Capacity':
        return 'bg-amber-500';
      case 'Full':
        return 'bg-red-500';
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/80 backdrop-blur-md animate-fadeIn"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-[#1E293B] border border-slate-700 rounded-2xl max-w-3xl w-full shadow-2xl overflow-hidden font-mono text-slate-100 flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-slate-700 flex items-center justify-between bg-[#0F172A]/90">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <Building className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                REAL-TIME RFID / QR HEADCOUNT AUDIT
              </div>
              <h2 className="font-display text-lg sm:text-xl uppercase tracking-tight text-white">
                Evacuation Shelter Status
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg border border-slate-700 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scroll Area */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6">
          {/* Aggregate Capacity Overview Banner */}
          <div className="bg-[#0F172A] border border-slate-700/80 rounded-xl p-4 sm:p-5 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-bold">QUEZON CITY DISTRICT 2, 4, & 5 HUBS</span>
                <div className="text-xl sm:text-2xl font-bold text-white">
                  {totalOccupancy} / {totalCapacity} Cots Allotted ({aggregatePercent}%)
                </div>
              </div>
              <div className="text-left sm:text-right">
                <span className="text-xs text-emerald-400 font-bold uppercase">
                  {totalCapacity - totalOccupancy} Available Cots Remaining
                </span>
                <div className="text-[11px] text-slate-400">{totalFamilies} Families Checked In</div>
              </div>
            </div>

            {/* Overall Progress Bar */}
            <div className="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden border border-slate-800">
              <div 
                className="bg-amber-500 h-full transition-all duration-500" 
                style={{ width: `${aggregatePercent}%` }}
              />
            </div>
          </div>

          {/* Shelter Cards List */}
          <div className="space-y-4">
            {SHELTERS_DATA.map((shelter) => {
              const occupancyPercent = Math.round((shelter.currentOccupancy / shelter.maxCapacity) * 100);

              return (
                <div 
                  key={shelter.id}
                  className="bg-[#0F172A] border border-slate-700/80 rounded-xl p-4 sm:p-5 space-y-3 hover:border-slate-600 transition-colors"
                >
                  {/* Card Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-display text-base text-white uppercase tracking-tight">
                          {shelter.name}
                        </h3>
                      </div>
                      <div className="text-[11px] text-slate-400 font-sans flex items-center gap-1.5 mt-0.5">
                        <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                        <span>{shelter.location}</span>
                      </div>
                    </div>
                    <div>
                      {getStatusBadge(shelter.status)}
                    </div>
                  </div>

                  {/* Occupancy and Capacity Progress Bar */}
                  <div className="space-y-1.5 pt-1">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-300">
                        Current Occupancy: <strong className="text-white">{shelter.currentOccupancy}</strong> / {shelter.maxCapacity} cots
                      </span>
                      <span className="font-bold text-white">{occupancyPercent}%</span>
                    </div>
                    <div className="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden border border-slate-800">
                      <div 
                        className={`h-full transition-all duration-500 ${getProgressBarColor(shelter.status)}`}
                        style={{ width: `${occupancyPercent}%` }}
                      />
                    </div>
                  </div>

                  {/* Shelter Details / Special Sectors */}
                  <div className="pt-2 border-t border-slate-800/80 flex flex-wrap items-center justify-between text-xs text-slate-400 gap-2">
                    <div className="flex items-center gap-4 text-[11px]">
                      <span className="text-slate-300">
                        Families: <strong className="text-white">{shelter.families}</strong>
                      </span>
                      <span>•</span>
                      <span>Seniors: <strong className="text-slate-200">{shelter.specialSectors.seniors}</strong></span>
                      <span>PWDs: <strong className="text-slate-200">{shelter.specialSectors.pwds}</strong></span>
                      <span>Infants: <strong className="text-slate-200">{shelter.specialSectors.infants}</strong></span>
                    </div>

                    <div className="text-[10px] text-sky-400 font-mono flex items-center gap-1">
                      <QrCode className="w-3 h-3" />
                      <span>{shelter.rfidStation}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-700 bg-[#0F172A] flex items-center justify-between text-xs">
          <span className="text-slate-400 text-[11px]">
            Synced with DSWD & Quezon City Social Services Development Department (SSDD)
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg uppercase font-bold text-xs border border-slate-700 cursor-pointer transition-colors"
          >
            Close Headcount
          </button>
        </div>
      </div>
    </div>
  );
};
