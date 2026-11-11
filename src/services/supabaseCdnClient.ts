/**
 * Supabase CDN Service for KYUSI-LIGTAS
 *
 * Configured with user credentials:
 * Project URL: https://beuctqlxlmtvfaqwykyy.supabase.co
 * Publishable Key: sb_publishable_2zA6pwmD_-OCBmrPztoSiw_3V13XZYt
 *
 * Connects to the 'registrations' table, fetching records ordered by created_at DESC.
 * Polled every 3 seconds for live hardware RFID/QR admissions.
 */

export const SUPABASE_PROJECT_URL = 'https://beuctqlxlmtvfaqwykyy.supabase.co';
export const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_2zA6pwmD_-OCBmrPztoSiw_3V13XZYt';

export interface RegistrationRecord {
  id?: string | number;
  resident_id: string;
  action: string;
  method: string;
  created_at?: string;
  barangay?: string;
  details?: string;
  [key: string]: any;
}

import { createClient as createBundledClient } from '@supabase/supabase-js';

// Global window reference for Supabase loaded via CDN script
declare global {
  interface Window {
    supabase?: {
      createClient: (url: string, key: string, options?: any) => any;
    };
  }
}

let supabaseCdnClientInstance: any = null;

/**
 * Initializes and returns the Supabase client using either window.supabase or the bundled npm package.
 * Seamlessly functions in both web (CDN) and native Android (bundled npm).
 */
export function getSupabaseCdnClient() {
  if (supabaseCdnClientInstance) {
    return supabaseCdnClientInstance;
  }

  // 1. Try window.supabase CDN
  if (typeof window !== 'undefined' && window.supabase && typeof window.supabase.createClient === 'function') {
    try {
      supabaseCdnClientInstance = window.supabase.createClient(
        SUPABASE_PROJECT_URL,
        SUPABASE_PUBLISHABLE_KEY,
        {
          auth: {
            persistSession: true,
            autoRefreshToken: true,
          },
        }
      );
      return supabaseCdnClientInstance;
    } catch (err) {
      console.warn('Failed initializing via window.supabase CDN client:', err);
    }
  }

  // 2. Bundled npm package fallback (for Capacitor / native APK where CDN scripts are not present)
  try {
    supabaseCdnClientInstance = createBundledClient(
      SUPABASE_PROJECT_URL,
      SUPABASE_PUBLISHABLE_KEY,
      {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
        },
      }
    );
    return supabaseCdnClientInstance;
  } catch (err) {
    console.warn('Failed initializing bundled Supabase client:', err);
  }

  return null;
}

/**
 * Queries the 'registrations' table, ordering results by created_at descending.
 * Returns the registrations array or an empty array with diagnostic error.
 */
export async function fetchRegistrations(): Promise<{
  data: RegistrationRecord[];
  error: string | null;
  timestamp: string;
}> {
  const timestamp = new Date().toLocaleTimeString('en-PH', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  const client = getSupabaseCdnClient();

  if (!client) {
    // If CDN script is still downloading or blocked, attempt to wait briefly or return informative message
    return {
      data: [],
      error: 'Supabase CDN client initializing...',
      timestamp,
    };
  }

  try {
    const { data, error } = await client
      .from('registrations')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase query error on registrations table:', error);
      return {
        data: [],
        error: error.message || 'Error querying registrations table',
        timestamp,
      };
    }

    // Map and sanitize results to ensure resident_id, action, method exist
    const mapped: RegistrationRecord[] = (data || []).map((row: any, idx: number) => ({
      id: row.id || `reg-${idx}`,
      resident_id: row.resident_id || row.residentId || row.user_id || `RES-${1000 + idx}`,
      action: row.action || row.type || row.status || 'CHECK-IN',
      method: row.method || row.channel || row.scan_type || 'RFID',
      created_at: row.created_at || new Date().toISOString(),
      barangay: row.barangay || 'Fairview',
      details: row.details || row.remarks || '',
    }));

    return {
      data: mapped,
      error: null,
      timestamp,
    };
  } catch (err: any) {
    console.error('Unexpected exception querying Supabase registrations:', err);
    return {
      data: [],
      error: err?.message || 'Network error fetching registrations from Supabase',
      timestamp,
    };
  }
}

/**
 * Inserts a hardware scan into the Supabase registrations table.
 * Useful for testing hardware scans and real-time updates directly from the dashboard.
 */
export async function insertHardwareScan(scan: {
  resident_id: string;
  action: string;
  method: string;
  barangay?: string;
  details?: string;
}): Promise<{ success: boolean; error?: string }> {
  const client = getSupabaseCdnClient();
  if (!client) {
    return { success: false, error: 'Supabase CDN client not initialized' };
  }

  try {
    const { error } = await client.from('registrations').insert([
      {
        resident_id: scan.resident_id,
        action: scan.action,
        method: scan.method,
        barangay: scan.barangay || 'Fairview',
        created_at: new Date().toISOString(),
        details: scan.details || 'Admitted via Gate RC522 Reader',
      },
    ]);

    if (error) {
      console.warn('Insert hardware scan notice:', error.message);
      return { success: false, error: error.message };
    }
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Error inserting scan' };
  }
}
