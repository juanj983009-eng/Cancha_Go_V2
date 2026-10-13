# Cancha Go PC2 Finalization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make catalogue, authentication, reservations, routing and presentation deliverable-ready.

**Architecture:** Use Promise/fetch solely for the JSON Server catalogue and LocalStorage solely behind SSR-safe auth/reservation services. Client-render browser-state routes stay protected with a shared guard.

**Tech Stack:** Angular 22, TypeScript, Bootstrap, JSON Server, Vitest.

**Spec:** `docs/superpowers/specs/2026-10-12-cancha-go-pc2-design.md`

## Global Constraints

- Keep Angular, Bootstrap, JSON Server, TypeScript, REST and LocalStorage.
- Do not add a backend or dependencies.
- Preserve existing public pages and SSR client rendering for browser-state routes.

## Review Focus

- JSON Server unavailable or returns a missing product.
- LocalStorage unavailable, malformed or accessed on the server.
- Unauthenticated deep links preserve the intended destination after login.
- Reservation date, time and ownership validation.
- Empty product and reservation states remain understandable on mobile.

### Task 1: Establish executable service tests

**Files:** Modify service and guard specs.

- [ ] Replace generated placeholder specs with behaviour tests for session storage, reservation persistence/filtering and guard redirection.
- [ ] Run the suite and record the currently failing baseline.

### Task 2: Repair data and browser-state boundaries

**Files:** Modify product, auth and reservation services plus affected models/tests.

- [ ] Unify product consumers on Promise APIs and expose typed errors.
- [ ] Make browser storage safe during SSR and malformed-data tolerant.
- [ ] Add reservation ownership/duplicate-slot operations and pass service tests.

### Task 3: Complete private user flows

**Files:** Modify auth guard, login, dashboard, reserva, mis-reservas, navbar and account pages/tests.

- [ ] Redirect private visits to Login with a return URL and return after successful login.
- [ ] Validate reservation inputs, prevent duplicate slots and show successful/empty/error states.
- [ ] Reflect account state in navigation, dashboard and account page.

### Task 4: Complete catalogue and deliverable UI

**Files:** Modify products/list/card, not-found, global styles, README and component/page tests.

- [ ] Add catalogue loading/error/empty states and preserve filtering.
- [ ] Make 404 branded and navigable; polish responsive controls without new dependencies.
- [ ] Document development, JSON Server, demo account and validation commands.

### Task 5: Verify the deliverable

- [ ] Run all unit tests, a production build and direct JSON Server endpoint checks.
- [ ] Review routing and SSR configuration against the spec, then report any manual browser checks remaining.
