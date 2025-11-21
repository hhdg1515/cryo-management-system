// Database Types
export interface Clinic {
  id: string
  name: string
  email: string
  phone?: string
  address?: string
  created_at: string
  subscription_status: 'trial' | 'active' | 'suspended'
  subscription_end_date?: string
}

export interface User {
  id: string
  clinic_id: string
  email: string
  name: string
  role: 'admin' | 'embryologist' | 'nurse' | 'viewer'
  phone?: string
  is_active: boolean
  last_login?: string
  created_at: string
}

export interface Patient {
  id: string
  clinic_id: string
  patient_id: string
  first_name: string
  last_name: string
  date_of_birth: string
  email?: string
  phone?: string
  address?: string
  created_at: string
  updated_at: string
}

export interface Tank {
  id: string
  clinic_id: string
  tank_name: string
  capacity: number
  current_temp?: number
  nitrogen_level?: number
  last_refill_date?: string
  location?: string
  is_active: boolean
  created_at: string
}

export interface Sample {
  id: string
  clinic_id: string
  patient_id: string
  sample_id: string
  sample_type: 'embryo' | 'egg' | 'sperm'
  quantity: number
  quality?: string
  freeze_date: string
  freeze_method?: 'vitrification' | 'slow_freeze'
  tank_id: string
  canister_number: number
  goblet_number: number
  straw_position?: string
  status: 'stored' | 'retrieved' | 'used' | 'discarded'
  retrieval_date?: string
  retrieval_reason?: string
  created_by: string
  created_at: string
  updated_at: string
}

export interface TemperatureLog {
  id: string
  tank_id: string
  temperature: number
  nitrogen_level?: number
  recorded_at: string
  recorded_by: string
  notes?: string
}

export interface AuditLog {
  id: string
  clinic_id: string
  user_id: string
  action_type: 'create' | 'update' | 'retrieve' | 'discard' | 'view'
  entity_type: 'sample' | 'patient' | 'tank'
  entity_id: string
  old_value?: any
  new_value?: any
  ip_address?: string
  user_agent?: string
  notes?: string
  created_at: string
}

export interface Alert {
  id: string
  clinic_id: string
  tank_id: string
  alert_type: 'temperature' | 'nitrogen_low' | 'maintenance'
  severity: 'warning' | 'critical'
  message: string
  is_resolved: boolean
  resolved_by?: string
  resolved_at?: string
  resolution_notes?: string
  created_at: string
}

// API Types
export interface SampleCreateInput {
  patientId: string
  sampleType: 'embryo' | 'egg' | 'sperm'
  quantity: number
  quality?: string
  freezeDate: string
  freezeMethod: 'vitrification' | 'slow_freeze'
  location: {
    tankId: string
    canisterNumber: number
    gobletNumber: number
    strawPosition: string
  }
}

export interface SampleSearchParams {
  q?: string
  patientId?: string
  sampleId?: string
  sampleType?: 'embryo' | 'egg' | 'sperm'
  status?: 'stored' | 'retrieved' | 'used' | 'discarded'
  tankId?: string
}

export interface TankLayout {
  tankName: string
  capacity: number
  occupied: number
  canisters: CanisterInfo[]
}

export interface CanisterInfo {
  number: number
  goblets: GobletInfo[]
}

export interface GobletInfo {
  number: number
  isEmpty: boolean
  patient?: string
  samples?: number
  sampleId?: string
}

export interface TemperatureHistory {
  current: number
  history: TemperatureDataPoint[]
}

export interface TemperatureDataPoint {
  timestamp: string
  temperature: number
  nitrogenLevel?: number
}
