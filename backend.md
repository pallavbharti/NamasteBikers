# namasteBikers — Backend Build Roadmap

> Follow in order. Each step builds on the last. Don't skip — every phase unlocks the next.

---

## Phase 0 — Setup
- [ ] `mkdir namasteBikers && cd namasteBikers && mkdir backend frontend`
- [ ] `cd backend && npm init -y`
- [ ] Install core deps: `express mongoose dotenv cors cookie-parser bcrypt jsonwebtoken validator`
- [ ] Install dev dep: `nodemon`
- [ ] Create `.env` (never commit this — add to `.gitignore` immediately)
- [ ] Create folder skeleton: `src/config`, `src/models`, `src/middlewares`, `src/routes`, `src/utils`

## Phase 1 — Server & Database
- [ ] `src/config/database.js` — MongoDB connection (Atlas URI from `.env`)
- [ ] `src/app.js` — Express app init, middleware wiring (`express.json()`, `cookie-parser`, `cors`), `app.listen()`
- [ ] Test: server boots, DB connects, no errors

## Phase 2 — Models (one at a time, in this order)
- [ ] `Customer` model
- [ ] `Owner` model
- [ ] `Admin` model
- [ ] `Vehicle` model (ref → Owner)
- [ ] `Availability` model (ref → Vehicle)
- [ ] `Booking` model (ref → Customer, Vehicle, Owner)
- [ ] `Payment` model (ref → Booking)

## Phase 3 — Auth (per role, one role fully before starting next)
- [ ] Customer: signup → hash password → save
- [ ] Customer: login → compare password → issue JWT → set cookie
- [ ] `customerAuth` middleware
- [ ] Repeat same 3 steps for Owner
- [ ] Repeat same 3 steps for Admin
- [ ] Logout route (clear cookie) — shared logic across roles

## Phase 4 — Document Upload (Cloudinary)
- [ ] Cloudinary account + API keys in `.env`
- [ ] Upload middleware/util (multer + cloudinary)
- [ ] Wire into Customer signup (College ID, DL) and Owner vehicle-add (RC, photos)

## Phase 5 — Core Features
- [ ] Owner: add vehicle route (status: pending)
- [ ] Owner: set availability (toggle + slots)
- [ ] Customer: browse approved + available vehicles
- [ ] Admin: view pending customers/owners/vehicles
- [ ] Admin: approve/reject routes
- [ ] `checkApproved` middleware — blocks unapproved users from booking/listing

## Phase 6 — Booking Flow
- [ ] Customer: send booking request
- [ ] Owner: accept/reject request
- [ ] Status transitions: pending → accepted/rejected → completed/cancelled
- [ ] Double-booking prevention check (same vehicle, overlapping time)

## Phase 7 — Payments (Razorpay)
- [ ] Razorpay keys in `.env`
- [ ] Create order route (only after owner accepts booking)
- [ ] Verify payment signature route (**never trust frontend — always verify server-side**)
- [ ] Update Payment + Booking status on success

## Phase 8 — Hardening & Testing
- [ ] Test every route in Postman (success + failure cases)
- [ ] Add input validation on all write routes
- [ ] Review security checklist below
- [ ] Write `apiList.md` documenting every endpoint

---

## 🔒 Security Checklist (non-negotiable — payments + personal docs are involved)

**Auth & Session**
- [ ] Passwords hashed with `bcrypt` — never store plain text
- [ ] JWT stored in **HTTP-only, secure cookie** — never in localStorage (XSS risk)
- [ ] JWT has expiry (e.g. 7 days) — no infinite tokens
- [ ] `JWT_SECRET` is long, random, only in `.env`, never hardcoded

**Input & Data**
- [ ] Every route validates input (`validator` package) before touching DB
- [ ] Mongoose schema validators on every field (type, required, min/max)
- [ ] Sanitize inputs to prevent NoSQL injection (avoid directly passing raw `req.body` into queries)
- [ ] File upload: restrict file type (image/pdf only) and size limit on Cloudinary/multer

**Authorization**
- [ ] Every protected route uses correct role middleware (`customerAuth`/`ownerAuth`/`adminAuth`) — never trust `req.body.role`
- [ ] `checkApproved` blocks unapproved customers/owners from booking or listing
- [ ] A customer can never accept/reject their own booking (ownership check on every mutation)
- [ ] Admin routes fully separated — no shared middleware with customer/owner

**Payments**
- [ ] Order created only after owner accepts — never before
- [ ] Razorpay **signature verification is mandatory server-side** before marking payment as successful — this is the #1 place fraud happens if skipped
- [ ] Never trust amount from frontend — always calculate/verify amount server-side from booking data
- [ ] Webhook (if used) verified with Razorpay webhook secret

**General**
- [ ] `.env` in `.gitignore` — double check before every commit
- [ ] `cors` configured with specific frontend origin, not `*`
- [ ] Rate limiting on auth routes (prevent brute-force login attempts) — e.g. `express-rate-limit`
- [ ] Generic error messages to client (don't leak stack traces or DB errors in production)
- [ ] `helmet` middleware for basic HTTP header security

---

## Current Status
🟡 Phase 0 — Setup in progress
