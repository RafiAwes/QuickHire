# QuickHire Frontend

This is the React-based frontend for the QuickHire job portal. It's a modern, high-performance Web application built with React 19 and Vite.

## 🔗 Project Links
- **[Main Project README](../README.md)** - Full project documentation and architecture.

## ✨ Features
- **Modern UI**: Clean, aesthetic design powered by Tailwind CSS 4.
- **Fluid Animations**: Smooth transitions and micro-interactions with Framer Motion.
- **Form Management**: Robust validation using React Hook Form and Zod.
- **Rich Text Editing**: Professional Job Listing creation with Tiptap.
- **Type Safety**: Fully typed with TypeScript.

## 🛠️ Tech Stack
- **Framework**: React 19
- **Build Tool**: Vite
- **Styling**: Tailwind CSS 4
- **Routing**: React Router 7
- **Icons**: Lucide React
- **Animations**: Framer Motion

## 🚀 Setup & Local Development

### 1. Installation
```powershell
npm install
```

### 2. Environment Configuration
Copy the `.env.example` file:
```powershell
copy .env.example .env.local
```
Update `VITE_API_URL` to point to your backend API.

### 3. Running the App
```powershell
npm run dev
```

### 4. Build for Production
```powershell
npm run build
```

---

## 📁 Project Structure

- `src/components`: Reusable UI components.
- `src/pages`: Main application views (Home, Jobs, JobDetails, Admin).
- `src/lib`: API clients and utility functions.
- `src/types`: TypeScript interfaces and types.
- `server.ts`: Development server and optional mock API.

## 📄 License
This project is open-sourced software licensed under the **MIT license**.
