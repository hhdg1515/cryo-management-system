import React from 'react'
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer'

// Define styles
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 11,
    fontFamily: 'Helvetica',
  },
  header: {
    marginBottom: 20,
    borderBottom: 2,
    borderBottomColor: '#0066CC',
    paddingBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0066CC',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 10,
    color: '#666',
  },
  section: {
    marginTop: 15,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
    borderBottom: 1,
    borderBottomColor: '#E5E7EB',
    paddingBottom: 4,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  label: {
    width: '40%',
    fontWeight: 'bold',
    color: '#374151',
  },
  value: {
    width: '60%',
    color: '#1F2937',
  },
  sampleCard: {
    backgroundColor: '#F9FAFB',
    padding: 12,
    marginBottom: 10,
    borderRadius: 4,
    border: 1,
    borderColor: '#E5E7EB',
  },
  sampleType: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#0066CC',
  },
  qualityBadge: {
    backgroundColor: '#10B981',
    color: 'white',
    padding: '4 8',
    borderRadius: 3,
    fontSize: 9,
    marginTop: 4,
    alignSelf: 'flex-start',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    borderTop: 1,
    borderTopColor: '#E5E7EB',
    paddingTop: 10,
    fontSize: 9,
    color: '#6B7280',
  },
  checkmark: {
    color: '#10B981',
    marginRight: 5,
  },
  qaSection: {
    backgroundColor: '#EFF6FF',
    padding: 12,
    borderRadius: 4,
    marginTop: 10,
  },
  qaItem: {
    flexDirection: 'row',
    marginBottom: 4,
  },
})

interface Sample {
  sampleType: string
  quantity: number
  quality?: string
  freezeDate: string
  freezeMethod: string
  location: string
  status: string
}

interface PatientData {
  firstName: string
  lastName: string
  dateOfBirth: string
  patientId: string
  samples: Sample[]
}

interface ClinicData {
  name: string
  address?: string
  phone?: string
  email?: string
}

interface PatientReportProps {
  patient: PatientData
  clinic: ClinicData
  reportDate: string
}

export const PatientReport: React.FC<PatientReportProps> = ({ patient, clinic, reportDate }) => {
  const calculateStorageDuration = (freezeDate: string) => {
    const freeze = new Date(freezeDate)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - freeze.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays < 30) return `${diffDays} days`
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months`
    return `${Math.floor(diffDays / 365)} years`
  }

  const getSampleTypeDisplay = (type: string) => {
    const types: { [key: string]: string } = {
      embryo: 'Embryos',
      egg: 'Eggs',
      sperm: 'Sperm',
    }
    return types[type] || type
  }

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>CRYOPRESERVATION STORAGE REPORT</Text>
          <Text style={styles.subtitle}>{clinic.name}</Text>
          <Text style={styles.subtitle}>Report Date: {new Date(reportDate).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}</Text>
        </View>

        {/* Patient Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Patient Information</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Name:</Text>
            <Text style={styles.value}>{patient.firstName} {patient.lastName}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Date of Birth:</Text>
            <Text style={styles.value}>{new Date(patient.dateOfBirth).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Patient ID:</Text>
            <Text style={styles.value}>{patient.patientId}</Text>
          </View>
        </View>

        {/* Stored Samples */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Stored Samples</Text>
          {patient.samples.map((sample, index) => (
            <View key={index} style={styles.sampleCard}>
              <Text style={styles.sampleType}>
                {getSampleTypeDisplay(sample.sampleType)} - {sample.quantity} unit{sample.quantity > 1 ? 's' : ''}
              </Text>

              {sample.quality && (
                <View style={styles.row}>
                  <Text style={styles.label}>Quality Grade:</Text>
                  <Text style={styles.value}>{sample.quality}</Text>
                </View>
              )}

              <View style={styles.row}>
                <Text style={styles.label}>Freeze Date:</Text>
                <Text style={styles.value}>{new Date(sample.freezeDate).toLocaleDateString('en-US')}</Text>
              </View>

              <View style={styles.row}>
                <Text style={styles.label}>Freeze Method:</Text>
                <Text style={styles.value}>{sample.freezeMethod === 'vitrification' ? 'Vitrification' : 'Slow Freeze'}</Text>
              </View>

              <View style={styles.row}>
                <Text style={styles.label}>Storage Duration:</Text>
                <Text style={styles.value}>{calculateStorageDuration(sample.freezeDate)}</Text>
              </View>

              <View style={styles.row}>
                <Text style={styles.label}>Status:</Text>
                <Text style={styles.value}>{sample.status.charAt(0).toUpperCase() + sample.status.slice(1)}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Storage Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Storage Details</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Storage Location:</Text>
            <Text style={styles.value}>Secure Cryogenic Tank Facility</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Total Samples:</Text>
            <Text style={styles.value}>{patient.samples.length}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Monthly Storage Fee:</Text>
            <Text style={styles.value}>$50/month (per sample set)</Text>
          </View>
        </View>

        {/* Quality Assurance */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quality Assurance</Text>
          <View style={styles.qaSection}>
            <View style={styles.qaItem}>
              <Text style={styles.checkmark}>✓</Text>
              <Text>Temperature maintained at -196°C (liquid nitrogen)</Text>
            </View>
            <View style={styles.qaItem}>
              <Text style={styles.checkmark}>✓</Text>
              <Text>24/7 continuous temperature monitoring</Text>
            </View>
            <View style={styles.qaItem}>
              <Text style={styles.checkmark}>✓</Text>
              <Text>Automated alert system for temperature deviations</Text>
            </View>
            <View style={styles.qaItem}>
              <Text style={styles.checkmark}>✓</Text>
              <Text>Daily facility inspections and documentation</Text>
            </View>
            <View style={styles.qaItem}>
              <Text style={styles.checkmark}>✓</Text>
              <Text>Backup power supply and emergency protocols</Text>
            </View>
            <View style={styles.qaItem}>
              <Text style={styles.checkmark}>✓</Text>
              <Text>Complete audit trail for all sample handling</Text>
            </View>
          </View>

          <Text style={{ marginTop: 10, fontSize: 10, color: '#374151' }}>
            Your samples are stored securely and monitored continuously to ensure their safety and viability.
            All storage procedures comply with industry standards and regulatory requirements.
          </Text>
        </View>

        {/* Important Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Important Information</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Next Review Date:</Text>
            <Text style={styles.value}>
              {new Date(new Date(reportDate).setFullYear(new Date(reportDate).getFullYear() + 1)).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </Text>
          </View>
          <Text style={{ fontSize: 9, color: '#6B7280', marginTop: 8 }}>
            For any questions regarding your stored samples, please contact our clinic at {clinic.phone || '(XXX) XXX-XXXX'}
            or {clinic.email || 'info@clinic.com'}.
          </Text>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text>This report is confidential and intended solely for the patient named above.</Text>
          <Text style={{ marginTop: 2 }}>
            Generated by CryoTrack™ - Cryopreservation Management System | {clinic.name}
          </Text>
        </View>
      </Page>
    </Document>
  )
}
