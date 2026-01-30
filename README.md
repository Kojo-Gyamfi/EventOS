# 🎉 Event Management Dashboard (EventOS)

A modern **Event Management Dashboard** built with **Next.js App Router** that allows organizers to create, manage, and publish events, while providing a clean public RSVP experience for attendees.

This project focuses on **real-world frontend architecture**, **server-driven UI**, and **production-ready patterns** suitable for an intermediate frontend developer portfolio.

---

## 🧠 Project Motivation

This project was built to:

* Practice **modern Next.js patterns** (App Router, Server Actions)
* Simulate **real product workflows** (draft → publish → manage attendees)
* Go beyond basic CRUD and focus on **UX, structure, and maintainability**
* Create a **strong portfolio project** for frontend roles

---

## ✨ Features

### 🔐 Authentication

* Email & password authentication
* Protected dashboard routes
* Public event pages (no login required)

### 📅 Event Management

* Create, edit, publish, and delete events
* Event statuses: **Draft · Published · Past**
* Automatic slug generation for public URLs
* Capacity management

### 🧾 RSVP System

* Public RSVP form
* Capacity limit enforcement
* Duplicate RSVP prevention
* Attendee list with counts

### 📊 Dashboard

* Event list with filters (upcoming / past)
* Event details view
* Attendee management
* Clean admin-style UI

### 🎨 UX & UI

* Loading skeletons
* Empty states
* Form validation with clear errors
* Responsive layout (mobile-friendly)

---

## 🧱 Tech Stack

| Category   | Technology               |
| ---------- | ------------------------ |
| Framework  | **Next.js (App Router)** |
| Language   | **TypeScript**           |
| Styling    | **Tailwind CSS**         |
| Auth       | **NextAuth / Auth.js**   |
| Database   | **Prisma + SQL**         |
| Validation | **Zod**                  |
| Deployment | **Vercel**               |

---

## 🗂️ Folder Structure

```
app/
├─ auth/              # Login & register pages
├─ dashboard/         # Protected dashboard
│  ├─ events/         # Event management
│  └─ layout.tsx      # Sidebar + navbar
├─ events/[slug]/     # Public event page
components/
├─ ui/                # Reusable UI components
├─ forms/             # EventForm, RSVPForm
├─ dashboard/         # Tables & dashboard components
lib/
├─ db.ts              # Prisma client
├─ auth.ts            # Auth helpers
├─ validators.ts      # Zod schemas
middleware.ts         # Route protection
```

This structure was designed to be **scalable, readable, and production-friendly**.

---

## 🧩 Core Data Models

* **User**
* **Event**
* **RSVP**

The data model is intentionally simple but realistic, avoiding over-engineering while still supporting real workflows.

---

## 🔍 What This Project Demonstrates

* ✅ Proper use of **Next.js App Router**
* ✅ Server Actions for mutations
* ✅ Authentication & route protection
* ✅ Clean folder architecture
* ✅ Real-world dashboard patterns
* ✅ Strong UX fundamentals

This project was built with **maintainability and clarity** in mind.

---

## 🔮 Future Improvements

* Role-based access (Admin / Organizer)
* CSV export for attendees
* Calendar view for events
* Email notifications for RSVPs
* Dark mode 🌙

---

## 🙌 Acknowledgements

Inspired by real-world tools like:

* Eventbrite
* Meetup
* Internal admin dashboards used in SaaS products

---

## 📬 Feedback

If you have feedback or suggestions, feel free to open an issue or reach out.
This project is part of my continuous learning journey 🚀

---

### ⭐ If you like this project, consider giving it a star!

---
