# Novaji Mobile App

A modern, full-stack React Native e-commerce and fintech dashboard application built with Expo and Express.js.

## 🚀 Features

### Authentication
- **Secure Sign Up & Login**: JWT-based authentication with secure storage.
- **Password Visibility**: Toggle to show/hide passwords for better UX.
- **Form Validation**: Robust validation using `zod` and `react-hook-form`.
- **Auto-Redirection**: Intelligent routing based on authentication state.

### E-Commerce & Payments
- **Product Catalog**: Browse products fetched dynamically from the backend.
- **Shopping Cart**: Persistent cart management (add, remove, update quantities) using `Zustand`.
- **Stripe Integration**: Secure checkout flow with Stripe Payment Sheet.
- **Order Management**: Real-time order processing.

### Dashboard & UI
- **Modern Home Screen**: 
  - Total balance overview.
  - Quick actions (Send Money, Pay Bills, Top Up).
  - Recent transaction history.
- **Profile Management**: 
  - Account settings and preferences.
  - User badges (Premium, Verified).
  - Secure logout.
- **Custom Toasts**: Beautiful, non-intrusive notification system.
- **Tab Navigation**: Compass icon for Explore tab, smooth transitions.

## 🛠 Tech Stack

### Frontend (Mobile)
- **Framework**: [Expo](https://expo.dev) (React Native)
- **Language**: TypeScript
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Navigation**: [Expo Router](https://docs.expo.dev/router/introduction)
- **Styling**: [NativeWind](https://www.nativewind.dev/) (Tailwind CSS)
- **Networking**: [TanStack Query](https://tanstack.com/query/latest) & Axios
- **Forms**: React Hook Form & Zod
- **Payments**: @stripe/stripe-react-native
- **Icons**: Lucide React Native

### Backend (API)
- **Runtime**: Node.js
- **Framework**: Express.js
- **Security**: 
  - `bcryptjs` for password hashing.
  - `jsonwebtoken` for auth tokens.
  - `cors` & `helmet` for API security.
- **Payments**: Stripe Node.js SDK

## 🏁 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Expo Go app on your mobile device (or an emulator)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/davidojo1144/Novaji.git
   cd Novaji
   ```

2. **Install Frontend Dependencies**
   ```bash
   npm install
   ```
   *Note: We've resolved dependency conflicts, so you don't need `--legacy-peer-deps`.*

3. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   ```

### Configuration

1. **Backend Environment**
   Create a `.env` file in the `backend/` directory:
   ```env
   PORT=8000
   JWT_SECRET=your_jwt_secret_key_here
   STRIPE_SECRET_KEY=sk_test_... (your stripe secret key)
   ```

2. **Frontend Environment**
   Create a `.env` file in the root directory:
   ```env
   EXPO_PUBLIC_API_URL=http://localhost:8000/api
   ```

### Running the App

1. **Start the Backend Server**
   Open a terminal and run:
   ```bash
   cd backend
   npm run dev
   ```
   The server will start on port 8000.

2. **Start the Expo App**
   Open a new terminal in the root directory and run:
   ```bash
   npx expo start -c
   ```
   Press `i` for iOS simulator, `a` for Android emulator, or scan the QR code with Expo Go.

## 🧪 Testing

Run the unit tests for components and stores:
```bash
npm test
```

## 📂 Project Structure

```
Novaji/
├── app/                 # Expo Router pages (screens)
│   ├── (auth)/          # Authentication routes (Login, Register)
│   ├── (tabs)/          # Main tab navigation (Home, Explore, Profile)
│   └── cart.tsx         # Shopping cart screen
├── backend/             # Express.js backend
│   ├── src/
│   │   ├── controllers/ # Logic for Auth, Products, Payments
│   │   ├── routes/      # API endpoints
│   │   └── server.js    # Entry point
├── src/
│   ├── components/      # Reusable UI components
│   ├── store/           # Global state (Zustand)
│   ├── lib/             # API clients and utilities
│   └── types/           # TypeScript definitions
└── __tests__/           # Unit tests
```

## ✨ Recent Updates
- **Fixed Dependency Conflicts**: Aligned `react-test-renderer` and `jest` versions to support React 19 without legacy peer deps.
- **Enhanced UI**: Upgraded Home and Profile screens with modern design elements.
- **Stripe Integration**: Fixed payment intent creation and 500 errors by updating API keys.
- **Bug Fixes**: Resolved navigation race conditions in `AuthProvider` and port conflicts on macOS.
