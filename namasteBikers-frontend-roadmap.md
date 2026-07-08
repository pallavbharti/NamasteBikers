# namasteBikers — Frontend Build Roadmap

> Follow in order. Backend routes should exist (even if basic) before wiring a screen to them.

---

## Phase 0 — Setup
- [ ] `cd namasteBikers/frontend`
- [ ] `npm create vite@latest . -- --template react`
- [ ] `npm install`
- [ ] Install: `react-router-dom axios @reduxjs/toolkit react-redux`
- [ ] Install Tailwind + DaisyUI (`tailwindcss`, `daisyui` per their setup docs)
- [ ] Create folder skeleton: `src/components`, `src/utils`
- [ ] `src/utils/constants.js` — `BASE_URL` for backend API
- [ ] Test: `npm run dev` runs, blank page loads

## Phase 1 — App Shell & Routing
- [ ] `src/main.jsx` — mount `<App />`
- [ ] `src/App.jsx` — `<Routes>` skeleton with `react-router-dom`
- [ ] `src/components/Body.jsx` — layout wrapper (NavBar + `<Outlet />` + Footer)
- [ ] `src/components/NavBar.jsx` — basic nav, no logic yet
- [ ] `src/components/Footer.jsx`
- [ ] Test: routing works, NavBar shows on every page

## Phase 2 — Redux Store
- [ ] `src/utils/appStore.js` — configure store
- [ ] `src/utils/customerSlice.js` — logged-in customer state
- [ ] `src/utils/ownerSlice.js` — logged-in owner state
- [ ] `src/utils/adminSlice.js` — logged-in admin state
- [ ] Wrap `<App />` with `<Provider store={appStore}>`
- [ ] Test: Redux DevTools shows empty store, no errors

## Phase 3 — Auth Screens (per role)
- [ ] `Login.jsx` — generic, or one per role (decide based on backend routes)
- [ ] Customer `Signup.jsx` — includes College ID + DL upload fields
- [ ] Owner `Signup.jsx`
- [ ] Wire login → axios call → dispatch to correct slice → `navigate()`
- [ ] Wire signup → axios call → show "pending approval" message
- [ ] Logout button in NavBar → clears cookie + Redux state → redirect to login
- [ ] Test: full signup → (manually approve in DB) → login flow works for both roles

## Phase 4 — Protected Routes
- [ ] `ProtectedRoute` wrapper component — redirect to `/login` if not authenticated
- [ ] Apply to customer-only, owner-only, admin-only routes separately
- [ ] Test: logged-out user can't reach `/browse`, `/my-vehicles`, `/admin`

## Phase 5 — Owner Screens
- [ ] `AddVehicle.jsx` — form: model, number plate, price, RC + photo upload
- [ ] `MyVehicles.jsx` — list owner's vehicles with approval status
- [ ] `VehicleAvailability.jsx` — toggle + time-slot picker per vehicle
- [ ] `IncomingRequests.jsx` — list booking requests, Accept/Reject buttons
- [ ] Test: owner can add a vehicle, see it as "pending", set availability once approved

## Phase 6 — Customer Screens
- [ ] `BrowseVehicles.jsx` — grid/list of approved + available vehicles (like `Feed.jsx` in DevTinder)
- [ ] `VehicleCard.jsx` — reusable card component
- [ ] `VehicleDetails.jsx` — single vehicle view + "Request Booking" button
- [ ] `MyBookings.jsx` — customer's booking history + status
- [ ] Test: customer can browse, request a booking, see status update after owner responds

## Phase 7 — Admin Screens
- [ ] `AdminDashboard.jsx` — pending counts overview
- [ ] `PendingCustomers.jsx` / `PendingOwners.jsx` / `PendingVehicles.jsx` — approve/reject lists
- [ ] Document viewer (show uploaded College ID/DL/RC images before approving)
- [ ] Test: admin can approve a customer → that customer can now book

## Phase 8 — Payments
- [ ] Razorpay checkout script/SDK integration
- [ ] `PaymentButton.jsx` — triggers order creation → opens Razorpay checkout
- [ ] Handle success/failure callback → update booking status on screen
- [ ] Test: full flow — request → owner accepts → customer pays → booking confirmed

## Phase 9 — Polish
- [ ] Loading states (spinners/skeletons) on all data-fetching screens
- [ ] Empty states ("No vehicles available yet")
- [ ] Form validation + error messages (frontend-side, backend already validates)
- [ ] Responsive check on mobile view
- [ ] Toast notifications for actions (booking sent, approved, payment success)

## Phase 10 — Final Check
- [ ] Every screen tested for all 3 roles
- [ ] No console errors/warnings
- [ ] `.env` (if any frontend keys) not committed
- [ ] Build check: `npm run build` succeeds with no errors

---

## Current Status
🟡 Phase 0 — Setup pending
