# CryoTrack - Cryopreservation Management System

**Smart cryogenic sample management for IVF clinics**

CryoTrack is a comprehensive web-based system designed to help small to medium-sized IVF clinics manage their cryopreserved samples (embryos, eggs, and sperm) with precision and ease.

## 🎯 Key Features

### Core Features (MVP)
- ✅ **Sample Management** - Complete CRUD operations for embryos, eggs, and sperm samples
- ✅ **Quick Search** - Find samples instantly by patient name, ID, or barcode
- ✅ **Storage Layout Visualization** - Visual representation of tank, canister, and goblet layout
- ✅ **Temperature Monitoring** - Real-time temperature tracking and alerts
- ✅ **Patient Management** - Comprehensive patient information management
- ✅ **Audit Logging** - Complete audit trail for all operations
- ⏳ **Patient Reports** - Generate PDF reports for patients
- ⏳ **Authentication** - Multi-tenant authentication system

### Upcoming Features
- 🔜 Barcode generation and printing
- 🔜 Batch import/export (Excel)
- 🔜 Email notifications
- 🔜 Advanced analytics and reporting
- 🔜 Automatic reminders for nitrogen refills

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Deployment**: Vercel

## 📋 Prerequisites

- Node.js 18+ and npm
- Supabase account (free tier available)
- Git

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd cryo-management-system
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to Project Settings > API
3. Copy your project URL and anon key
4. Go to SQL Editor and run the schema from `lib/supabase/schema.sql`

### 4. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## 📂 Project Structure

```
cryo-management-system/
├── app/                      # Next.js app directory
│   ├── api/                  # API routes
│   │   ├── samples/          # Sample management endpoints
│   │   └── tanks/            # Tank management endpoints
│   ├── dashboard/            # Dashboard page
│   ├── samples/              # Sample management pages
│   ├── search/               # Quick search page
│   ├── tanks/                # Storage layout page
│   ├── temperature/          # Temperature monitoring page
│   ├── patients/             # Patient management pages
│   └── globals.css           # Global styles
├── components/               # React components
│   ├── layout/               # Layout components
│   └── ui/                   # Reusable UI components
├── lib/                      # Utility libraries
│   └── supabase/             # Supabase client and schema
├── types/                    # TypeScript type definitions
└── public/                   # Static assets
```

## 🗄️ Database Schema

The system uses the following main tables:

- **clinics** - Multi-tenant clinic information
- **users** - User accounts with role-based access
- **patients** - Patient information
- **tanks** - Liquid nitrogen tank information
- **samples** - Cryopreserved sample records (core table)
- **temperature_logs** - Temperature monitoring history
- **audit_logs** - Complete audit trail
- **alerts** - System alerts and warnings

See `lib/supabase/schema.sql` for the complete schema.

## 🔐 Security Features

- Row Level Security (RLS) for multi-tenant data isolation
- Role-based access control (Admin, Embryologist, Nurse, Viewer)
- Complete audit logging of all operations
- HTTPS-only communication
- Encrypted data storage

## 📊 User Roles

| Role | Permissions |
|------|------------|
| **Admin** | Full access to all features |
| **Embryologist** | Add/edit samples, generate reports, view all samples |
| **Nurse** | Search samples, print location cards, record retrievals |
| **Viewer** | Read-only access, view samples and generate patient reports |

## 🧪 Development

### Running Tests

```bash
npm run test
```

### Building for Production

```bash
npm run build
npm start
```

### Linting

```bash
npm run lint
```

## 📱 Key Pages

- `/` - Landing page
- `/dashboard` - Main dashboard with quick stats
- `/samples` - Sample management list
- `/samples/new` - Add new sample
- `/search` - Quick search interface
- `/tanks` - Storage layout visualization
- `/temperature` - Temperature monitoring
- `/patients` - Patient management

## 🔧 API Endpoints

### Samples
- `GET /api/samples` - List all samples (with filters)
- `POST /api/samples` - Create new sample
- `GET /api/samples/:id` - Get sample details
- `PUT /api/samples/:id` - Update sample
- `DELETE /api/samples/:id` - Mark sample as discarded
- `POST /api/samples/:id/retrieve` - Mark sample as retrieved

### Tanks
- `GET /api/tanks` - List all tanks
- `POST /api/tanks` - Create new tank
- `GET /api/tanks/:id/layout` - Get tank layout with samples

## 🎨 Design System

The application uses a custom color palette optimized for medical/laboratory use:

- **Primary**: #0066CC (Professional blue)
- **Secondary**: #00A86B (Success green)
- **Warning**: #F59E0B (Caution yellow)
- **Danger**: #EF4444 (Alert red)

## 📖 Documentation

For detailed product requirements and specifications, see [Cryo-Management-System-PRD.md](./Cryo-Management-System-PRD.md).

## 🤝 Contributing

This is currently a private project. For questions or suggestions, please contact the project maintainer.

## 📄 License

Proprietary - All rights reserved

## 🐛 Known Issues / TODO

- [ ] Complete authentication system implementation
- [ ] Add barcode generation and printing
- [ ] Implement PDF report generation
- [ ] Add batch import/export functionality
- [ ] Implement email notifications
- [ ] Add temperature sensor integration
- [ ] Create automated testing suite
- [ ] Add data migration tools

## 📞 Support

For support, please contact the development team.

---

**Version**: 0.1.0 (MVP)
**Status**: In Development
**Target Launch**: Q1 2025
