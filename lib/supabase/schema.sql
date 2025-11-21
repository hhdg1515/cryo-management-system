-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Clinics table (multi-tenant)
CREATE TABLE IF NOT EXISTS clinics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE,
  phone VARCHAR(50),
  address TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  subscription_status VARCHAR(50) DEFAULT 'trial',
  subscription_end_date DATE
);

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  clinic_id UUID REFERENCES clinics(id) ON DELETE CASCADE,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(100) NOT NULL,
  role VARCHAR(50) NOT NULL CHECK (role IN ('admin', 'embryologist', 'nurse', 'viewer')),
  phone VARCHAR(50),
  is_active BOOLEAN DEFAULT true,
  last_login TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Patients table
CREATE TABLE IF NOT EXISTS patients (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  clinic_id UUID REFERENCES clinics(id) ON DELETE CASCADE,
  patient_id VARCHAR(50) NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  date_of_birth DATE NOT NULL,
  email VARCHAR(255),
  phone VARCHAR(50),
  address TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(clinic_id, patient_id)
);

-- Tanks table
CREATE TABLE IF NOT EXISTS tanks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  clinic_id UUID REFERENCES clinics(id) ON DELETE CASCADE,
  tank_name VARCHAR(50) NOT NULL,
  capacity INTEGER NOT NULL,
  current_temp DECIMAL(5,2),
  nitrogen_level INTEGER CHECK (nitrogen_level >= 0 AND nitrogen_level <= 100),
  last_refill_date DATE,
  location VARCHAR(100),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(clinic_id, tank_name)
);

-- Samples table (core)
CREATE TABLE IF NOT EXISTS samples (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  clinic_id UUID REFERENCES clinics(id) ON DELETE CASCADE,
  patient_id UUID REFERENCES patients(id) ON DELETE CASCADE,

  sample_id VARCHAR(100) UNIQUE NOT NULL,
  sample_type VARCHAR(50) NOT NULL CHECK (sample_type IN ('embryo', 'egg', 'sperm')),
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  quality VARCHAR(255),
  freeze_date DATE NOT NULL,
  freeze_method VARCHAR(50) CHECK (freeze_method IN ('vitrification', 'slow_freeze')),

  tank_id UUID REFERENCES tanks(id) ON DELETE RESTRICT,
  canister_number INTEGER NOT NULL CHECK (canister_number > 0),
  goblet_number INTEGER NOT NULL CHECK (goblet_number > 0),
  straw_position VARCHAR(20),

  status VARCHAR(50) DEFAULT 'stored' CHECK (status IN ('stored', 'retrieved', 'used', 'discarded')),
  retrieval_date DATE,
  retrieval_reason TEXT,

  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  UNIQUE(clinic_id, tank_id, canister_number, goblet_number, straw_position)
);

-- Temperature logs table
CREATE TABLE IF NOT EXISTS temperature_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tank_id UUID REFERENCES tanks(id) ON DELETE CASCADE,
  temperature DECIMAL(5,2) NOT NULL,
  nitrogen_level INTEGER CHECK (nitrogen_level >= 0 AND nitrogen_level <= 100),
  recorded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  recorded_by VARCHAR(50),
  notes TEXT
);

-- Audit logs table
CREATE TABLE IF NOT EXISTS audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  clinic_id UUID REFERENCES clinics(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id),

  action_type VARCHAR(50) NOT NULL CHECK (action_type IN ('create', 'update', 'retrieve', 'discard', 'view')),
  entity_type VARCHAR(50) NOT NULL CHECK (entity_type IN ('sample', 'patient', 'tank')),
  entity_id UUID NOT NULL,

  old_value JSONB,
  new_value JSONB,

  ip_address VARCHAR(50),
  user_agent TEXT,
  notes TEXT,

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Alerts table
CREATE TABLE IF NOT EXISTS alerts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  clinic_id UUID REFERENCES clinics(id) ON DELETE CASCADE,
  tank_id UUID REFERENCES tanks(id) ON DELETE CASCADE,

  alert_type VARCHAR(50) NOT NULL CHECK (alert_type IN ('temperature', 'nitrogen_low', 'maintenance')),
  severity VARCHAR(20) NOT NULL CHECK (severity IN ('warning', 'critical')),
  message TEXT NOT NULL,

  is_resolved BOOLEAN DEFAULT false,
  resolved_by UUID REFERENCES users(id),
  resolved_at TIMESTAMP WITH TIME ZONE,
  resolution_notes TEXT,

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_patients_clinic ON patients(clinic_id);
CREATE INDEX IF NOT EXISTS idx_patients_patient_id ON patients(patient_id);
CREATE INDEX IF NOT EXISTS idx_samples_clinic ON samples(clinic_id);
CREATE INDEX IF NOT EXISTS idx_samples_patient ON samples(patient_id);
CREATE INDEX IF NOT EXISTS idx_samples_tank ON samples(tank_id);
CREATE INDEX IF NOT EXISTS idx_samples_sample_id ON samples(sample_id);
CREATE INDEX IF NOT EXISTS idx_samples_status ON samples(status);
CREATE INDEX IF NOT EXISTS idx_audit_logs_clinic ON audit_logs(clinic_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_entity ON audit_logs(entity_type, entity_id);
CREATE INDEX IF NOT EXISTS idx_temperature_logs_tank ON temperature_logs(tank_id);
CREATE INDEX IF NOT EXISTS idx_alerts_clinic ON alerts(clinic_id);

-- Enable Row Level Security
ALTER TABLE clinics ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE tanks ENABLE ROW LEVEL SECURITY;
ALTER TABLE samples ENABLE ROW LEVEL SECURITY;
ALTER TABLE temperature_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE alerts ENABLE ROW LEVEL SECURITY;

-- RLS Policies (basic - users can only access their clinic's data)
-- These need to be expanded based on Supabase Auth setup

-- Update timestamp trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_patients_updated_at BEFORE UPDATE ON patients
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_samples_updated_at BEFORE UPDATE ON samples
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
