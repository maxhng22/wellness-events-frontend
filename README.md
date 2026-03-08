# 🌿 Wellness Events — Frontend

A role-based wellness event management platform built with **React + TypeScript**. HR users can create events with proposed dates and locations, while Vendor users can review and approve or reject them.

---

## ✨ Features

- 🔐 Role-based dashboards — **HR** and **Vendor** views
- 📅 Event creation with 3 proposed dates & location autocomplete
- ✅ Approve / Reject event modal for vendors
- 🧩 Reusable components: `Button`, `Modal`, `DataTable`
- 🛡️ Type-safe forms with validation

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| UI | ReactJS + TypeScript |
| Styling | Tailwind CSS |
| HTTP | Axios |
| Routing | React Router v7 |
| Deployment | Vercel |

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/<yourusername>/wellness-events-frontend.git
cd wellness-events-frontend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment

Create a `.env` file in the project root:
```env
VITE_API_URL=https://wellness-events-backend.onrender.com/api
```

> Update the URL if your backend is hosted elsewhere.

### 4. Start the dev server
```bash
npm run dev
```

App runs at **http://localhost:5173**

---

## 📁 Folder Structure
```
src/
├─ api/              # Axios API calls
├─ auth/             # Auth context & hooks
├─ components/       # Reusable UI (Button, Modal, DataTable, EventForm)
├─ hooks/            # Custom hooks (e.g. useHREvents)
├─ pages/            # Dashboard pages (HRDashboard, VendorDashboard, Login)
├─ types/            # TypeScript interfaces
└─ App.tsx           # Root component & routes
```

---

## 📸 Screenshots

| HR Dashboard | Vendor Dashboard | Event Modal |
|---|---|---|
| *(coming soon)* | *(coming soon)* | *(coming soon)* |

---

## 👤 Pre-Created Accounts

| Role | Username | Password | Company |
|---|---|---|---|
| HR | `hr_admin` | `hr123` | WellnessCorp |
| Vendor | `vendor_healthplus` | `vendor123` | HealthPlus |

---

## 🌐 Deployment

Frontend is live on Vercel:
**[https://wellness-events-frontend.vercel.app](https://wellness-events-frontend.vercel.app)**

> Ensure your backend has CORS and cookie support enabled for this origin.

---

## 📝 Notes

- Reusable components make it easy to extend with new features
- Vendors only see events assigned to them; HR sees their own
- Form validation prevents incomplete or invalid submissions