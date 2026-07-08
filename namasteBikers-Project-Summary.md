# namasteBikers — Project Summary

## 💡 Idea
Peer-to-peer bike/scooter rental platform for college students. Inspired by a real problem — EMI cost of owning a bike in college. Students who own a vehicle can rent it out when idle; students who need a ride can rent it, verified and trusted.

## 👥 User Roles (3)
- **Customer** — rents vehicles (College ID + DL verified)
- **Vehicle Owner** — lists vehicle for rent (open signup + admin approval)
- **Admin** — approves users/vehicles, manages platform (this is me)

## 🔑 Core Features
- Open signup, admin-approval based verification (no auto-reject/edge-case handling — manual review)
- Vehicle listing with photos, RC, pricing
- Dual availability system — quick toggle + specific time slots
- Request-based booking — customer requests, owner accepts/rejects
- Online payments via Razorpay — 0% platform commission (community model)

## 🛠️ Tech Stack
| Layer | Tech |
|---|---|
| Frontend | React + Vite + Redux Toolkit + Tailwind + DaisyUI |
| Backend | Node.js + Express |
| Database | MongoDB + Mongoose |
| Auth | JWT + HTTP-only cookies, 3 separate role-based middlewares |
| File Storage | Cloudinary (docs, photos) |
| Payments | Razorpay |

## 🗂️ Database Models
`Customer` · `Owner` · `Admin` · `Vehicle` · `Availability` · `Booking` · `Payment`
(Separate models per role — not a single User model — since each role has distinct fields)

## 📌 Design Decisions & Why
- **Separate models per role** (not one User + role field) → cleaner queries, distinct fields per role (Customer needs College ID + DL, Owner doesn't)
- **MongoDB over PostgreSQL** → conscious tradeoff: chose comfort/speed of build over strict relational guarantees, since I'm already fluent in Mongoose from a prior project
- **Manual admin approval, no automation** → trust-first model since this started as a trusted-circle (friends') platform before opening up
- **Request-based booking (not instant)** → owner needs control over who uses their personal vehicle

## 🧱 Build Approach
Building manually, file by file — not AI-generated boilerplate. Following the coding patterns from my earlier MERN project (DevTinder): simple Express routers, Mongoose schemas with inline validators, try/catch handlers, Redux slices for state.

## 📍 Current Stage
Architecture finalized. Starting backend setup: folder structure → server + DB connection → models → auth → routes → frontend.
