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

| Login | HR Dashboard | Vendor Dashboard | Event Modal |
|---|---|---|---|
| <img width="1280" height="674" alt="image" src="https://github.com/user-attachments/assets/44d073ad-1631-4ec5-9492-d620d38f6708" /> |<img width="400" src="https://github.com/user-attachments/assets/877acf13-7eb4-47e5-a8e0-e1b078e34e04" /> | <img width="400" src="https://github.com/user-attachments/assets/c605c2e4-c844-4438-bacb-ed6b7679520e" /> | <img width="400" src="https://github.com/user-attachments/assets/06933df4-e62f-4190-9c00-587707572c34" /> |

---

## 👤 Pre-Created Accounts

| Role | Username | Password | Company | Events |
|---|---|---|---|---|
| Vendor | `vendor_healthplus` | `123456` | HealthPlus Pte Ltd | Health Talk, Blood Pressure Screening |
| Vendor | `vendor_medilife` | `vendor1` | MediLife Services Pte Ltd | Eye Screening |
| Vendor | `vendor_fitwell` | `vendor2` | FitWell Pte Ltd | Fitness Assessment |
| Vendor | `vendor_mindcare` | `vendor3` | MindCare Wellness Pte Ltd | Mental Wellness Talk |
| HR | `hr_techcorp` | `1234hr1` | TechCorp | — |
| HR | `hr_globalinc` | `1234hr2` | GlobalInc | — |

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
