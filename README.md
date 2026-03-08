🌿 Wellness Events Frontend
Overview

This is the ReactJS frontend for the Wellness Events web application.
It allows HR users to create wellness events and Vendor users to view and approve/reject events.

Key features:

Role-based dashboards (HR / Vendor)

Event creation form with 3 proposed dates and location

Event detail modal with approve/reject functionality

Type-safe forms with validation

Reusable components: Button, Modal, DataTable

Technology Stack

ReactJS + TypeScript

Tailwind CSS for styling

Axios for API calls

React Router v7 for routing

Deployed on Vercel (optional)

Installation

Clone the repository:

git clone https://github.com/<yourusername>/wellness-events-frontend.git
cd wellness-events-frontend

Install dependencies:

npm install

Create .env file in the root and add:

VITE_API_URL=https://wellness-events-backend.onrender.com/api

Update the URL if your backend is deployed elsewhere.

Run the development server:

npm run dev

The app will be available at http://localhost:5173.

Folder Structure
src/
├─ api/              # Axios API calls
├─ auth/             # Auth context & hooks
├─ components/       # Reusable UI components (Button, Modal, DataTable, EventForm)
├─ hooks/            # Custom hooks (e.g., useHREvents)
├─ pages/            # Dashboard pages (HRDashboard, VendorDashboard, Login)
├─ types/            # TypeScript types
└─ App.tsx           # Main app component & routes
Screenshots

Replace with your screenshots

HR Dashboard:


Vendor Dashboard:


Event Modal:


Pre-Created Accounts
Role	Username	Password	Company Name
HR	hr_admin	hr123	WellnessCorp
Vendor	vendor_healthplus	vendor123	HealthPlus
Deployment

Frontend is deployed on Vercel:
https://wellness-events-frontend.vercel.app

Make sure your backend allows CORS and cookies for this frontend URL.

Notes

Reusable components simplify adding new features.

Role-based access ensures vendors only see their events, HR sees theirs.

Proper form validation prevents invalid data submission.