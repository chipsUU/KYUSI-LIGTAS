export type AlertStatus = 'normal' | 'advisory' | 'mandatory';

export interface TelemetryData {
  waterLevel: number; // in meters
  flowVelocity: number; // in m/s
  rainfallRate: number; // in mm/hr
  siltBlockagePercent: number; // in %
  batteryPercent: number;
  solarVoltage: number;
  solarCurrent: number;
  rssi: number;
  lastUpdated: string;
}

export interface PredictionPoint {
  timeOffset: string;
  waterElevation: number;
  rateOfRise: number;
  stage: 'SAFE' | 'ADVISORY' | 'CRITICAL';
}

export interface BroadcastLog {
  id: string;
  timestamp: string;
  channel: string;
  targetZone: string;
  status: 'SENT' | 'ACKNOWLEDGED' | 'DISPATCHED';
  latencySeconds: number;
}

export interface ShelterInfo {
  id: string;
  name: string;
  barangay: string;
  capacity: number;
  currentCount: number;
  distanceMeters: number;
  walkMinutes: number;
  petFriendly: boolean;
  pwdAccessible: boolean;
  medicalTeamPresent: boolean;
  status: 'available' | 'near-capacity' | 'full';
}

export interface EvacueeRecord {
  id: string;
  householdHead: string;
  purokSector?: string;
  familyMembersCount: number;
  assignedRoomCot?: string;
  reliefPackClaimed?: boolean;
  specialNeeds?: string[];
  registeredAt?: string;
  rfidTagUid?: string;
  barangay?: string;
  assignedShelter?: string;
  roomAssignment?: string;
  rfidUid?: string;
  timestampCheckedIn?: string;
  reliefPacksIssued?: number;
  vulnerabilities?: string[];
}

export interface ChecklistItem {
  id: string;
  label: string;
  category: 'water_food' | 'documents' | 'medical' | 'tools';
  checked: boolean;
}
