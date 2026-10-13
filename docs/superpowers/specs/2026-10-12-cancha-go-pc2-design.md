# Cancha Go PC2 Design

## Objective

Finish the existing Angular university project without changing its stack. The catalogue remains a JSON Server REST resource, while authentication and reservations remain browser-local features.

## Architecture

- `ProductService` is the only catalogue boundary. It exposes `Promise`-based GET operations consumed consistently by catalogue and reservation pages.
- `AuthService` owns the demo session and safely no-ops outside the browser. `ReservationService` owns local reservations and filters/removes only for the current user.
- Login, dashboard, reservation and reservation-list routes render on the client; their guard redirects unauthenticated visitors to Login with the intended URL preserved.

## Required behaviour

- Product loading exposes clear loading/error/empty states; search and category filtering continue to work.
- A signed-in user can select an available court, choose a non-past date and time, confirm one reservation, view only their reservations, and cancel one.
- Navbar and account page reflect session state. Dashboard shows the authenticated user and their reservation count. The not-found page links home.
- Browser APIs are guarded for SSR. No reservation backend is implied.

## Validation

Unit tests cover service persistence, auth storage safety, route guarding, and reservation validation. The production build and test suite must pass. Manual browser verification covers navigation, responsive menu, JSON Server responses and the full reservation journey.
